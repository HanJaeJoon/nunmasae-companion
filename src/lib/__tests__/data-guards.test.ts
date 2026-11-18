import { readFileSync } from 'fs';
import { join } from 'path';

import { ENTRIES, firstAt, type Entry, type Fact } from '../entries';

/**
 * 이름 언급 누수의 오탐 예외. 사실 문장이 뒤 권 항목의 이름을 담고 있지만 그 항목이 드러나는 것은 아닌 경우만 적는다.
 * 매칭 규칙을 느슨하게 하지 말고 여기에 사실과 이유를 함께 적는다.
 */
const MENTION_EXCEPTIONS: { entry: string; fact: string; mentioned: string; reason: string }[] = [];

type Mention = { entry: string; at: number; mentioned: string; mentionedAt: number; fact: string };

const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/** 긴 이름부터 찾고, 이미 찾은 구간 안의 짧은 이름("도깨비 감투" 안의 "도깨비")은 세지 않는다. */
function mentionedIds(text: string, names: { id: string; re: RegExp }[]): Set<string> {
  const taken = new Array<boolean>(text.length).fill(false);
  const found = new Set<string>();
  for (const { id, re } of names) {
    for (const m of text.matchAll(re)) {
      const end = m.index + m[0].length;
      if (taken.slice(m.index, end).some(Boolean)) continue;
      taken.fill(true, m.index, end);
      found.add(id);
    }
  }
  return found;
}

function nameMentionLeaks(entries: readonly Entry[]): Mention[] {
  const byId = new Map(entries.map((e) => [e.id, e]));
  const names = (locale: 'ko' | 'en') =>
    entries
      .map((e) => ({
        id: e.id,
        name: e.name[locale],
        re: new RegExp(locale === 'ko' ? escapeRe(e.name.ko) : `(?<!\\w)${escapeRe(e.name.en)}(?!\\w)`, 'g'),
      }))
      .sort((a, b) => b.name.length - a.name.length);
  const ko = names('ko');
  const en = names('en');
  const leaks: Mention[] = [];
  for (const e of entries) {
    for (const f of e.facts) {
      const ids = new Set([...mentionedIds(f.ko, ko), ...mentionedIds(f.en, en)]);
      ids.delete(e.id);
      for (const id of ids) {
        const mentionedAt = firstAt(byId.get(id)!);
        if (mentionedAt <= f.at) continue;
        if (MENTION_EXCEPTIONS.some((x) => x.entry === e.id && x.fact === f.ko && x.mentioned === id)) continue;
        leaks.push({ entry: e.id, at: f.at, mentioned: id, mentionedAt, fact: f.ko });
      }
    }
  }
  return leaks;
}

function raceChipLeaks(entries: readonly Entry[]) {
  const byId = new Map(entries.map((e) => [e.id, e]));
  return entries
    .filter((e) => e.race)
    .map((e) => ({ entry: e.id, at: firstAt(e), race: e.race!, raceAt: firstAt(byId.get(e.race!)!) }))
    .filter((x) => x.raceAt > x.at);
}

type DraftFact = Pick<Fact, 'at' | 'ko' | 'major'>;

/** "### 이름" 절의 "- 사실: 문장 (권: N 또는 N?) [주요]" 줄. "(권: )" 빈칸 줄은 앱에 넣지 않으므로 뺀다. */
function parseDraft(md: string): Map<string, DraftFact[]> {
  const sections = new Map<string, DraftFact[]>();
  let current: DraftFact[] | null = null;
  for (const line of md.split(/\r?\n/)) {
    // 제목 끝 "?" 는 이름 표기 미확인 표시다 ("### 모티?").
    const heading = /^### (.+?)\??\s*$/.exec(line);
    if (heading) {
      current = [];
      sections.set(heading[1], current);
      continue;
    }
    if (/^#{1,2} /.test(line)) current = null;
    if (!current || !line.startsWith('- 사실:')) continue;
    const m = /^- 사실: (.+?) \(권: ?(\d?)\??\)( \[주요\])?/.exec(line);
    if (!m) throw new Error(`초안 줄 형식이 다르다: ${line}`);
    if (m[2] === '') continue;
    current.push({ at: Number(m[2]), ko: m[1], ...(m[3] ? { major: true as const } : {}) });
  }
  return sections;
}

const factKey = (f: DraftFact) => `${f.at}|${f.major ? 'major' : '-'}|${f.ko}`;

describe('데이터 누수 검사', () => {
  it('사실 문장이 그 권에 아직 나오지 않은 항목의 이름을 언급하지 않는다', () => {
    expect(nameMentionLeaks(ENTRIES)).toEqual([]);
  });

  it('예외 목록의 사실이 실제로 있다 (지난 예외를 남겨 두지 않는다)', () => {
    for (const x of MENTION_EXCEPTIONS) {
      expect(ENTRIES.find((e) => e.id === x.entry)?.facts.map((f) => f.ko)).toContain(x.fact);
    }
  });

  it('종족 칩이 인물보다 늦게 등장하는 종족을 드러내지 않는다', () => {
    expect(raceChipLeaks(ENTRIES)).toEqual([]);
  });

  it('docs/data-draft.md 의 사실이 entries.json 과 ko 문장, at, major 까지 같다', () => {
    const draft = parseDraft(readFileSync(join(__dirname, '../../../docs/data-draft.md'), 'utf8'));
    const byKo = new Map(ENTRIES.map((e) => [e.name.ko, e]));
    const diffs: { name: string; draftOnly: string[]; jsonOnly: string[] }[] = [];
    for (const [name, facts] of draft) {
      const entry = byKo.get(name);
      if (!entry && facts.length === 0) continue;
      const d = facts.map(factKey).sort();
      const j = (entry?.facts ?? []).map(factKey).sort();
      const draftOnly = d.filter((k) => !j.includes(k));
      const jsonOnly = j.filter((k) => !d.includes(k));
      if (draftOnly.length || jsonOnly.length) diffs.push({ name, draftOnly, jsonOnly });
    }
    const missing = ENTRIES.filter((e) => !draft.has(e.name.ko)).map((e) => e.name.ko);
    expect({ diffs, missing }).toEqual({ diffs: [], missing: [] });
  });
});

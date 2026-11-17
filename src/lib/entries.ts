import data from '@/data/entries.json';

export type Locale = 'en' | 'ko';

/** 구판 기준 권 번호. 1권 1~5장, 2권 6~10장, 3권 11~14장, 4권 15~18장. */
export type Progress = 1 | 2 | 3 | 4;
export const BOOK_NUMBERS: readonly Progress[] = [1, 2, 3, 4];

/** 한국어판(구판) 권 제목과 대응하는 영문판. 영문판은 2026-06 기준 Book One 만 나왔다. */
export const BOOKS: Record<Progress, { ko: string; en: string | null }> = {
  1: { ko: '심장을 적출하는 나가', en: 'Book One: The Heart of the Nhaga' },
  2: { ko: '숙원을 추구하는 레콘', en: null },
  3: { ko: '불을 다루는 도깨비', en: null },
  4: { ko: '왕을 찾아 헤매는 인간', en: null },
};

export type EntryType = 'character' | 'race' | 'god' | 'place' | 'term' | 'creature';

export type Fact = {
  /**
   * 이 사실이 밝혀지는 권 번호(1~4). progress 가 이 값 이상일 때만 보인다.
   * 장 단위로 세분화할 때는 이 숫자의 단위만 바꾸고(예: 장 번호 1~18) 비교 방식은 그대로 둔다.
   */
  at: number;
  ko: string;
  en: string;
  /** 사용자가 주요 반전으로 꼽은 사실. 상세 화면에서 표식을 붙이고 isMasked 조건이면 가린다. */
  major?: true;
};

export type Entry = {
  id: string;
  type: EntryType;
  name: Record<Locale, string>;
  /** 인물이 속한 종족 항목의 id. 인물 탭의 종족 칩으로 드러나므로 첫 등장 권에서 이미 알려진 종족만 쓴다. */
  race?: string;
  group?: string;
  facts: Fact[];
};

export const ENTRIES = data as Entry[];

/** 항목의 첫 등장 시점 = 가장 이른 사실의 at */
export function firstAt(entry: Entry): number {
  return Math.min(...entry.facts.map((f) => f.at));
}

/** 읽은 지점까지 등장한 항목만. 그 너머 항목은 존재 자체를 숨긴다. */
export function visibleEntries(entries: readonly Entry[], progress: number): Entry[] {
  return entries.filter((e) => firstAt(e) <= progress);
}

/** 읽은 지점까지 밝혀진 사실만 등장 순서대로. 같은 at 은 데이터 순서를 유지한다. */
export function visibleFacts(entry: Entry, progress: number): Fact[] {
  return entry.facts.filter((f) => f.at <= progress).sort((a, b) => a.at - b.at);
}

/** 이름(ko/en)에 검색어가 들어 있는 항목. 검색어가 비어 있으면 그대로 돌려준다. */
export function searchEntries(entries: readonly Entry[], query: string): Entry[] {
  const q = query.trim().toLowerCase();
  if (!q) return [...entries];
  return entries.filter((e) => e.name.en.toLowerCase().includes(q) || e.name.ko.includes(q));
}

/** 인물 탭 종족 칩의 순서. 여기 없는 종족과 race 가 없는 인물은 "전체" 에서만 보인다. */
export const RACE_CHIPS = ['human', 'nhaga', 'rekon', 'tokkebi'] as const;

/** 보이는 항목 중 종족별 수. 0 인 종족은 빼므로 칩이 진행 너머를 드러내지 않는다. */
export function raceCounts(entries: readonly Entry[]): { race: string; count: number }[] {
  return RACE_CHIPS.map((race) => ({ race, count: entries.filter((e) => e.race === race).length })).filter(
    (c) => c.count > 0,
  );
}

/** 고른 종족이 보이는 칩에 없으면(0 이 되어 사라졌으면) "전체"(null) 로 돌아간다. */
export function activeRace(counts: readonly { race: string }[], race: string | null): string | null {
  return counts.some((c) => c.race === race) ? race : null;
}

/** 종족 칩 필터. null 이면 전체. */
export function filterByRace(entries: readonly Entry[], race: string | null): Entry[] {
  return race === null ? [...entries] : entries.filter((e) => e.race === race);
}

/**
 * 진행을 바꿀 때 저장할 newSince. 올리면 직전 진행값, 낮추거나 첫 선택이면 새 진행값(표시 없음).
 * 같은 값을 다시 고르면 진행 변경이 아니므로 기존 newSince 를 유지한다.
 */
export function nextNewSince(from: Progress | null, fromNewSince: Progress | undefined, to: Progress): Progress {
  if (from === to) return fromNewSince ?? to;
  return from !== null && to > from ? from : to;
}

/** 직전 진행 이후 새로 열린 항목인지. 진행 너머 항목은 보이지 않으므로 new 도 아니다. */
export function isNewEntry(entry: Entry, progress: number, newSince: number | undefined): boolean {
  const at = firstAt(entry);
  return newSince !== undefined && at > newSince && at <= progress;
}

/** 직전 진행 이후 새로 밝혀진 사실인지. */
export function isNewFact(fact: Fact, progress: number, newSince: number | undefined): boolean {
  return newSince !== undefined && fact.at > newSince && fact.at <= progress;
}

/**
 * 문장을 그리지 않고 "눌러서 보기" 로 가릴 사실인지. 지금 읽는 권의 주요 반전만 가린다.
 * 권과 상관없이 주요 사실을 전부 가리려면 `fact.at === progress` 조건을 빼면 된다.
 */
export function isMasked(fact: Fact, progress: number): boolean {
  return fact.major === true && fact.at === progress;
}

/** 정렬된 사실을 같은 at 끼리 묶는다. 상세 화면의 "Book N" 소제목 단위. */
export function groupFactsByAt(facts: readonly Fact[]): { at: number; facts: Fact[] }[] {
  const groups: { at: number; facts: Fact[] }[] = [];
  for (const f of facts) {
    const last = groups[groups.length - 1];
    if (last?.at === f.at) last.facts.push(f);
    else groups.push({ at: f.at, facts: [f] });
  }
  return groups;
}

/**
 * 화면 언어 옆에 보조로 보일 다른 언어. 영어로 보면 원어(한국어) 이름과 한국어판 권 제목을 함께 보여
 * 원작과 맞춰 볼 수 있게 하고, 한국어로 보면 영문 정보는 숨긴다. 검색은 이와 무관하게 두 언어에서 찾는다.
 */
export function secondaryLocale(locale: Locale): Locale | null {
  return locale === 'en' ? 'ko' : null;
}

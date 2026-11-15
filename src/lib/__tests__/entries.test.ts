import {
  ENTRIES,
  firstAt,
  groupFactsByAt,
  isNewEntry,
  isNewFact,
  nextNewSince,
  visibleEntries,
  visibleFacts,
  type Entry,
} from '../entries';

const entry = (id: string, ats: number[]): Entry => ({
  id,
  type: 'character',
  name: { ko: id, en: id },
  facts: ats.map((at, i) => ({ at, ko: `${id}-${i}`, en: `${id}-${i}` })),
});

describe('visibleFacts', () => {
  const e = entry('a', [3, 1, 2, 1]);

  it('progress 를 넘는 사실은 내보내지 않는다', () => {
    for (const p of [1, 2, 3, 4]) {
      const facts = visibleFacts(e, p);
      expect(facts.every((f) => f.at <= p)).toBe(true);
      expect(facts).toHaveLength(e.facts.filter((f) => f.at <= p).length);
    }
  });

  it('at 순서로, 같은 at 은 데이터 순서로 정렬한다', () => {
    expect(visibleFacts(e, 4).map((f) => f.ko)).toEqual(['a-1', 'a-3', 'a-2', 'a-0']);
  });

  it('원본 배열을 바꾸지 않는다', () => {
    visibleFacts(e, 4);
    expect(e.facts.map((f) => f.at)).toEqual([3, 1, 2, 1]);
  });
});

describe('visibleEntries', () => {
  const list = [entry('early', [1, 3]), entry('late', [3, 4])];

  it('첫 등장이 progress 보다 늦은 항목은 목록에서 뺀다', () => {
    expect(visibleEntries(list, 1).map((e) => e.id)).toEqual(['early']);
    expect(visibleEntries(list, 2).map((e) => e.id)).toEqual(['early']);
    expect(visibleEntries(list, 3).map((e) => e.id)).toEqual(['early', 'late']);
  });

  it('첫 등장은 가장 작은 at 이다 (사실 순서와 무관)', () => {
    expect(firstAt(entry('x', [4, 2, 3]))).toBe(2);
  });
});

describe('groupFactsByAt', () => {
  it('보이는 사실을 권별로 묶고 순서를 유지한다', () => {
    const groups = groupFactsByAt(visibleFacts(entry('a', [3, 1, 2, 1]), 2));
    expect(groups.map((g) => [g.at, g.facts.map((f) => f.ko)])).toEqual([
      [1, ['a-1', 'a-3']],
      [2, ['a-2']],
    ]);
  });
});

describe('new 표시', () => {
  it('진행을 올리면 직전 진행값을, 낮추거나 첫 선택이면 새 진행값을 저장한다', () => {
    expect(nextNewSince(1, 1, 3)).toBe(1);
    expect(nextNewSince(3, 1, 2)).toBe(2);
    expect(nextNewSince(null, undefined, 2)).toBe(2);
  });

  it('같은 진행을 다시 고르면 기존 newSince 를 유지한다', () => {
    expect(nextNewSince(3, 1, 3)).toBe(1);
    expect(nextNewSince(3, undefined, 3)).toBe(3);
  });

  it('newSince 보다 늦게 처음 나온 보이는 항목만 new 다', () => {
    const list = [entry('b1', [1, 3]), entry('b2', [2]), entry('b3', [3]), entry('b4', [4])];
    const news = list.filter((e) => isNewEntry(e, 3, 1)).map((e) => e.id);
    expect(news).toEqual(['b2', 'b3']);
  });

  it('진행 너머 항목과 사실은 new 로도 드러나지 않는다', () => {
    expect(isNewEntry(entry('late', [4]), 2, 1)).toBe(false);
    expect(isNewFact({ at: 4, ko: '', en: '' }, 2, 1)).toBe(false);
  });

  it('newSince 보다 늦게 밝혀진 보이는 사실만 new 다', () => {
    const e = entry('a', [1, 2, 3, 4]);
    expect(e.facts.filter((f) => isNewFact(f, 3, 1)).map((f) => f.at)).toEqual([2, 3]);
  });

  it('newSince 가 진행과 같거나 없으면 아무것도 new 가 아니다', () => {
    const e = entry('a', [1, 2]);
    expect(isNewEntry(e, 2, 2)).toBe(false);
    expect(e.facts.some((f) => isNewFact(f, 2, 2))).toBe(false);
    expect(isNewEntry(e, 2, undefined)).toBe(false);
    expect(e.facts.some((f) => isNewFact(f, 2, undefined))).toBe(false);
  });
});

describe('entries.json 무결성', () => {
  const TYPES = ['character', 'race', 'god', 'place', 'term', 'creature'];

  it('id 가 유일하다', () => {
    const ids = ENTRIES.map((e) => e.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it.each(ENTRIES.map((e) => [e.id, e] as const))('%s: 필드가 올바르다', (_id, e) => {
    expect(TYPES).toContain(e.type);
    expect(e.name.ko.trim()).not.toBe('');
    expect(e.name.en.trim()).not.toBe('');
    expect(e.facts.length).toBeGreaterThan(0);
    for (const f of e.facts) {
      expect(Number.isInteger(f.at)).toBe(true);
      expect(f.at).toBeGreaterThanOrEqual(1);
      expect(f.at).toBeLessThanOrEqual(4);
      expect(f.ko.trim()).not.toBe('');
      expect(f.en.trim()).not.toBe('');
    }
  });

  it('race 는 존재하는 종족 항목을 가리키고, 그 종족은 인물보다 늦게 등장하지 않는다', () => {
    const byId = new Map(ENTRIES.map((e) => [e.id, e]));
    for (const e of ENTRIES.filter((x) => x.race)) {
      const race = byId.get(e.race!);
      expect(race?.type).toBe('race');
      expect(firstAt(race!)).toBeLessThanOrEqual(firstAt(e));
    }
  });
});

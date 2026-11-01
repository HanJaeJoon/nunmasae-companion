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
};

export type Entry = {
  id: string;
  type: EntryType;
  name: Record<Locale, string>;
  /** 인물이 속한 종족 항목의 id */
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

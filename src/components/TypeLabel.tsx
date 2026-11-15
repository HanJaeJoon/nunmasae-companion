import type { EntryType } from '@/lib/entries';

/** 항목 유형의 번역 키. 목록과 상세의 회색 보조 줄에 문장형으로 붙는다. */
export const TYPE_KEYS: Record<EntryType, string> = {
  character: 'typeCharacter',
  creature: 'typeCreature',
  race: 'typeRace',
  god: 'typeGod',
  place: 'typePlace',
  term: 'typeTerm',
};

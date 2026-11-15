import { createPrefs } from '@/kit/prefs';
import { storageKey } from './branding';
import { BOOK_NUMBERS, type Locale, type Progress } from './entries';

// 진행 권수, 직전 진행 권수, 언어 선택만 기기에 저장한다. 서버, 계정 없음.

export type SavedSettings = {
  /** 아직 고르지 않았으면 null. 이때 첫 화면은 진행 선택이다. */
  progress: Progress | null;
  locale: Locale;
  /** 직전 진행값. firstAt 이나 at 이 이 값보다 크면 new 로 표시한다. 옛 저장값에는 없다. */
  newSince?: Progress;
};

export function isSavedSettings(value: unknown): value is SavedSettings {
  if (typeof value !== 'object' || value === null) return false;
  const v = value as Record<string, unknown>;
  return (
    (v.progress === null || BOOK_NUMBERS.includes(v.progress as Progress)) &&
    (v.locale === 'en' || v.locale === 'ko') &&
    (v.newSince === undefined || BOOK_NUMBERS.includes(v.newSince as Progress))
  );
}

export const settingsPrefs = createPrefs<SavedSettings>(storageKey('settings'), isSavedSettings);

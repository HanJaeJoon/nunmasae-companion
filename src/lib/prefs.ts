import { createPrefs } from '@/kit/prefs';
import { storageKey } from './branding';
import { BOOK_NUMBERS, type Locale, type Progress } from './entries';

// 진행 권수와 언어 선택만 기기에 저장한다. 서버, 계정 없음.

export type SavedSettings = {
  /** 아직 고르지 않았으면 null. 이때 첫 화면은 진행 선택이다. */
  progress: Progress | null;
  locale: Locale;
};

export function isSavedSettings(value: unknown): value is SavedSettings {
  if (typeof value !== 'object' || value === null) return false;
  const v = value as Record<string, unknown>;
  return (
    (v.progress === null || BOOK_NUMBERS.includes(v.progress as Progress)) &&
    (v.locale === 'en' || v.locale === 'ko')
  );
}

export const settingsPrefs = createPrefs<SavedSettings>(storageKey('settings'), isSavedSettings);

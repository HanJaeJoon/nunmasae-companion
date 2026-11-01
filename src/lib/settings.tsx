import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

import type { Locale, Progress } from './entries';
import { appLocale, t as baseT } from './i18n';
import { settingsPrefs, type SavedSettings } from './prefs';

type SettingsValue = SavedSettings & {
  /** 저장값 복원이 끝났는지. 끝나기 전에는 화면이 진행 선택으로 튀지 않게 렌더를 미룬다. */
  hydrated: boolean;
  setProgress: (progress: Progress) => void;
  setLocale: (locale: Locale) => void;
  t: (key: string, options?: object) => string;
};

const SettingsContext = createContext<SettingsValue | null>(null);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<SavedSettings>({ progress: null, locale: appLocale });
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const saved = await settingsPrefs.load();
      if (cancelled) return;
      if (saved) setSettings(saved);
      setHydrated(true);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // 복원 전에는 기본값으로 덮어쓰지 않는다.
  useEffect(() => {
    if (hydrated) settingsPrefs.save(settings);
  }, [hydrated, settings]);

  const setProgress = useCallback((progress: Progress) => setSettings((s) => ({ ...s, progress })), []);
  const setLocale = useCallback((locale: Locale) => setSettings((s) => ({ ...s, locale })), []);

  const value = useMemo<SettingsValue>(
    () => ({
      ...settings,
      hydrated,
      setProgress,
      setLocale,
      t: (key, options) => baseT(key, { ...options, locale: settings.locale }),
    }),
    [settings, hydrated, setProgress, setLocale]
  );

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings(): SettingsValue {
  const value = useContext(SettingsContext);
  if (!value) throw new Error('useSettings must be used inside SettingsProvider');
  return value;
}

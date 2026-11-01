import { createI18n } from '@/kit/i18n';
import { FALLBACK_LOCALE, SUPPORTED_LOCALES, translations, type AppLocale } from './translations';

// kit/i18n 은 기기 로케일로 초기 언어를 고른다. 사용자가 토글하면 t(key, { locale }) 로 덮어쓴다.
export const { t, appLocale } = createI18n<AppLocale>({
  translations,
  supportedLocales: SUPPORTED_LOCALES,
  fallbackLocale: FALLBACK_LOCALE,
});

export { FALLBACK_LOCALE, SUPPORTED_LOCALES };
export type { AppLocale };

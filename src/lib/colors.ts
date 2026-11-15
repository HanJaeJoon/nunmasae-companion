import { useColorScheme } from 'react-native';

import { useThemeColors } from '@/kit/theme';
import { ACCENT, THEME_OVERRIDES } from './branding';

/** kit 팔레트 + 앱 전용 accent. 채움 배경은 BRANDING.brandColor 위에 흰 글자를 쓴다. */
export function useAppColors() {
  const colors = useThemeColors(THEME_OVERRIDES);
  const accent = useColorScheme() === 'dark' ? ACCENT.dark : ACCENT.light;
  return { ...colors, accent };
}

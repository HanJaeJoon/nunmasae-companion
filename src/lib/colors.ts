import { useColorScheme } from 'react-native';

import { useThemeColors } from '@/kit/theme';
import { ACCENT, SURFACES, THEME_OVERRIDES } from './branding';

/** kit 팔레트 + 앱 전용 accent 와 톤 패널 색. 채움 배경은 BRANDING.brandColor 위에 흰 글자를 쓴다. */
export function useAppColors() {
  const colors = useThemeColors(THEME_OVERRIDES);
  const dark = useColorScheme() === 'dark';
  return { ...colors, ...(dark ? SURFACES.dark : SURFACES.light), accent: dark ? ACCENT.dark : ACCENT.light };
}

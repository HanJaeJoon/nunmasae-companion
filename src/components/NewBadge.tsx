import { StyleSheet, Text, View } from 'react-native';

import { useThemeColors } from '@/kit/theme';
import { BRANDING, THEME_OVERRIDES } from '@/lib/branding';
import { useSettings } from '@/lib/settings';

export function NewBadge() {
  const { t } = useSettings();
  const colors = useThemeColors(THEME_OVERRIDES);
  return (
    <View style={[styles.badge, { backgroundColor: colors.bannerBg }]}>
      <Text style={[styles.text, { color: BRANDING.brandColor }]}>{t('newBadge')}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  text: {
    fontSize: 11,
    fontWeight: '700',
  },
});

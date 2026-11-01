import { router } from 'expo-router';
import type { ReactNode } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { useThemeColors } from '@/kit/theme';
import { BRANDING, THEME_OVERRIDES } from '@/lib/branding';
import { useSettings } from '@/lib/settings';

export function HeaderBar({ back, children }: { back?: boolean; children?: ReactNode }) {
  const { t } = useSettings();
  return (
    <View style={styles.bar}>
      {back ? (
        <TouchableOpacity accessibilityRole="button" onPress={() => router.back()} style={styles.hit}>
          <Text style={[styles.link, { color: BRANDING.brandColor }]}>{'< ' + t('back')}</Text>
        </TouchableOpacity>
      ) : (
        <View />
      )}
      <View style={styles.right}>{children}</View>
    </View>
  );
}

/** 현재 읽은 지점 표시이자 진행 변경 진입점. */
export function ProgressChip() {
  const { progress, t } = useSettings();
  const colors = useThemeColors(THEME_OVERRIDES);
  if (progress === null) return null;
  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityHint={t('changeProgress')}
      onPress={() => router.push('/progress')}
      style={[styles.chip, { backgroundColor: colors.bannerBg }]}
    >
      <Text style={[styles.chipText, { color: colors.text }]}>
        {t('readThrough', { n: progress })} · <Text style={{ color: BRANDING.brandColor }}>{t('changeProgress')}</Text>
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 44,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  hit: {
    paddingVertical: 10,
    paddingRight: 12,
  },
  link: {
    fontSize: 15,
    fontWeight: '600',
  },
  chip: {
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  chipText: {
    fontSize: 13,
  },
});

import { router } from 'expo-router';
import type { ReactNode } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { useAppColors } from '@/lib/colors';
import { useSettings } from '@/lib/settings';

export function HeaderBar({ back, children }: { back?: boolean; children?: ReactNode }) {
  const { t } = useSettings();
  const colors = useAppColors();
  return (
    <View style={styles.bar}>
      {back ? (
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel={t('back')}
          onPress={() => router.back()}
          style={styles.hit}
        >
          <Text style={[styles.link, { color: colors.accent }]}>{'< ' + t('back')}</Text>
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
  const colors = useAppColors();
  if (progress === null) return null;
  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityLabel={t('readThrough', { n: progress })}
      accessibilityHint={t('changeProgress')}
      onPress={() => router.push('/progress')}
      style={[styles.chip, { backgroundColor: colors.bannerBg }]}
    >
      <Text style={[styles.chipText, { color: colors.text }]}>
        {t('readThrough', { n: progress })} ·{' '}
        <Text style={[styles.chipAction, { color: colors.accent }]}>{t('changeProgress')}</Text>
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
    minHeight: 48,
  },
  right: {
    flexShrink: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  hit: {
    minHeight: 44,
    justifyContent: 'center',
    paddingRight: 12,
  },
  link: {
    fontSize: 15,
    fontWeight: '600',
  },
  chip: {
    flexShrink: 1,
    minHeight: 36,
    justifyContent: 'center',
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  chipText: {
    fontSize: 13,
  },
  chipAction: {
    fontWeight: '600',
  },
});

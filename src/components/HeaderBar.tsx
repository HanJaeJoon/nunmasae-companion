import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { useAppColors } from '@/lib/colors';
import { useSettings } from '@/lib/settings';

/** 선으로 그린 꺾쇠. 글리프 대신 View 로 그려 글꼴과 무관하게 같은 모양이다. */
export function Chevron({ color, direction = 'right' }: { color: string; direction?: 'left' | 'right' }) {
  return (
    <View
      style={[
        styles.chevron,
        { borderColor: color, transform: [{ rotate: direction === 'right' ? '45deg' : '-135deg' }] },
      ]}
    />
  );
}

export function HeaderBar() {
  const { t } = useSettings();
  const colors = useAppColors();
  return (
    <View style={styles.bar}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={t('back')}
        onPress={() => router.back()}
        style={({ pressed }) => [styles.hit, pressed && { backgroundColor: colors.pressed }]}
      >
        <Chevron color={colors.text} direction="left" />
        <Text style={[styles.link, { color: colors.text }]}>{t('back')}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 48,
  },
  hit: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    minHeight: 44,
    paddingLeft: 12,
    paddingRight: 12,
    marginLeft: -8,
    borderRadius: 22,
  },
  link: {
    fontSize: 16,
    fontWeight: '600',
  },
  chevron: {
    width: 8,
    height: 8,
    borderTopWidth: 2,
    borderRightWidth: 2,
  },
});

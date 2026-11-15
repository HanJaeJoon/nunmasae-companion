import type { ReactNode } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import { useAppColors } from '@/lib/colors';
import { useSettings } from '@/lib/settings';

// 적응형 아이콘용 그림이라 안전 영역 여백이 넓다. 크게 그리고 잘라 마크만 24px 안에 남긴다.
const MARK = require('../../assets/images/android-icon-monochrome.png');

/** 제품 표식(레콘 마크)과 앱 이름 한 줄. 오른쪽에 동작 하나를 둘 수 있다. */
export function BrandRow({ children }: { children?: ReactNode }) {
  const { t } = useSettings();
  const colors = useAppColors();
  return (
    <View style={styles.row}>
      <View style={styles.markBox}>
        <Image source={MARK} style={[styles.mark, { tintColor: colors.text }]} />
      </View>
      <Text style={[styles.name, { color: colors.text }]} numberOfLines={1}>
        {t('appName')}
      </Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    minHeight: 48,
  },
  markBox: {
    width: 24,
    height: 24,
    overflow: 'hidden',
  },
  mark: {
    position: 'absolute',
    left: -13,
    top: -13,
    width: 50,
    height: 50,
  },
  name: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
  },
});

import { StyleSheet, View } from 'react-native';

import { useAppColors } from '@/lib/colors';
import { BOOK_NUMBERS } from '@/lib/entries';
import { useSettings } from '@/lib/settings';

// 스토어 그래픽의 책등 4개. 높이를 조금씩 달리해 책장처럼 보이게 한다.
const HEIGHTS = [0.94, 0.84, 1, 0.88];

/**
 * 읽은 권까지 채운 책등 4개. read 가 0 이면 아무 권도 고르지 않은 상태라 보조 기술에서 숨긴다.
 * ground 는 책등 띠를 파내는 색으로, 놓인 면(바탕 또는 패널)의 색을 준다.
 */
export function BookShelf({ read, size = 24, fill, ground }: { read: number; size?: number; fill?: string; ground?: string }) {
  const { t } = useSettings();
  const colors = useAppColors();
  const width = Math.round(size * 0.26);
  const band = Math.max(1, Math.round(size * 0.07));
  return (
    <View
      // accessible 이 read 에 따라 바뀌면 Fabric 이 이 View 를 평탄화했다 풀면서 책등을 새 부모로 옮기는데,
      // 첫 실행에서 진행 화면이 닫히는 전환과 겹치면 Android 가 "child already has a parent" 로 죽는다.
      collapsable={false}
      accessible={read > 0}
      accessibilityRole={read > 0 ? 'image' : undefined}
      accessibilityLabel={read > 0 ? t('bookOf', { n: read, total: BOOK_NUMBERS.length }) : undefined}
      style={[styles.shelf, { height: size, gap: Math.max(2, Math.round(width * 0.5)) }]}
    >
      {BOOK_NUMBERS.map((n, i) => (
        <View
          key={n}
          style={[
            styles.spine,
            {
              width,
              height: Math.round(size * HEIGHTS[i]),
              paddingVertical: Math.round(size * 0.13),
              borderRadius: size < 20 ? 1.5 : 2.5,
              backgroundColor: n <= read ? (fill ?? colors.accent) : colors.spineEmpty,
            },
          ]}
        >
          {/* 스토어 그래픽처럼 위아래 띠를 둘러 막대그래프가 아니라 책으로 읽히게 한다. */}
          <View style={{ height: band, backgroundColor: ground ?? colors.background }} />
          <View style={{ height: band, backgroundColor: ground ?? colors.background }} />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  spine: {
    justifyContent: 'space-between',
  },
  shelf: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    flexShrink: 0,
  },
});

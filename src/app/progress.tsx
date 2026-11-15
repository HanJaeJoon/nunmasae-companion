import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { BookShelf } from '@/components/BookShelf';
import { BrandRow } from '@/components/BrandRow';
import { HeaderBar } from '@/components/HeaderBar';
import { useAppColors } from '@/lib/colors';
import { BOOK_NUMBERS, BOOKS, secondaryLocale, type Progress } from '@/lib/entries';
import { useSettings } from '@/lib/settings';

export default function ProgressScreen() {
  const { hydrated, progress, locale, setProgress, t } = useSettings();
  const colors = useAppColors();
  // 누르는 동안 위 책등이 그 권까지 채워져 고르기 전에 미리 보인다.
  const [pressing, setPressing] = useState<Progress | null>(null);

  if (!hydrated) return null;

  // 첫 실행에는 뒤로 갈 곳이 없으므로 앱 소개를 함께 보인다. 진행 변경은 간결하게.
  const changing = progress !== null && router.canGoBack();
  const showEnglish = secondaryLocale(locale) !== null;

  const choose = (n: Progress) => {
    setProgress(n);
    // 첫 실행은 index 가 Redirect 로 이 화면을 띄워 뒤로 갈 곳이 없다.
    if (router.canGoBack()) router.back();
    else router.replace('/');
  };

  return (
    <ScrollView style={{ backgroundColor: colors.background }} contentContainerStyle={styles.content}>
      {changing ? (
        <HeaderBar />
      ) : (
        <View style={styles.intro}>
          <BrandRow />
          <Text style={[styles.body, { color: colors.text }]}>{t('appTagline')}</Text>
        </View>
      )}

      <View style={styles.head}>
        <View style={styles.headText}>
          <Text accessibilityRole="header" style={[styles.h1, { color: colors.text }]}>
            {t('progressTitle')}
          </Text>
          <Text style={[styles.body, { color: colors.subtext }]}>{t('progressSubtitle')}</Text>
        </View>
        <BookShelf read={pressing ?? progress ?? 0} size={32} />
      </View>

      <View accessibilityRole="radiogroup" style={[styles.panel, { backgroundColor: colors.panel }]}>
        {BOOK_NUMBERS.map((n, i) => {
          const selected = n === progress;
          return (
            <View key={n}>
              {i > 0 && <View style={[styles.rule, { backgroundColor: colors.rule }]} />}
              <Pressable
                accessibilityRole="radio"
                accessibilityState={{ selected, checked: selected }}
                onPress={() => choose(n)}
                onPressIn={() => setPressing(n)}
                onPressOut={() => setPressing(null)}
                style={({ pressed }) => [
                  styles.row,
                  (pressed || selected) && { backgroundColor: selected ? colors.newBg : colors.pressed },
                ]}
              >
                <BookShelf
                  read={n}
                  size={18}
                  fill={selected ? colors.accent : colors.spineRead}
                  ground={selected ? colors.newBg : colors.panel}
                />
                <View style={styles.rowText}>
                  <Text style={[styles.book, { color: colors.text }]}>
                    {t('bookLabel', { n })}
                    {!showEnglish && <Text style={styles.regular}>{'  ' + BOOKS[n].ko}</Text>}
                  </Text>
                  {showEnglish && (
                    <>
                      <Text style={[styles.edition, { color: colors.text }]}>{BOOKS[n].ko}</Text>
                      <Text style={[styles.edition, { color: BOOKS[n].en ? colors.text : colors.subtext }]}>
                        {BOOKS[n].en ?? t('englishNotYet')}
                      </Text>
                    </>
                  )}
                </View>
              </Pressable>
            </View>
          );
        })}
      </View>

      {!changing && <Text style={[styles.note, { color: colors.subtext }]}>{t('disclaimer')}</Text>}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 16,
    paddingBottom: 32,
    gap: 24,
  },
  intro: {
    gap: 4,
  },
  head: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 16,
    paddingTop: 8,
  },
  headText: {
    flex: 1,
    gap: 6,
  },
  h1: {
    fontSize: 26,
    lineHeight: 32,
    fontWeight: '700',
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
  },
  panel: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  rule: {
    height: 1,
    marginLeft: 61,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    minHeight: 64,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  rowText: {
    flex: 1,
    gap: 2,
  },
  book: {
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '600',
  },
  regular: {
    fontWeight: '400',
  },
  edition: {
    fontSize: 14,
    lineHeight: 20,
  },
  note: {
    fontSize: 14,
    lineHeight: 20,
  },
});

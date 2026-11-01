import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { HeaderBar } from '@/components/HeaderBar';
import { useThemeColors } from '@/kit/theme';
import { BRANDING, THEME_OVERRIDES } from '@/lib/branding';
import { BOOK_NUMBERS, BOOKS, type Progress } from '@/lib/entries';
import { useSettings } from '@/lib/settings';

export default function ProgressScreen() {
  const { hydrated, progress, setProgress, t } = useSettings();
  const colors = useThemeColors(THEME_OVERRIDES);

  if (!hydrated) return null;

  const choose = (n: Progress) => {
    setProgress(n);
    // 첫 실행은 index 가 Redirect 로 이 화면을 띄워 뒤로 갈 곳이 없다.
    if (router.canGoBack()) router.back();
    else router.replace('/');
  };

  return (
    <ScrollView style={{ backgroundColor: colors.background }} contentContainerStyle={styles.content}>
      <HeaderBar back={progress !== null && router.canGoBack()} />
      <Text style={[styles.title, { color: colors.text }]}>{t('progressTitle')}</Text>
      <Text style={[styles.subtitle, { color: colors.subtext }]}>{t('progressSubtitle')}</Text>

      {BOOK_NUMBERS.map((n) => {
        const selected = n === progress;
        return (
          <TouchableOpacity
            key={n}
            accessibilityRole="radio"
            accessibilityState={{ selected }}
            onPress={() => choose(n)}
            style={[
              styles.card,
              { backgroundColor: colors.card, borderColor: selected ? BRANDING.brandColor : colors.border },
              selected && styles.cardSelected,
            ]}
          >
            <Text style={[styles.book, { color: colors.text }]}>{t('bookLabel', { n })}</Text>
            <View style={styles.line}>
              <Text style={[styles.edition, { color: colors.subtext }]}>{t('koreanEdition')}</Text>
              <Text style={[styles.edTitle, { color: colors.text }]}>{BOOKS[n].ko}</Text>
            </View>
            <View style={styles.line}>
              <Text style={[styles.edition, { color: colors.subtext }]}>{t('englishEdition')}</Text>
              <Text style={[styles.edTitle, { color: BOOKS[n].en ? colors.text : colors.faint }]}>
                {BOOKS[n].en ?? t('notYetPublished')}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 16,
    paddingTop: 0,
    paddingBottom: 32,
    gap: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 4,
  },
  card: {
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 16,
    gap: 6,
  },
  cardSelected: {
    borderWidth: 2,
  },
  book: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  line: {
    flexDirection: 'row',
    gap: 8,
  },
  edition: {
    fontSize: 13,
    width: 110,
  },
  edTitle: {
    fontSize: 13,
    flex: 1,
  },
});

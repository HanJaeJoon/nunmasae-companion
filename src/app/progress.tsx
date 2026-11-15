import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { HeaderBar } from '@/components/HeaderBar';
import { BRANDING } from '@/lib/branding';
import { useAppColors } from '@/lib/colors';
import { BOOK_NUMBERS, BOOKS, type Progress } from '@/lib/entries';
import { useSettings } from '@/lib/settings';

export default function ProgressScreen() {
  const { hydrated, progress, setProgress, t } = useSettings();
  const colors = useAppColors();

  if (!hydrated) return null;

  // 첫 실행에는 뒤로 갈 곳이 없으므로 앱 소개를 함께 보인다. 진행 변경은 간결하게.
  const changing = progress !== null && router.canGoBack();

  const choose = (n: Progress) => {
    setProgress(n);
    // 첫 실행은 index 가 Redirect 로 이 화면을 띄워 뒤로 갈 곳이 없다.
    if (router.canGoBack()) router.back();
    else router.replace('/');
  };

  return (
    <ScrollView style={{ backgroundColor: colors.background }} contentContainerStyle={styles.content}>
      {changing ? (
        <HeaderBar back />
      ) : (
        <View style={styles.intro}>
          <Text accessibilityRole="header" style={[styles.appName, { color: colors.text }]}>
            {BRANDING.appName}
          </Text>
          <Text style={[styles.tagline, { color: colors.text }]}>{t('appTagline')}</Text>
        </View>
      )}
      <View style={styles.head}>
        <Text accessibilityRole="header" style={[styles.title, { color: colors.text }]}>
          {t('progressTitle')}
        </Text>
        <Text style={[styles.subtitle, { color: colors.subtext }]}>{t('progressSubtitle')}</Text>
      </View>

      <View accessibilityRole="radiogroup" style={styles.cards}>
        {BOOK_NUMBERS.map((n) => {
          const selected = n === progress;
          return (
            <TouchableOpacity
              key={n}
              accessibilityRole="radio"
              accessibilityState={{ selected, checked: selected }}
              onPress={() => choose(n)}
              style={[
                styles.card,
                selected
                  ? { backgroundColor: colors.bannerBg, borderColor: colors.accent }
                  : { backgroundColor: colors.card, borderColor: colors.border },
              ]}
            >
              <View style={[styles.radio, { borderColor: selected ? colors.accent : colors.subtext }]}>
                {selected && <View style={[styles.radioDot, { backgroundColor: colors.accent }]} />}
              </View>
              <View style={styles.cardBody}>
                <Text style={[styles.book, { color: colors.text }]}>{t('bookLabel', { n })}</Text>
                <View>
                  <Text style={[styles.edition, { color: colors.subtext }]}>{t('koreanEdition')}</Text>
                  <Text style={[styles.edTitle, { color: colors.text }]}>{BOOKS[n].ko}</Text>
                </View>
                <View>
                  <Text style={[styles.edition, { color: colors.subtext }]}>{t('englishEdition')}</Text>
                  <Text style={[styles.edTitle, { color: BOOKS[n].en ? colors.text : colors.subtext }]}>
                    {BOOKS[n].en ?? t('notYetPublished')}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      {!changing && <Text style={[styles.disclaimer, { color: colors.subtext }]}>{t('disclaimer')}</Text>}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 16,
    paddingTop: 0,
    paddingBottom: 32,
    gap: 20,
  },
  intro: {
    paddingTop: 24,
    gap: 8,
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  tagline: {
    fontSize: 16,
    lineHeight: 24,
  },
  head: {
    gap: 6,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
  },
  cards: {
    gap: 12,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 14,
    borderRadius: 12,
    borderWidth: 1.5,
    padding: 16,
  },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  cardBody: {
    flex: 1,
    gap: 8,
  },
  book: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  edition: {
    fontSize: 12,
  },
  edTitle: {
    fontSize: 14,
    lineHeight: 20,
  },
  disclaimer: {
    fontSize: 13,
    lineHeight: 19,
  },
});

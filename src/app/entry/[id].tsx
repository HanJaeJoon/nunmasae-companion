import { useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { HeaderBar, ProgressChip } from '@/components/HeaderBar';
import { NewBadge } from '@/components/NewBadge';
import { TypeLabel } from '@/components/TypeLabel';
import { useAppColors } from '@/lib/colors';
import { ENTRIES, firstAt, groupFactsByAt, isNewFact, visibleFacts } from '@/lib/entries';
import { useSettings } from '@/lib/settings';

export default function EntryScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { hydrated, progress, newSince, locale, t } = useSettings();
  const colors = useAppColors();

  if (!hydrated) return null;

  // 딥 링크로 진행 너머 항목에 바로 들어와도 이름조차 보이지 않게 한다.
  const entry = ENTRIES.find((e) => e.id === id);
  const visible = entry && progress !== null && firstAt(entry) <= progress;
  const other = locale === 'en' ? 'ko' : 'en';

  return (
    <ScrollView style={{ backgroundColor: colors.background }} contentContainerStyle={styles.content}>
      <HeaderBar back>
        <ProgressChip />
      </HeaderBar>

      {visible ? (
        <>
          <View style={styles.head}>
            <TypeLabel type={entry.type} />
            <Text accessibilityRole="header" style={[styles.name, { color: colors.text }]}>
              {entry.name[locale]}
            </Text>
            <Text style={[styles.altName, { color: colors.subtext }]}>{entry.name[other]}</Text>
          </View>

          {/* 진행까지의 권만 묶여 나오므로 소제목 자체는 스포일러가 아니다. */}
          {groupFactsByAt(visibleFacts(entry, progress)).map((group) => (
            <View key={group.at} style={styles.section}>
              <Text accessibilityRole="header" style={[styles.sectionTitle, { color: colors.accent }]}>
                {t('bookLabel', { n: group.at })}
              </Text>
              <View
                accessibilityRole="list"
                style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}
              >
                {group.facts.map((f, i) => (
                  <View
                    key={i}
                    style={[styles.fact, i > 0 && { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: colors.border }]}
                  >
                    {isNewFact(f, progress, newSince) && <NewBadge />}
                    <Text style={[styles.factText, { color: colors.text }]}>{f[locale]}</Text>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </>
      ) : (
        <Text style={[styles.altName, { color: colors.subtext }]}>{t('notFound')}</Text>
      )}
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
  head: {
    gap: 4,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  altName: {
    fontSize: 15,
  },
  section: {
    gap: 8,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
  card: {
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 16,
  },
  fact: {
    paddingVertical: 12,
    gap: 6,
  },
  factText: {
    fontSize: 16,
    lineHeight: 24,
  },
});

import { useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { BookShelf } from '@/components/BookShelf';
import { HeaderBar } from '@/components/HeaderBar';
import { NewBadge } from '@/components/NewBadge';
import { TYPE_KEYS } from '@/components/TypeLabel';
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
      <HeaderBar />

      {visible ? (
        <>
          <View style={styles.head}>
            <Text accessibilityRole="header" style={[styles.h1, { color: colors.text }]}>
              {entry.name[locale]}
            </Text>
            <Text style={[styles.sub, { color: colors.subtext }]}>
              {[entry.name[other], t(TYPE_KEYS[entry.type])].filter(Boolean).join(' · ')}
            </Text>
          </View>

          {/* 진행까지의 권만 묶여 나오므로 소제목 자체는 스포일러가 아니다. */}
          {groupFactsByAt(visibleFacts(entry, progress)).map((group) => (
            <View key={group.at} style={[styles.panel, { backgroundColor: colors.panel }]}>
              <View style={styles.groupHead}>
                <BookShelf read={group.at} size={16} ground={colors.panel} />
                <Text accessibilityRole="header" aria-level={2} style={[styles.groupTitle, { color: colors.text }]}>
                  {t('bookLabel', { n: group.at })}
                </Text>
              </View>
              <View accessibilityRole="list">
                {group.facts.map((f, i) => (
                  <View key={i} style={[styles.fact, { borderTopColor: colors.rule }]}>
                    {isNewFact(f, progress, newSince) && <NewBadge />}
                    <Text style={[styles.factText, { color: colors.text }]}>{f[locale]}</Text>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </>
      ) : (
        <Text style={[styles.sub, { color: colors.subtext }]}>{t('notFound')}</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 16,
    paddingBottom: 32,
    gap: 16,
  },
  head: {
    gap: 4,
    paddingTop: 8,
    paddingBottom: 8,
  },
  h1: {
    fontSize: 26,
    lineHeight: 32,
    fontWeight: '700',
  },
  sub: {
    fontSize: 16,
    lineHeight: 24,
  },
  panel: {
    borderRadius: 16,
    paddingLeft: 16,
    paddingTop: 14,
    paddingBottom: 4,
  },
  groupHead: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingRight: 16,
    paddingBottom: 10,
  },
  groupTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  fact: {
    gap: 6,
    paddingVertical: 12,
    paddingRight: 16,
    borderTopWidth: 1,
  },
  factText: {
    fontSize: 16,
    lineHeight: 24,
  },
});

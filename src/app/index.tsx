import { Redirect, router } from 'expo-router';
import { useMemo, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { ProgressChip } from '@/components/HeaderBar';
import { NewBadge } from '@/components/NewBadge';
import { TypeLabel } from '@/components/TypeLabel';
import { BRANDING } from '@/lib/branding';
import { useAppColors } from '@/lib/colors';
import { ENTRIES, isNewEntry, visibleEntries, type EntryType } from '@/lib/entries';
import { useSettings } from '@/lib/settings';

const TABS: { label: string; types: EntryType[] }[] = [
  { label: 'tabCharacters', types: ['character', 'creature'] },
  { label: 'tabRaces', types: ['race', 'god'] },
  { label: 'tabPlaces', types: ['place'] },
  { label: 'tabTerms', types: ['term'] },
];

export default function Index() {
  const { hydrated, progress, newSince, locale, t } = useSettings();
  const colors = useAppColors();
  const [tab, setTab] = useState(0);
  const [query, setQuery] = useState('');

  const other = locale === 'en' ? 'ko' : 'en';
  const searching = query.trim() !== '';

  // 검색어가 있으면 탭과 무관하게 보이는 항목 전체에서 찾는다.
  const items = useMemo(() => {
    const visible = visibleEntries(ENTRIES, progress ?? 0);
    const q = query.trim().toLowerCase();
    const filtered = q
      ? visible.filter((e) => e.name.en.toLowerCase().includes(q) || e.name.ko.includes(q))
      : visible.filter((e) => TABS[tab].types.includes(e.type));
    return filtered.sort((a, b) => a.name[locale].localeCompare(b.name[locale], locale));
  }, [progress, query, tab, locale]);

  // 보이는 항목 기준으로만 판정해야 진행 너머 항목의 유형이 드러나지 않는다.
  const showType = searching || new Set(items.map((e) => e.type)).size > 1;

  if (!hydrated) return null;
  if (progress === null) return <Redirect href="/progress" />;

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <View style={styles.titleRow}>
        <Text accessibilityRole="header" style={[styles.title, { color: colors.text }]}>
          {BRANDING.appName}
        </Text>
        <TouchableOpacity accessibilityRole="button" onPress={() => router.push('/settings')} style={styles.hit}>
          <Text style={[styles.link, { color: colors.accent }]}>{t('settings')}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.chipRow}>
        <ProgressChip />
      </View>

      <TextInput
        style={[styles.search, { color: colors.text, borderColor: colors.border, backgroundColor: colors.card }]}
        placeholder={t('searchPlaceholder')}
        placeholderTextColor={colors.faint}
        accessibilityLabel={t('searchPlaceholder')}
        value={query}
        onChangeText={setQuery}
        autoCorrect={false}
        autoCapitalize="none"
      />

      {!searching && (
        // 글자 배율이 크면 영문 탭이 한 줄에 다 안 들어가므로 가로 스크롤로 둔다.
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          accessibilityRole="tablist"
          style={[styles.tabs, { borderBottomColor: colors.border }]}
          contentContainerStyle={styles.tabsContent}
        >
          {TABS.map((tb, i) => {
            const selected = i === tab;
            return (
              <TouchableOpacity
                key={tb.label}
                accessibilityRole="tab"
                accessibilityState={{ selected }}
                onPress={() => setTab(i)}
                style={[styles.tab, { borderBottomColor: selected ? colors.accent : 'transparent' }]}
              >
                <Text
                  style={[
                    styles.tabText,
                    { color: selected ? colors.accent : colors.subtext },
                    selected && styles.tabTextSelected,
                  ]}
                  numberOfLines={1}
                >
                  {t(tb.label)}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      )}

      <FlatList
        data={items}
        keyExtractor={(e) => e.id}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={[styles.empty, { color: colors.subtext }]}>
            {searching ? t('noMatches') : t('noResults')}
          </Text>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            accessibilityRole="button"
            onPress={() => router.push({ pathname: '/entry/[id]', params: { id: item.id } })}
            style={[styles.row, { backgroundColor: colors.card, borderColor: colors.border }]}
          >
            {(showType || isNewEntry(item, progress, newSince)) && (
              <View style={styles.meta}>
                {showType && <TypeLabel type={item.type} />}
                {isNewEntry(item, progress, newSince) && <NewBadge />}
              </View>
            )}
            <Text style={[styles.name, { color: colors.text }]}>{item.name[locale]}</Text>
            <Text style={[styles.altName, { color: colors.subtext }]}>{item.name[other]}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 8,
    gap: 12,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  title: {
    flex: 1,
    fontSize: 24,
    fontWeight: 'bold',
  },
  hit: {
    minHeight: 44,
    justifyContent: 'center',
    paddingLeft: 4,
  },
  link: {
    fontSize: 15,
    fontWeight: '600',
  },
  chipRow: {
    flexDirection: 'row',
  },
  search: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    minHeight: 44,
    fontSize: 16,
  },
  // ScrollView 기본값 flexShrink: 1 이면 목록에 밀려 줄어들면서 밑줄이 잘린다.
  tabs: {
    flexGrow: 0,
    flexShrink: 0,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  tabsContent: {
    flexGrow: 1,
  },
  tab: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44,
    paddingHorizontal: 10,
    borderBottomWidth: 3,
  },
  tabText: {
    fontSize: 14,
  },
  tabTextSelected: {
    fontWeight: '700',
  },
  list: {
    gap: 8,
    paddingBottom: 32,
  },
  row: {
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 2,
  },
  meta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 8,
    marginBottom: 2,
  },
  name: {
    fontSize: 17,
    fontWeight: '600',
  },
  altName: {
    fontSize: 13,
  },
  empty: {
    textAlign: 'center',
    lineHeight: 20,
    marginTop: 32,
    paddingHorizontal: 16,
  },
});

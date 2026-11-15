import { Redirect, router } from 'expo-router';
import { useMemo, useState } from 'react';
import { FlatList, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { BookShelf } from '@/components/BookShelf';
import { BrandRow } from '@/components/BrandRow';
import { NewBadge } from '@/components/NewBadge';
import { TYPE_KEYS } from '@/components/TypeLabel';
import { useAppColors } from '@/lib/colors';
import { ENTRIES, isNewEntry, secondaryLocale, visibleEntries, type EntryType } from '@/lib/entries';
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

  const other = secondaryLocale(locale);
  const searching = query.trim() !== '';

  // 보이는 항목 수라 진행 너머의 개수는 드러나지 않는다.
  const visible = useMemo(() => visibleEntries(ENTRIES, progress ?? 0), [progress]);

  // 검색어가 있으면 탭과 무관하게 보이는 항목 전체에서 찾는다.
  const items = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = q
      ? visible.filter((e) => e.name.en.toLowerCase().includes(q) || e.name.ko.includes(q))
      : visible.filter((e) => TABS[tab].types.includes(e.type));
    return filtered.sort((a, b) => a.name[locale].localeCompare(b.name[locale], locale));
  }, [visible, query, tab, locale]);

  // 보이는 항목 기준으로만 판정해야 진행 너머 항목의 유형이 드러나지 않는다.
  const showType = searching || new Set(items.map((e) => e.type)).size > 1;

  if (!hydrated) return null;
  if (progress === null) return <Redirect href="/progress" />;

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <BrandRow>
        <Pressable
          accessibilityRole="button"
          onPress={() => router.push('/settings')}
          style={({ pressed }) => [styles.textButton, pressed && { backgroundColor: colors.pressed }]}
        >
          <Text style={[styles.action, { color: colors.text }]}>{t('settings')}</Text>
        </Pressable>
      </BrandRow>

      <View style={styles.greeting}>
        <View style={styles.greetingText}>
          <Text accessibilityRole="header" style={[styles.h1, { color: colors.text }]}>
            {t('greeting', { n: progress })}
          </Text>
          <Text style={[styles.sub, { color: colors.subtext }]}>{t('openCount', { count: visible.length })}</Text>
        </View>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={t('readThrough', { n: progress })}
          accessibilityHint={t('changeProgress')}
          onPress={() => router.push('/progress')}
          style={({ pressed }) => [styles.change, pressed && { backgroundColor: colors.pressed }]}
        >
          <BookShelf read={progress} size={26} />
          <Text style={[styles.action, { color: colors.text }]}>{t('changeProgress')}</Text>
        </Pressable>
      </View>

      <View style={[styles.search, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <TextInput
          style={[styles.searchInput, { color: colors.text }]}
          placeholder={t('searchPlaceholder')}
          placeholderTextColor={colors.faint}
          accessibilityLabel={t('searchPlaceholder')}
          value={query}
          onChangeText={setQuery}
          autoCorrect={false}
          autoCapitalize="none"
        />
        {query !== '' && (
          <Pressable
            accessibilityRole="button"
            onPress={() => setQuery('')}
            style={({ pressed }) => [styles.clear, pressed && { backgroundColor: colors.pressed }]}
          >
            <Text style={[styles.action, { color: colors.subtext }]}>{t('clearSearch')}</Text>
          </Pressable>
        )}
      </View>

      {!searching && (
        // 글자 배율이 크면 영문 탭이 한 줄에 다 안 들어가므로 가로 스크롤로 둔다.
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          accessibilityRole="tablist"
          style={[styles.tabs, { borderBottomColor: colors.rule }]}
          contentContainerStyle={styles.tabsContent}
        >
          {TABS.map((tb, i) => {
            const selected = i === tab;
            return (
              <Pressable
                key={tb.label}
                accessibilityRole="tab"
                accessibilityState={{ selected }}
                onPress={() => setTab(i)}
                style={({ pressed }) => [
                  styles.tab,
                  { borderBottomColor: selected ? colors.accent : 'transparent' },
                  pressed && { backgroundColor: colors.pressed },
                ]}
              >
                <Text
                  style={[styles.tabText, { color: selected ? colors.text : colors.subtext }, selected && styles.bold]}
                  numberOfLines={1}
                >
                  {t(tb.label)}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      )}

      <FlatList
        data={items}
        keyExtractor={(e) => e.id}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => (
          <View style={[styles.separator, { backgroundColor: colors.panel }]}>
            <View style={[styles.rule, { backgroundColor: colors.rule }]} />
          </View>
        )}
        ListEmptyComponent={
          <View style={[styles.empty, { backgroundColor: colors.panel }]}>
            <Text style={[styles.emptyText, { color: colors.subtext }]}>
              {searching ? t('noMatches', { n: progress }) : t('noResults')}
            </Text>
          </View>
        }
        renderItem={({ item, index }) => {
          const sub = [other && item.name[other], showType && t(TYPE_KEYS[item.type])].filter(Boolean).join(' · ');
          return (
            <Pressable
              accessibilityRole="button"
              onPress={() => router.push({ pathname: '/entry/[id]', params: { id: item.id } })}
              style={({ pressed }) => [
                styles.row,
                { backgroundColor: pressed ? colors.pressed : colors.panel },
                index === 0 && styles.first,
                index === items.length - 1 && styles.last,
              ]}
            >
              <View style={styles.rowText}>
                <Text style={[styles.name, { color: colors.text }]}>{item.name[locale]}</Text>
                {sub !== '' && <Text style={[styles.sub, { color: colors.subtext }]}>{sub}</Text>}
              </View>
              {isNewEntry(item, progress, newSince) && <NewBadge />}
            </Pressable>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 16,
  },
  textButton: {
    minHeight: 44,
    justifyContent: 'center',
    paddingHorizontal: 12,
    marginRight: -12,
    borderRadius: 22,
  },
  action: {
    fontSize: 14,
    fontWeight: '600',
  },
  greeting: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingTop: 12,
    paddingBottom: 20,
  },
  greetingText: {
    flex: 1,
    gap: 4,
  },
  h1: {
    fontSize: 26,
    lineHeight: 32,
    fontWeight: '700',
  },
  change: {
    alignItems: 'center',
    gap: 6,
    minWidth: 64,
    minHeight: 44,
    paddingHorizontal: 8,
    paddingVertical: 6,
    marginRight: -8,
    borderRadius: 12,
  },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 22,
    minHeight: 44,
    paddingLeft: 16,
  },
  searchInput: {
    flex: 1,
    minHeight: 44,
    fontSize: 16,
  },
  clear: {
    minHeight: 44,
    justifyContent: 'center',
    paddingHorizontal: 14,
    borderRadius: 22,
  },
  // ScrollView 기본값 flexShrink: 1 이면 목록에 밀려 줄어들면서 밑줄이 잘린다.
  tabs: {
    flexGrow: 0,
    flexShrink: 0,
    marginTop: 8,
    borderBottomWidth: 1,
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
    borderBottomWidth: 2,
  },
  tabText: {
    fontSize: 14,
  },
  bold: {
    fontWeight: '600',
  },
  list: {
    paddingTop: 12,
    paddingBottom: 32,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    minHeight: 60,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  first: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  last: {
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  rowText: {
    flex: 1,
    gap: 2,
  },
  name: {
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '600',
  },
  sub: {
    fontSize: 14,
    lineHeight: 20,
  },
  separator: {
    paddingLeft: 16,
  },
  rule: {
    height: 1,
  },
  empty: {
    padding: 16,
    borderRadius: 16,
  },
  emptyText: {
    fontSize: 16,
    lineHeight: 24,
  },
});

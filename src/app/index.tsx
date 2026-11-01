import { Redirect, router } from 'expo-router';
import { useMemo, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { HeaderBar, ProgressChip } from '@/components/HeaderBar';
import { useThemeColors } from '@/kit/theme';
import { BRANDING, THEME_OVERRIDES } from '@/lib/branding';
import { ENTRIES, visibleEntries, type EntryType } from '@/lib/entries';
import { useSettings } from '@/lib/settings';

const TABS: { label: string; types: EntryType[] }[] = [
  { label: 'tabCharacters', types: ['character', 'creature'] },
  { label: 'tabRaces', types: ['race', 'god'] },
  { label: 'tabPlaces', types: ['place'] },
  { label: 'tabTerms', types: ['term'] },
];

export default function Index() {
  const { hydrated, progress, locale, t } = useSettings();
  const colors = useThemeColors(THEME_OVERRIDES);
  const [tab, setTab] = useState(0);
  const [query, setQuery] = useState('');

  const other = locale === 'en' ? 'ko' : 'en';

  // 검색어가 있으면 탭과 무관하게 보이는 항목 전체에서 찾는다.
  const items = useMemo(() => {
    const visible = visibleEntries(ENTRIES, progress ?? 0);
    const q = query.trim().toLowerCase();
    const filtered = q
      ? visible.filter((e) => e.name.en.toLowerCase().includes(q) || e.name.ko.includes(q))
      : visible.filter((e) => TABS[tab].types.includes(e.type));
    return filtered.sort((a, b) => a.name[locale].localeCompare(b.name[locale], locale));
  }, [progress, query, tab, locale]);

  if (!hydrated) return null;
  if (progress === null) return <Redirect href="/progress" />;

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <HeaderBar>
        <ProgressChip />
        <TouchableOpacity accessibilityRole="button" onPress={() => router.push('/settings')} style={styles.hit}>
          <Text style={[styles.link, { color: BRANDING.brandColor }]}>{t('settings')}</Text>
        </TouchableOpacity>
      </HeaderBar>

      <Text style={[styles.title, { color: colors.text }]}>{BRANDING.appName}</Text>

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

      {query.trim() === '' && (
        <View style={[styles.segments, { borderColor: colors.border }]}>
          {TABS.map((tb, i) => (
            <TouchableOpacity
              key={tb.label}
              accessibilityRole="tab"
              accessibilityState={{ selected: i === tab }}
              onPress={() => setTab(i)}
              style={[styles.segment, i === tab && { backgroundColor: BRANDING.brandColor }]}
            >
              <Text style={[styles.segmentText, { color: i === tab ? '#fff' : colors.text }]} numberOfLines={1}>
                {t(tb.label)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <FlatList
        data={items}
        keyExtractor={(e) => e.id}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.list}
        ListEmptyComponent={<Text style={[styles.empty, { color: colors.subtext }]}>{t('noResults')}</Text>}
        renderItem={({ item }) => (
          <TouchableOpacity
            accessibilityRole="button"
            onPress={() => router.push({ pathname: '/entry/[id]', params: { id: item.id } })}
            style={[styles.row, { backgroundColor: colors.card, borderColor: colors.border }]}
          >
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
    gap: 12,
  },
  hit: {
    paddingVertical: 10,
    paddingLeft: 4,
  },
  link: {
    fontSize: 15,
    fontWeight: '600',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  search: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
  segments: {
    flexDirection: 'row',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 8,
    overflow: 'hidden',
  },
  segment: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
  },
  segmentText: {
    fontSize: 13,
    fontWeight: '600',
  },
  list: {
    gap: 8,
    paddingBottom: 32,
  },
  row: {
    borderRadius: 10,
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
  altName: {
    fontSize: 13,
    marginTop: 2,
  },
  empty: {
    textAlign: 'center',
    marginTop: 32,
  },
});

import { useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { HeaderBar, ProgressChip } from '@/components/HeaderBar';
import { useThemeColors } from '@/kit/theme';
import { THEME_OVERRIDES } from '@/lib/branding';
import { ENTRIES, firstAt, visibleFacts } from '@/lib/entries';
import { useSettings } from '@/lib/settings';

export default function EntryScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { hydrated, progress, locale, t } = useSettings();
  const colors = useThemeColors(THEME_OVERRIDES);

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
          <View>
            <Text style={[styles.name, { color: colors.text }]}>{entry.name[locale]}</Text>
            <Text style={[styles.altName, { color: colors.subtext }]}>{entry.name[other]}</Text>
          </View>
          <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
            {visibleFacts(entry, progress).map((f, i) => (
              <Text key={i} style={[styles.fact, { color: colors.text }]}>
                {'- ' + f[locale]}
              </Text>
            ))}
          </View>
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
    gap: 12,
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  altName: {
    fontSize: 15,
    marginTop: 2,
  },
  card: {
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 16,
    gap: 10,
  },
  fact: {
    fontSize: 15,
    lineHeight: 22,
  },
});

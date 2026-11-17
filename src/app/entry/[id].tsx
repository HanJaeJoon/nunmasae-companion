import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { BookShelf } from '@/components/BookShelf';
import { HeaderBar } from '@/components/HeaderBar';
import { NewBadge } from '@/components/NewBadge';
import { TYPE_KEYS } from '@/components/TypeLabel';
import { useAppColors } from '@/lib/colors';
import {
  ENTRIES,
  firstAt,
  groupFactsByAt,
  isMasked,
  isNewFact,
  secondaryLocale,
  visibleFacts,
  type Fact,
} from '@/lib/entries';
import { useSettings } from '@/lib/settings';

export default function EntryScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { hydrated, progress, newSince, locale, t } = useSettings();
  const colors = useAppColors();
  // 드러낸 주요 사실. 저장하지 않으므로 화면을 벗어나면 다시 가려진다.
  const [revealed, setRevealed] = useState<ReadonlySet<Fact>>(new Set());

  if (!hydrated) return null;

  // 딥 링크로 진행 너머 항목에 바로 들어와도 이름조차 보이지 않게 한다.
  const entry = ENTRIES.find((e) => e.id === id);
  const visible = entry && progress !== null && firstAt(entry) <= progress;
  const other = secondaryLocale(locale);

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
              {[other && entry.name[other], t(TYPE_KEYS[entry.type])].filter(Boolean).join(' · ')}
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
                {group.facts.map((f, i) =>
                  // 가린 사실은 문장을 트리에 넣지 않는다. 흐림 처리는 스크린 리더와 글자 길이로 샌다.
                  isMasked(f, progress) && !revealed.has(f) ? (
                    <Pressable
                      key={i}
                      accessibilityRole="button"
                      accessibilityLabel={
                        isNewFact(f, progress, newSince) ? `${t('newBadge')}, ${t('revealMajor')}` : t('revealMajor')
                      }
                      onPress={() => setRevealed((prev) => new Set(prev).add(f))}
                      style={({ pressed }) => [
                        styles.fact,
                        styles.masked,
                        { borderTopColor: colors.rule },
                        pressed && { backgroundColor: colors.pressed },
                      ]}
                    >
                      {isNewFact(f, progress, newSince) && <NewBadge />}
                      <Text style={[styles.factText, { color: colors.accent }]}>{t('revealMajor')}</Text>
                    </Pressable>
                  ) : (
                    <View key={i} style={[styles.fact, { borderTopColor: colors.rule }]}>
                      {(isNewFact(f, progress, newSince) || f.major) && (
                        <View style={styles.badges}>
                          {isNewFact(f, progress, newSince) && <NewBadge />}
                          {f.major && (
                            <View style={[styles.major, { borderColor: colors.accent }]}>
                              <Text style={[styles.majorText, { color: colors.accent }]} numberOfLines={1}>
                                {t('majorBadge')}
                              </Text>
                            </View>
                          )}
                        </View>
                      )}
                      <Text style={[styles.factText, { color: colors.text }]}>{f[locale]}</Text>
                    </View>
                  ),
                )}
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
  masked: {
    minHeight: 48,
    justifyContent: 'center',
  },
  badges: {
    flexDirection: 'row',
    gap: 6,
  },
  major: {
    minHeight: 20,
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 8,
  },
  majorText: {
    fontSize: 12,
    fontWeight: '500',
  },
});

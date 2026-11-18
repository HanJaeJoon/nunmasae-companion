import Constants from 'expo-constants';
import { router } from 'expo-router';
import type { ReactNode } from 'react';
import { Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { BookShelf } from '@/components/BookShelf';
import { Chevron, HeaderBar } from '@/components/HeaderBar';
import { BRANDING } from '@/lib/branding';
import { useAppColors } from '@/lib/colors';
import type { Locale } from '@/lib/entries';
import { useSettings } from '@/lib/settings';

// 언어 이름은 번역하지 않는다. 각 언어 사용자가 자기 언어로 알아봐야 한다.
const LANGUAGES: { locale: Locale; label: string }[] = [
  { locale: 'en', label: 'English' },
  { locale: 'ko', label: '한국어' },
];

export default function SettingsScreen() {
  const { progress, locale, setLocale, t } = useSettings();
  const colors = useAppColors();

  // fit 이면 패널이 내용 폭만큼만 차지한다 (언어 세그먼트는 패널 자체가 트랙이다).
  const section = (title: string, description: string, children: ReactNode, fit = false) => (
    <View style={styles.section}>
      <View style={styles.label}>
        <Text accessibilityRole="header" aria-level={2} style={[styles.sectionTitle, { color: colors.text }]}>
          {title}
        </Text>
        <Text style={[styles.description, { color: colors.subtext }]}>{description}</Text>
      </View>
      <View style={[styles.panel, fit && styles.fit, { backgroundColor: colors.panel }]}>{children}</View>
    </View>
  );

  // detail 은 메일 앱이 없는 기기에서도 주소를 볼 수 있게 행 안에 같이 보여 준다.
  const linkRows = (items: { label: string; url: string; detail?: string }[]) =>
    items.map((l, i) => (
      <Pressable
        key={l.url}
        accessibilityRole="link"
        onPress={() => Linking.openURL(l.url).catch(() => {})}
        style={({ pressed }) => [styles.row, pressed && { backgroundColor: colors.pressed }]}
      >
        {i > 0 && <View style={[styles.rule, { backgroundColor: colors.rule }]} />}
        <Text style={[styles.rowText, { color: colors.text }]}>
          {l.label}
          {l.detail && <Text style={[styles.description, { color: colors.subtext }]}>{'\n' + l.detail}</Text>}
        </Text>
        <Chevron color={colors.subtext} />
      </Pressable>
    ));

  const subject = encodeURIComponent(t('reportSubject'));
  const body = encodeURIComponent(t('reportBody'));
  const reportLinks = [
    { label: t('reportIssue'), url: `${BRANDING.newIssueUrl}/choose` },
    {
      label: t('reportEmail'),
      url: `mailto:${BRANDING.contactEmail}?subject=${subject}&body=${body}`,
      detail: BRANDING.contactEmail,
    },
  ];

  const links = [
    { label: t('sourceCode'), url: BRANDING.sourceUrl },
    { label: t('privacyPolicy'), url: BRANDING.privacyPolicyUrl },
  ];

  return (
    <ScrollView style={{ backgroundColor: colors.background }} contentContainerStyle={styles.content}>
      <HeaderBar />
      <Text accessibilityRole="header" style={[styles.h1, { color: colors.text }]}>
        {t('settings')}
      </Text>

      {progress !== null &&
        section(
          t('progress'),
          t('progressSubtitle'),
          <Pressable
            accessibilityRole="button"
            accessibilityHint={t('changeProgress')}
            onPress={() => router.push('/progress')}
            style={({ pressed }) => [styles.row, pressed && { backgroundColor: colors.pressed }]}
          >
            <BookShelf read={progress} size={20} ground={colors.panel} />
            <Text style={[styles.rowText, { color: colors.text }]}>{t('readThrough', { n: progress })}</Text>
            <Chevron color={colors.subtext} />
          </Pressable>
        )}

      {section(
        t('language'),
        t('languageHint'),
        <View accessibilityRole="radiogroup" style={styles.segments}>
          {LANGUAGES.map((l) => {
            const selected = l.locale === locale;
            return (
              <Pressable
                key={l.locale}
                accessibilityRole="radio"
                accessibilityState={{ selected, checked: selected }}
                onPress={() => setLocale(l.locale)}
                style={({ pressed }) => [
                  styles.segment,
                  selected && { backgroundColor: colors.segment },
                  pressed && !selected && { backgroundColor: colors.pressed },
                ]}
              >
                <Text style={[styles.segmentText, { color: colors.text }, selected && styles.bold]}>{l.label}</Text>
              </Pressable>
            );
          })}
        </View>,
        true
      )}

      {section(t('report'), t('reportHint'), linkRows(reportLinks))}

      {section(t('about'), t('disclaimer'), linkRows(links))}

      <Text style={[styles.description, { color: colors.subtext }]}>
        {t('version', { v: Constants.expoConfig?.version ?? '-' })}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 16,
    paddingBottom: 32,
    gap: 28,
  },
  h1: {
    fontSize: 26,
    lineHeight: 32,
    fontWeight: '700',
    marginTop: -12,
    marginBottom: -8,
  },
  section: {
    gap: 12,
  },
  label: {
    gap: 2,
  },
  sectionTitle: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '500',
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
  },
  panel: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  fit: {
    alignSelf: 'flex-start',
    borderRadius: 24,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    minHeight: 56,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  rule: {
    position: 'absolute',
    top: 0,
    left: 16,
    right: 0,
    height: 1,
  },
  rowText: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
  },
  segments: {
    flexDirection: 'row',
    padding: 4,
    gap: 2,
  },
  segment: {
    minHeight: 44,
    justifyContent: 'center',
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  segmentText: {
    fontSize: 16,
  },
  bold: {
    fontWeight: '600',
  },
});

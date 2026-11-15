import type { ReactNode } from 'react';
import { Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { HeaderBar, ProgressChip } from '@/components/HeaderBar';
import { BRANDING } from '@/lib/branding';
import { useAppColors } from '@/lib/colors';
import type { Locale } from '@/lib/entries';
import { useSettings } from '@/lib/settings';

const SOURCE_URL = 'https://github.com/HanJaeJoon/nunmasae-companion';

// 언어 이름은 번역하지 않는다. 각 언어 사용자가 자기 언어로 알아봐야 한다.
const LANGUAGES: { locale: Locale; label: string }[] = [
  { locale: 'en', label: 'English' },
  { locale: 'ko', label: '한국어' },
];

export default function SettingsScreen() {
  const { locale, setLocale, t } = useSettings();
  const colors = useAppColors();

  const section = (title: string, children: ReactNode) => (
    <View style={styles.section}>
      <Text accessibilityRole="header" style={[styles.sectionTitle, { color: colors.subtext }]}>
        {title}
      </Text>
      <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>{children}</View>
    </View>
  );

  const links = [
    { label: t('sourceCode'), url: SOURCE_URL },
    { label: t('privacyPolicy'), url: BRANDING.privacyPolicyUrl },
  ];

  return (
    <ScrollView style={{ backgroundColor: colors.background }} contentContainerStyle={styles.content}>
      <HeaderBar back />
      <Text accessibilityRole="header" style={[styles.title, { color: colors.text }]}>
        {t('settings')}
      </Text>

      {section(
        t('progress'),
        <View style={styles.padded}>
          <View style={styles.row}>
            <ProgressChip />
          </View>
        </View>
      )}

      {section(
        t('language'),
        <View accessibilityRole="radiogroup" style={[styles.padded, styles.row]}>
          {LANGUAGES.map((l) => {
            const selected = l.locale === locale;
            return (
              <TouchableOpacity
                key={l.locale}
                accessibilityRole="radio"
                accessibilityState={{ selected, checked: selected }}
                onPress={() => setLocale(l.locale)}
                style={[
                  styles.option,
                  selected
                    ? { backgroundColor: BRANDING.brandColor, borderColor: BRANDING.brandColor }
                    : { borderColor: colors.border },
                ]}
              >
                <Text style={[styles.optionText, { color: selected ? '#fff' : colors.text }]}>{l.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}

      {section(
        t('about'),
        <>
          <Text style={[styles.padded, styles.body, { color: colors.text }]}>{t('disclaimer')}</Text>
          {links.map((l) => (
            <TouchableOpacity
              key={l.url}
              accessibilityRole="link"
              onPress={() => Linking.openURL(l.url)}
              style={[styles.link, { borderTopColor: colors.border }]}
            >
              <Text style={[styles.linkText, { color: colors.accent }]}>{l.label}</Text>
            </TouchableOpacity>
          ))}
        </>
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
  title: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  section: {
    gap: 8,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0.4,
    textTransform: 'uppercase',
    paddingHorizontal: 4,
  },
  card: {
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    overflow: 'hidden',
  },
  padded: {
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    gap: 8,
  },
  option: {
    flex: 1,
    minHeight: 44,
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  optionText: {
    fontSize: 15,
    fontWeight: '600',
  },
  body: {
    fontSize: 14,
    lineHeight: 20,
  },
  link: {
    minHeight: 48,
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  linkText: {
    fontSize: 15,
    fontWeight: '600',
  },
});

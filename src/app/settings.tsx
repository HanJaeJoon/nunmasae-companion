import { Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { HeaderBar, ProgressChip } from '@/components/HeaderBar';
import { useThemeColors } from '@/kit/theme';
import { BRANDING, THEME_OVERRIDES } from '@/lib/branding';
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
  const colors = useThemeColors(THEME_OVERRIDES);
  const cardStyle = [styles.card, { backgroundColor: colors.card, borderColor: colors.border }];

  return (
    <ScrollView style={{ backgroundColor: colors.background }} contentContainerStyle={styles.content}>
      <HeaderBar back />
      <Text style={[styles.title, { color: colors.text }]}>{t('settings')}</Text>

      <View style={cardStyle}>
        <Text style={[styles.label, { color: colors.subtext }]}>{t('language')}</Text>
        <View style={styles.row}>
          {LANGUAGES.map((l) => {
            const selected = l.locale === locale;
            return (
              <TouchableOpacity
                key={l.locale}
                accessibilityRole="radio"
                accessibilityState={{ selected }}
                onPress={() => setLocale(l.locale)}
                style={[
                  styles.option,
                  { borderColor: selected ? BRANDING.brandColor : colors.border },
                  selected && { backgroundColor: BRANDING.brandColor },
                ]}
              >
                <Text style={[styles.optionText, { color: selected ? '#fff' : colors.text }]}>{l.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <View style={cardStyle}>
        <Text style={[styles.label, { color: colors.subtext }]}>{t('progress')}</Text>
        <View style={styles.row}>
          <ProgressChip />
        </View>
      </View>

      <View style={cardStyle}>
        <Text style={[styles.label, { color: colors.subtext }]}>{t('about')}</Text>
        <Text style={[styles.body, { color: colors.text }]}>{t('disclaimer')}</Text>
        <TouchableOpacity accessibilityRole="link" onPress={() => Linking.openURL(SOURCE_URL)}>
          <Text style={[styles.body, { color: BRANDING.brandColor }]}>
            {t('sourceCode')}: {SOURCE_URL}
          </Text>
        </TouchableOpacity>
      </View>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  card: {
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 16,
    gap: 10,
  },
  label: {
    fontSize: 13,
  },
  row: {
    flexDirection: 'row',
    gap: 8,
  },
  option: {
    flex: 1,
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
});

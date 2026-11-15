import { StyleSheet, Text, View } from 'react-native';

import { useAppColors } from '@/lib/colors';
import { useSettings } from '@/lib/settings';

export function NewBadge() {
  const { t } = useSettings();
  const colors = useAppColors();
  return (
    <View style={[styles.badge, { backgroundColor: colors.newBg }]}>
      <Text style={[styles.text, { color: colors.newInk }]} numberOfLines={1}>
        {t('newBadge')}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    flexShrink: 0,
    minHeight: 20,
    justifyContent: 'center',
    borderRadius: 10,
    paddingHorizontal: 8,
  },
  text: {
    fontSize: 12,
    fontWeight: '500',
  },
});

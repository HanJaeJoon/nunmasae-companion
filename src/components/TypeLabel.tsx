import { StyleSheet, Text } from 'react-native';

import { useAppColors } from '@/lib/colors';
import type { EntryType } from '@/lib/entries';
import { useSettings } from '@/lib/settings';

const KEYS: Record<EntryType, string> = {
  character: 'typeCharacter',
  creature: 'typeCreature',
  race: 'typeRace',
  god: 'typeGod',
  place: 'typePlace',
  term: 'typeTerm',
};

export function TypeLabel({ type }: { type: EntryType }) {
  const { t } = useSettings();
  const colors = useAppColors();
  return <Text style={[styles.text, { color: colors.subtext }]}>{t(KEYS[type])}</Text>;
}

const styles = StyleSheet.create({
  text: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
});

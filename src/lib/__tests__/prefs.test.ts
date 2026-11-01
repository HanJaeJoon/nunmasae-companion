import { isSavedSettings } from '../prefs';

jest.mock('@react-native-async-storage/async-storage', () =>
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

describe('isSavedSettings', () => {
  it('정상 값과 미선택(null) 진행을 받는다', () => {
    expect(isSavedSettings({ progress: 1, locale: 'en' })).toBe(true);
    expect(isSavedSettings({ progress: null, locale: 'ko' })).toBe(true);
  });

  it('범위 밖 진행이나 모르는 언어는 버린다', () => {
    const bad = [
      { progress: 0, locale: 'en' },
      { progress: 5, locale: 'en' },
      { progress: '1', locale: 'en' },
      { progress: 1, locale: 'ja' },
      null,
      'x',
    ];
    for (const v of bad) {
      expect(isSavedSettings(v)).toBe(false);
    }
  });
});

// 이 앱만의 값을 모아둔 단일 지점.
//
// 스타터를 복제해 새 앱을 만들 때 여기와 app.json 만 고치면 브랜딩이 끝난다.
// kit/ 은 이 값들을 인자나 prop 으로 받으므로 kit 안에는 앱 고유 값이 없다.

export const BRANDING = {
  /** 공유 카드와 화면 헤더에 표시되는 이름. app.json 의 expo.name 과 맞춘다. */
  appName: 'Nunmasae Companion',

  /** 버튼/차트/공유 카드 배경에 쓰이는 대표 색. */
  brandColor: '#2F6F6A',

  /**
   * AsyncStorage 키 접두사.
   *
   * 앱마다 달라야 한다. 같은 기기에 여러 마이크로앱이 깔려도
   * 각자 별개의 저장 공간이므로 충돌하지는 않지만,
   * 접두사를 두면 로그와 디버깅에서 어느 앱의 값인지 바로 보인다.
   */
  storageKeyPrefix: 'nunmasae-companion',
} as const;

/** 브랜드 색에서 파생돼 kit/theme 의 기본 팔레트를 덮어쓰는 값. */
export const THEME_OVERRIDES = {
  light: { bannerBg: '#e3eeec' },
  dark: { bannerBg: '#15302d' },
} as const;

export function storageKey(name: string): string {
  return `${BRANDING.storageKeyPrefix}:${name}`;
}

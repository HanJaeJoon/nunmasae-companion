// 이 앱만의 값을 모아둔 단일 지점.
//
// 스타터를 복제해 새 앱을 만들 때 여기와 app.json 만 고치면 브랜딩이 끝난다.
// kit/ 은 이 값들을 인자나 prop 으로 받으므로 kit 안에는 앱 고유 값이 없다.

export const BRANDING = {
  /** 화면 헤더에 표시되는 이름. app.json 의 expo.name 과 맞춘다. */
  appName: 'Nunmasae Companion',

  /** 선택된 버튼 배경에 쓰이는 대표 색. */
  brandColor: '#2F6F6A',

  /**
   * AsyncStorage 키 접두사.
   *
   * 앱마다 달라야 한다. 같은 기기에 여러 마이크로앱이 깔려도
   * 각자 별개의 저장 공간이므로 충돌하지는 않지만,
   * 접두사를 두면 로그와 디버깅에서 어느 앱의 값인지 바로 보인다.
   */
  storageKeyPrefix: 'nunmasae-companion',

  /** 설정 화면에서 여는 개인정보처리방침. Play 등록 정보의 URL 과 같아야 한다. */
  privacyPolicyUrl: 'https://whochoolab.github.io/nunmasae-companion-privacy/',
} as const;

/** 브랜드 색에서 파생돼 kit/theme 의 기본 팔레트를 덮어쓰는 값. */
export const THEME_OVERRIDES = {
  light: { background: '#f5f4f2', border: '#e2dfd8', bannerBg: '#e3eeec', faint: '#6b6f6d' },
  dark: { background: '#111413', card: '#1a1f1e', border: '#2e3735', bannerBg: '#15302d', faint: '#949494' },
} as const;

/**
 * 테두리 없는 톤 패널과 그 안의 선. 패널은 바탕에서 브랜드 청록 쪽으로 한 단계만 물든 색이다.
 * rule 은 패널 안 행 구분선, pressed 는 눌림 톤, newBg/newInk 는 New 표식, spineEmpty 는 안 읽은 책등,
 * spineRead 는 고르지 않은 권 행의 읽은 책등(accent 를 아끼려고 회색).
 */
export const SURFACES = {
  light: {
    panel: '#edf2ef',
    rule: '#dce4e1',
    pressed: '#e1e9e6',
    newBg: '#d3e6e2',
    newInk: '#1f4f4b',
    spineEmpty: '#d3dedb',
    spineRead: '#97a29f',
    segment: '#ffffff',
  },
  dark: {
    panel: '#1a2120',
    rule: '#27302e',
    pressed: '#232c2a',
    newBg: '#1e3b38',
    newInk: '#a4d6cf',
    spineEmpty: '#2c3735',
    spineRead: '#7b8684',
    segment: '#303a38',
  },
} as const;

/** 글자와 테두리에 쓰는 브랜드 색. 다크 배경에서는 brandColor 대비가 낮아 밝힌 색을 쓴다. */
export const ACCENT = {
  light: '#2F6F6A',
  dark: '#7DBDB5',
} as const;

export function storageKey(name: string): string {
  return `${BRANDING.storageKeyPrefix}:${name}`;
}

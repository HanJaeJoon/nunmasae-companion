// 화면 문구. 항목 데이터(이름, 사실)는 src/data/entries.json 에 두 언어가 같이 있다.

export const SUPPORTED_LOCALES = ['en', 'ko'] as const;
export type AppLocale = (typeof SUPPORTED_LOCALES)[number];
export const FALLBACK_LOCALE: AppLocale = 'en';

type Strings = {
  progressTitle: string;
  progressSubtitle: string;
  bookLabel: string;
  koreanEdition: string;
  englishEdition: string;
  notYetPublished: string;
  readThrough: string;
  changeProgress: string;
  tabCharacters: string;
  tabRaces: string;
  tabPlaces: string;
  tabTerms: string;
  searchPlaceholder: string;
  noResults: string;
  settings: string;
  back: string;
  language: string;
  progress: string;
  about: string;
  disclaimer: string;
  sourceCode: string;
  privacyPolicy: string;
  notFound: string;
  newBadge: string;
  appTagline: string;
  noMatches: string;
  typeCharacter: string;
  typeCreature: string;
  typeRace: string;
  typeGod: string;
  typePlace: string;
  typeTerm: string;
};

export const translations: Record<AppLocale, Strings> = {
  en: {
    progressTitle: 'How far have you read?',
    progressSubtitle: 'Only what has appeared up to that point will be shown.',
    bookLabel: 'Book %{n}',
    koreanEdition: 'Korean edition',
    englishEdition: 'English edition',
    notYetPublished: 'not yet published',
    readThrough: 'Read through Book %{n}',
    changeProgress: 'Change',
    tabCharacters: 'Characters',
    tabRaces: 'Races & Gods',
    tabPlaces: 'Places',
    tabTerms: 'Terms',
    searchPlaceholder: 'Search names',
    noResults: 'Nothing here yet.',
    settings: 'Settings',
    back: 'Back',
    language: 'Language',
    progress: 'Reading progress',
    about: 'About',
    disclaimer:
      'Unofficial fan project. Not affiliated with the author, Golden Bough, Krafton or HarperCollins. No ads, no donations.',
    sourceCode: 'Source code',
    privacyPolicy: 'Privacy policy',
    notFound: 'This entry is not available.',
    newBadge: 'New',
    appTagline: 'A spoiler-free glossary of characters, races, places and terms.',
    noMatches: 'No matching names. Only entries that have appeared so far are searched.',
    typeCharacter: 'Character',
    typeCreature: 'Creature',
    typeRace: 'Race',
    typeGod: 'God',
    typePlace: 'Place',
    typeTerm: 'Term',
  },
  ko: {
    progressTitle: '어디까지 읽었나요?',
    progressSubtitle: '그 지점까지 나온 것만 보여 줍니다.',
    bookLabel: '%{n}권',
    koreanEdition: '한국어판',
    englishEdition: '영문판',
    notYetPublished: '미출간',
    readThrough: '%{n}권까지 읽음',
    changeProgress: '변경',
    tabCharacters: '인물',
    tabRaces: '종족·신',
    tabPlaces: '장소',
    tabTerms: '용어',
    searchPlaceholder: '이름 검색',
    noResults: '아직 나온 항목이 없습니다.',
    settings: '설정',
    back: '뒤로',
    language: '언어',
    progress: '읽은 지점',
    about: '정보',
    disclaimer:
      '비공식 팬 프로젝트입니다. 작가, 황금가지, 크래프톤, HarperCollins와 관계가 없습니다. 광고와 후원이 없습니다.',
    sourceCode: '소스 코드',
    privacyPolicy: '개인정보처리방침',
    notFound: '볼 수 없는 항목입니다.',
    newBadge: '새로 나옴',
    appTagline: '인물, 종족, 장소, 용어를 스포일러 없이 찾아보는 용어집입니다.',
    noMatches: '일치하는 이름이 없습니다. 지금까지 나온 항목에서만 찾습니다.',
    typeCharacter: '인물',
    typeCreature: '생물',
    typeRace: '종족',
    typeGod: '신',
    typePlace: '장소',
    typeTerm: '용어',
  },
};

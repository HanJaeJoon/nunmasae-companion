// 화면 문구. 항목 데이터(이름, 사실)는 src/data/entries.json 에 두 언어가 같이 있다.

export const SUPPORTED_LOCALES = ['en', 'ko'] as const;
export type AppLocale = (typeof SUPPORTED_LOCALES)[number];
export const FALLBACK_LOCALE: AppLocale = 'en';

type Strings = {
  appName: string;
  greeting: string;
  openCount: string;
  bookOf: string;
  clearSearch: string;
  languageHint: string;
  version: string;
  progressTitle: string;
  progressSubtitle: string;
  bookLabel: string;
  englishNotYet: string;
  readThrough: string;
  changeProgress: string;
  tabCharacters: string;
  tabRaces: string;
  tabPlaces: string;
  tabTerms: string;
  chipAll: string;
  raceFilter: string;
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
  report: string;
  reportHint: string;
  reportIssue: string;
  reportEmail: string;
  reportSubject: string;
  reportBody: string;
  notFound: string;
  newBadge: string;
  majorBadge: string;
  revealMajor: string;
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
    appName: 'Nunmasae Companion',
    greeting: 'Read through Book %{n}.',
    openCount: '%{count} entries open so far.',
    bookOf: 'Book %{n} of %{total}',
    clearSearch: 'Clear',
    languageHint: 'Screen text and entry names.',
    version: 'Version %{v}',
    progressTitle: 'How far have you read?',
    progressSubtitle: 'Only what has appeared up to that point will be shown.',
    bookLabel: 'Book %{n}',
    englishNotYet: 'English edition not yet published',
    readThrough: 'Read through Book %{n}',
    changeProgress: 'Change',
    tabCharacters: 'Characters',
    tabRaces: 'Races & Gods',
    tabPlaces: 'Places',
    tabTerms: 'Terms',
    chipAll: 'All',
    raceFilter: 'Filter characters by race',
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
    report: 'Report a mistake',
    reportHint:
      'Facts are summarized from secondary sources, not the books themselves, so some may be wrong or placed in the wrong book. Let us know and we will fix it.',
    reportIssue: 'Report on GitHub',
    reportEmail: 'Report by email',
    reportSubject: 'Mistake: ',
    reportBody:
      'Entry name:\nRead-through setting when you saw it (Book N):\nWhat is wrong:\nWhat is right (as far as you know):\n',
    notFound: 'This entry is not available.',
    newBadge: 'New',
    majorBadge: 'Major',
    revealMajor: 'Major twist, tap to reveal',
    appTagline: 'A spoiler-free glossary of characters, races, places and terms.',
    noMatches: 'No names match up to Book %{n}.',
    typeCharacter: 'Character',
    typeCreature: 'Creature',
    typeRace: 'Race',
    typeGod: 'God',
    typePlace: 'Place',
    typeTerm: 'Term',
  },
  ko: {
    appName: '눈마새 길잡이',
    greeting: '%{n}권까지 읽었습니다.',
    openCount: '지금까지 %{count}개 항목이 열려 있습니다.',
    bookOf: '전체 %{total}권 중 %{n}권',
    clearSearch: '지우기',
    languageHint: '화면 문구와 항목 이름에 적용됩니다.',
    version: '버전 %{v}',
    progressTitle: '어디까지 읽었나요?',
    progressSubtitle: '그 지점까지 나온 것만 보여 줍니다.',
    bookLabel: '%{n}권',
    englishNotYet: '영문판 미출간',
    readThrough: '%{n}권까지 읽음',
    changeProgress: '변경',
    tabCharacters: '인물',
    tabRaces: '종족·신',
    tabPlaces: '장소',
    tabTerms: '용어',
    chipAll: '전체',
    raceFilter: '종족별로 인물 보기',
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
    report: '틀린 정보 알리기',
    reportHint:
      '사실은 책 원문이 아니라 2차 자료를 바탕으로 정리해서 틀리거나 권이 어긋난 곳이 있을 수 있습니다. 알려 주시면 고치겠습니다.',
    reportIssue: 'GitHub 이슈로 알리기',
    reportEmail: '메일로 알리기',
    reportSubject: '틀린 정보: ',
    reportBody: '항목 이름:\n본 화면의 읽은 지점(N권까지):\n틀린 내용:\n맞는 내용(아는 만큼):\n',
    notFound: '볼 수 없는 항목입니다.',
    newBadge: '새로 나옴',
    majorBadge: '주요',
    revealMajor: '주요 반전, 눌러서 보기',
    appTagline: '인물, 종족, 장소, 용어를 스포일러 없이 찾아보는 용어집입니다.',
    noMatches: '%{n}권까지 나온 이름 중에 일치하는 것이 없습니다.',
    typeCharacter: '인물',
    typeCreature: '생물',
    typeRace: '종족',
    typeGod: '신',
    typePlace: '장소',
    typeTerm: '용어',
  },
};

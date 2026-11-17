# Nunmasae Companion (눈마새 길잡이)

**한국어**: 소설 "눈물을 마시는 새"의 비공식 팬 동반 앱(unofficial fan companion)이다. 읽은 권까지만 보여 주는, 스포일러 없는 인물/장소/용어 길잡이.

**English**: An unofficial, spoiler-free fan companion for the Korean fantasy novel "The Bird That Drinks Tears". It shows characters, places and terms only up to the book you have read.

[한국어](#한국어) | [English](#english) | [개발자용 / For developers](#개발자용-안내)

## 한국어

### 어떤 앱인가

- 몇 권까지 읽었는지(1~4권) 고르면 그 권까지 나온 인물, 종족, 장소, 용어와, 항목 안에서도 그 권까지 밝혀진 사실만 보여 준다.
- 아직 안 읽은 권의 항목과 사실은 흐리게 가리는 것이 아니라 아예 화면에 그리지 않는다. 몇 개가 숨어 있는지도 드러나지 않는다.
- 지금 읽는 권의 주요 반전은 상세 화면에서 한 번 더 눌러야 보인다.
- 영어와 한국어 화면을 지원한다. 영어 화면에는 한글 이름도 함께 나온다.
- 광고, 후원, 유료 기능, 로그인, 서버가 없다. 기기에 저장하는 것은 읽은 권수와 언어 선택뿐이다.
- 받기: Google Play (곧 공개)

### 틀린 정보 알리기

사실은 책 원문이 아니라 2차 자료로 정리해서 틀리거나 권 번호가 어긋난 곳이 있을 수 있다. 알려 주면 바로 고친다.

- 앱의 설정 > "GitHub 이슈로 알리기" 또는 "메일로 알리기"
- [GitHub 이슈](https://github.com/HanJaeJoon/nunmasae-companion/issues/new/choose)에서 양식 선택: 틀린 사실 / 권 번호가 너무 이른 사실(스포일러) / 영문 표기
- 직접 고쳐서 PR 보내기: [CONTRIBUTING.md](CONTRIBUTING.md)

**스포일러 주의**: 이슈 제목과 본문에 아직 안 읽은 사람에게 스포일러가 될 내용을 쓸 때는 첫 줄에 `[스포일러 N권]`을 적어 주세요.

### 비공식 안내

원작자, 출판사(황금가지, HarperCollins), 크래프톤과 관계없는 팬 프로젝트다. 이름, 설정, 용어는 원작에 속하고, 앱의 사실 문장은 모두 직접 쓴 요약이다. 원문 인용, 표지, 삽화는 쓰지 않는다. 권리자의 요청이 오면 따지지 않고 바로 내린다.

## English

### What it is

- Pick how far you have read (Book 1 to 4). The app shows only the characters, races, places and terms that have appeared by then, and inside each entry only the facts revealed by then.
- Entries and facts from books you have not read are not blurred; they are not drawn at all, so even their count stays hidden.
- Major twists in the book you are reading now stay covered on the detail screen until you tap them.
- English and Korean screens. The English screen also shows the Korean names so you can match them with the original.
- No ads, no donations, no paid features, no login, no server. The only things stored on your device are your reading progress and language choice.
- Get it: Google Play (Coming soon)

### Report a mistake

The facts are summarized from secondary sources, not from the books themselves, so some may be wrong or placed in the wrong book. Tell us and we will fix it.

- In the app: Settings > "Report on GitHub" or "Report by email"
- [Open a GitHub issue](https://github.com/HanJaeJoon/nunmasae-companion/issues/new/choose) and pick a form: wrong fact / revealed too early (spoiler) / English name
- Fix it yourself and send a pull request: [CONTRIBUTING.md](CONTRIBUTING.md)

**Spoiler warning**: if your issue title or text would spoil something for readers who have not finished, put `[Spoiler Book N]` on the first line.

### Unofficial

This is a fan project, not affiliated with the author, the publishers (Golden Bough, HarperCollins) or Krafton. Names, settings and terms belong to the original work; every fact sentence in the app is an original summary. No quotes from the books, no covers, no illustrations. If a rights holder asks, we take it down right away.

## 개발자용 안내

이 절부터는 한국어로 쓴 개발 문서다. 영어 기여 안내는 [CONTRIBUTING.md](CONTRIBUTING.md#english)에 있다.

한국어 이름은 **눈마새 길잡이**다 (화면의 앱 이름과 한국어 기기의 홈 화면 이름. 홈 화면 이름은 `app.json` 의 `locales.ko`). 몇 권까지 읽었는지 고르면 **거기까지 나온 인물, 종족, 장소, 용어만**, 항목 안에서도 **그 권까지 밝혀진 사실만** 보여 준다. 그 너머의 항목과 사실은 흐리게 처리하지 않고 아예 렌더하지 않는다 (개수도 드러나지 않게).

Expo SDK 57 / React Native 0.86 / expo-router / TypeScript. 로그인, 서버, 광고 없음. 저장하는 것은 진행 권수, 직전 진행 권수("new" 표시용), 언어 선택뿐이다 (기기의 AsyncStorage).

진행을 올리면 직전 진행 이후 새로 열린 항목(목록)과 사실(상세)에 "new" 표시가 붙고, 다음 진행 변경 때까지 유지된다. 낮추면 표시가 없어진다.

영어 화면은 한글 이름과 한국어판 권 제목을 보조로 함께 보여 원작과 맞춰 볼 수 있게 하고, 한국어 화면은 영문 이름과 영문판 정보를 숨긴다 (`secondaryLocale`). 검색은 화면 언어와 무관하게 두 언어 이름에서 찾는다.

## 화면

| 경로 | 화면 |
|---|---|
| `src/app/progress.tsx` | 진행 선택. 첫 실행이면 제품 표식과 한 줄 소개, 읽은 권까지 채우는 책등 4개, 권 1~4 라디오 행(한국어판 권 제목. 영어 화면이면 영문판 대응도, Book Two 이후는 미출간), 비공식 안내 |
| `src/app/index.tsx` | 목록. 진행 상태 문장("Read through Book 1.")이 제목이고 옆의 책등을 누르면 진행 변경. Characters / Races & Gods / Places / Terms 탭과 이름 검색 (검색어가 있으면 모든 탭에서 찾는다). 행마다 유형과 new 표시 |
| `src/app/entry/[id].tsx` | 상세. 이름과 유형, 진행까지의 사실을 권별 패널(Book N) 안에 등장 순서대로 |
| `src/app/settings.tsx` | 언어 토글, 진행 변경, 틀린 정보 알리기(GitHub 이슈, 메일), 비공식 안내, 소스 코드와 개인정보처리방침 링크 |

진행을 아직 고르지 않았으면 목록이 진행 선택으로 보낸다.

## 코드 구조

```
src/
  data/entries.json   항목 데이터 (이름과 사실, ko/en)
  lib/
    entries.ts        타입, 권 목록, visibleEntries / visibleFacts, new 판정, 권별 묶기
    settings.tsx      진행/언어 상태 (Context) 와 저장
    prefs.ts          저장 형식과 검증
    i18n/             화면 문구 (en, ko)
    branding.ts       앱 이름, 브랜드 색, 테마 덮어쓰기, 저장 키 접두사, 개인정보처리방침 URL
    colors.ts         kit 팔레트 + 앱 accent 색 (useAppColors)
  components/         뒤로 막대, 제품 표식 줄, 책등 진행 표식, new 표시, 유형 키
  kit/                마이크로앱 공통 모듈 (손대지 않는다, src/kit/README.md)
```

## 데이터 추가 방법

`src/data/entries.json` 에 항목을 추가한다. 규칙 전체는 `CLAUDE.md` "데이터 규칙" 에 있다.

```json
{
  "id": "kagan",
  "type": "character",
  "name": { "ko": "케이건 드라카", "en": "Kagan Draca" },
  "race": "human",
  "group": "rescue-party",
  "facts": [
    { "at": 1, "ko": "...", "en": "..." }
  ]
}
```

- `type`: `character` / `race` / `god` / `place` / `term` / `creature`. 탭은 인물(`character`, `creature`), 종족과 신(`race`, `god`), 장소, 용어 넷이다.
- `at`: 그 사실이 밝혀지는 권 번호(1~4). 항목의 첫 등장은 가장 작은 `at` 이다.
- `race`, `group`: 선택. 화면에는 표시하지 않는다 (`at` 이 없어서 반전을 숨길 수 없다).
- 사실 문장은 직접 쓴 요약만. 원문 인용, 나무위키 문장 복사 금지.
- 추가 후 `pnpm run test:ci` 로 무결성(id 유일, facts 비어 있지 않음, `at` 1~4)을 확인한다.

재료는 `docs/data-draft.md` 다. 현재는 1~4권 항목 171개(인물 77, 생물 5, 종족 6, 신 5, 장소 33, 용어 45)와 사실 673개(주요 반전 92개)가 들어 있다. 사용자 검수 전 데이터이며 피드백이 오면 바로 고친다.

## 영문 표기

영문판 공식 표기(용어집의 A/B 등급, 출판사 자료 또는 독립 출처 2곳 이상) 대표 예: Human, Rekon, Tokkebi, Nhaga, Duoksini, Kagan Draca, Teenahan, Byong Srabble, Ryun Pei, Sammo Pei, Hwarit Mahkerow, Bao Moridol, Kiboren, Hattengraaj, Line of Limit, Skyray. 전체는 `docs/glossary.json` 에 있다.

임시 표기는 `docs/glossary.json` 의 `provisional` 항목이다. 영문판으로 확인하면 `entries.json` 과 용어집을 함께 고친다.

영문판 2~4권 제목: Book Two "Those Who Prepare the Way" (2027-01 예정), Book Three "The Cry of the Earth" (2027-07 예정), Book Four "Three Is Not Enough" (미정). 앱 화면(`entries.ts` 의 `BOOKS`)에는 아직 반영하지 않았다.

## 명령어

| 명령 | 하는 일 |
|---|---|
| `pnpm start` | 개발 서버 |
| `pnpm run typecheck` | `tsc --noEmit` (strict) |
| `pnpm run test:ci` | Jest 1회 실행 |
| `pnpm run lint` | ESLint (kit 단방향 의존 규칙 포함) |

출시는 `docs/RELEASE.md` 를 따른다. 아이콘과 Play 그래픽은 `scripts/make-icons.py` 가 그린 자작 레콘 마크이고, 스토어 등록정보 초안은 `docs/store-listing/` 에 있다.

## 알아둘 제약

**패키지 매니저는 pnpm 이다 (npm 을 쓰지 말 것).** 설정(`nodeLinker: hoisted`, `allowBuilds`, `overrides`)은 `pnpm-workspace.yaml` 에 있다. pnpm 11 부터 `.npmrc` 의 pnpm 설정은 무시된다. `nodeLinker: hoisted` 는 지우지 않는다 (네이티브 모듈 호환).

**`tsconfig.json` 의 `"types": ["jest", "node"]` 는 지우면 안 된다.** TypeScript 6 은 `node_modules/@types` 를 자동 포함하지 않는다.

**SDK 메이저 업그레이드에서는 락파일(`pnpm-lock.yaml`)을 재생성할 것.**

빌드 워크플로(`.github/workflows/build.yml`)는 `workflow_dispatch` 전용이라 push 만으로 빌드되지 않는다.

## License

Code: see `LICENSE`. Character names, places and terms belong to the original work; all fact sentences in `entries.json` are original summaries written for this app.

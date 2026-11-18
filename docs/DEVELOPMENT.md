# 개발자 안내

[README](../README.md) | [기여 안내](CONTRIBUTING-KR.md) | [Contributing](CONTRIBUTING.md)

한국어 이름은 **눈마새 길잡이**다 (화면의 앱 이름과 한국어 기기의 홈 화면 이름. 홈 화면 이름은 `app.json` 의 `locales.ko`). 몇 권까지 읽었는지 고르면 **거기까지 나온 인물, 종족, 장소, 용어만**, 항목 안에서도 **그 권까지 밝혀진 사실만** 보여 준다. 그 너머의 항목과 사실은 흐리게 처리하지 않고 아예 렌더하지 않는다 (개수도 드러나지 않게).

Expo SDK 57 / React Native 0.86 / expo-router / TypeScript. 로그인, 서버, 광고 없음. 저장하는 것은 진행 권수, 직전 진행 권수("new" 표시용), 언어 선택뿐이다 (기기의 AsyncStorage).

진행을 올리면 직전 진행 이후 새로 열린 항목(목록)과 사실(상세)에 "new" 표시가 붙고, 다음 진행 변경 때까지 유지된다. 낮추면 표시가 없어진다.

영어 화면은 한글 이름과 한국어판 권 제목을 보조로 함께 보여 원작과 맞춰 볼 수 있게 하고, 한국어 화면은 영문 이름과 영문판 정보를 숨긴다 (`secondaryLocale`). 검색은 화면 언어와 무관하게 두 언어 이름에서 찾는다.

## 화면

| 경로 | 화면 |
|---|---|
| `src/app/progress.tsx` | 진행 선택. 첫 실행이면 제품 표식과 한 줄 소개, 읽은 권까지 채우는 책등 4개, 권 1~4 라디오 행(한국어판 권 제목. 영어 화면이면 영문판 대응도, Book Two 이후는 미출간), 비공식 안내 |
| `src/app/index.tsx` | 목록. 진행 상태 문장("Read through Book 1.")이 제목이고 옆의 책등을 누르면 진행 변경. Characters / Races & Gods / Places / Terms 탭과 이름 검색 (검색어가 있으면 모든 탭에서 찾는다). 인물 탭에는 종족 칩(전체, 인간, 나가, 레콘, 도깨비, 보이는 인물이 0인 칩은 숨김)이 검색과 함께 걸린다. 행마다 유형과 new 표시 |
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
- `race`, `group`: 선택. `race`는 인물 탭 종족 칩으로 드러나므로 첫 등장 권에서 이미 드러난 종족만 넣는다. `group`은 화면에 표시하지 않는다 (`at` 이 없어서 반전을 숨길 수 없다).
- 사실 문장은 직접 쓴 요약만. 원문 인용, 나무위키 문장 복사 금지.
- 추가 후 `pnpm run test:ci` 로 무결성(id 유일, facts 비어 있지 않음, `at` 1~4)과 누수 검사(`src/lib/__tests__/data-guards.test.ts`)를 확인한다.
  - 이름 언급: 사실의 ko/en 문장에 다른 항목의 이름 전체가 나오면(긴 이름부터, en 은 단어 경계) 그 항목의 첫 등장이 사실의 `at` 보다 늦지 않아야 한다. 오탐은 테스트 파일의 `MENTION_EXCEPTIONS` 에 사실과 이유를 적는다.
  - 종족 칩: `race` 가 가리키는 종족 항목의 첫 등장이 인물의 첫 등장보다 늦지 않아야 한다.
  - 초안 동기화: `docs/data-draft.md` 의 `- 사실:` 줄(`(권: )` 빈칸 줄 제외)이 같은 이름 항목의 사실과 ko 문장, `at`, `major` 까지 같아야 한다.

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

CI 워크플로(`.github/workflows/ci.yml`)는 main push 와 모든 PR 에서 typecheck, test:ci, lint 를 돌린다. 빌드 워크플로(`.github/workflows/build.yml`)는 `workflow_dispatch` 전용이라 push 만으로 빌드되지 않는다.

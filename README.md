# Nunmasae Companion

Unofficial, spoiler-free fan companion for the Korean fantasy novel "The Bird That Drinks Tears" (눈물을 마시는 새). Not affiliated with the author, Golden Bough, Krafton or HarperCollins. No ads, no donations, no paid features.

소설 "눈물을 마시는 새"의 비공식 동반 앱. 몇 권까지 읽었는지 고르면 **거기까지 나온 인물, 종족, 장소, 용어만**, 항목 안에서도 **그 권까지 밝혀진 사실만** 보여 준다. 그 너머의 항목과 사실은 흐리게 처리하지 않고 아예 렌더하지 않는다 (개수도 드러나지 않게).

Expo SDK 57 / React Native 0.86 / expo-router / TypeScript. 로그인, 서버, 광고 없음. 저장하는 것은 진행 권수와 언어 선택 두 가지뿐이다 (기기의 AsyncStorage).

## 화면

| 경로 | 화면 |
|---|---|
| `src/app/progress.tsx` | 진행 선택. 권 1~4, 한국어판 권 제목과 영문판 대응 (Book Two 이후는 미출간) |
| `src/app/index.tsx` | 목록. Characters / Races & Gods / Places / Terms 탭과 이름 검색 (검색어가 있으면 모든 탭에서 찾는다) |
| `src/app/entry/[id].tsx` | 상세. 진행까지의 사실을 등장 순서대로 |
| `src/app/settings.tsx` | 언어 토글, 진행 변경, 비공식 안내, 소스 코드 링크 |

진행을 아직 고르지 않았으면 목록이 진행 선택으로 보낸다.

## 코드 구조

```
src/
  data/entries.json   항목 데이터 (이름과 사실, ko/en)
  lib/
    entries.ts        타입, 권 목록, visibleEntries / visibleFacts
    settings.tsx      진행/언어 상태 (Context) 와 저장
    prefs.ts          저장 형식과 검증
    i18n/             화면 문구 (en, ko)
    branding.ts       앱 이름, 브랜드 색, 저장 키 접두사
  components/         헤더, 진행 칩
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

재료는 vault 의 데이터 초안이다. 사용자가 권 번호를 검수한 사실만 옮긴다. 현재는 1권 사실만 들어 있다 (인물 6, 종족 4, 장소 3, 용어 3).

## 영문 표기

영문판 공식 표기(리뷰/시놉시스에서 확인): Nhaga, Tokkebi, Rekon, Human, Kagan Draca, Teenahan, Byong, Ryun Pei, Sammo Pei, Kiboren, Line of Limit, Skyray.

### 미확정 표기

공식 표기를 모르는 상태에서 임시로 쓴 것. 영문판으로 확인하면 `entries.json` 을 고치고 이 목록에서 지운다.

| 한국어 | 임시 표기 | 쓰인 곳 |
|---|---|---|
| 비형 스라블 (성) | Byong Srabl | 이름 |
| 화리트 마케로우 | Hwarit Makerow | 이름, 륜 페이 |
| 비아스 마케로우 | Vias Makerow | 화리트 마케로우 |
| 마케로우 가문 | Makerow | 하텐그라쥬 |
| 요스비 | Yosbi | 륜 페이 |
| 바우 머리돌 | Bau Meoridol | 비형 스라블 |
| 즈믄누리 | Jeumeunnuri | 비형 스라블, 도깨비 |
| 하텐그라쥬 | Hatengrazh | 이름, 륜 페이, 키보렌 |
| 하인샤 대사원 | Hainsha Great Temple | 이름, 케이건, 구출대 |
| 푼텐 사막 | Punten Desert | 케이건 |
| 마지막 주막 | Last Inn | 케이건 |
| 쇼자인테쉬크톨 | Shojaintesuktol | 사모 페이 |
| 니름 | Nirm | 이름, 나가 |
| 심장 적출 | Heart Extraction | 이름 |
| 구출대 | Rescue Party | 이름 |
| 나가 살육자 | Nhaga Slayer | 케이건 |
| 수호자 | Guardian | 화리트 마케로우 |
| 어디에도 없는 신 | God Who Is Nowhere | 인간, 하인샤 대사원 |
| 자신을 죽이는 신 | God Who Kills Himself | 도깨비 |
| 길잡이 / 대적자 / 요술쟁이 | guide / fighter / trickster | 케이건, 티나한, 비형, 구출대 |
| 도깨비불 | tokkebi fire | 비형, 도깨비 |
| 스님 | monks | 인간 |
| 영문판 2~4권 제목 | (미출간 표시) | 진행 선택 |

## 명령어

| 명령 | 하는 일 |
|---|---|
| `pnpm start` | 개발 서버 |
| `pnpm run typecheck` | `tsc --noEmit` (strict) |
| `pnpm run test:ci` | Jest 1회 실행 |
| `pnpm run lint` | ESLint (kit 단방향 의존 규칙 포함) |

출시는 `docs/RELEASE.md` 를 따른다. `assets/images/` 아이콘은 아직 템플릿의 Expo 로고이므로 출시 전에 자작 아이콘으로 바꾼다.

## 알아둘 제약

**패키지 매니저는 pnpm 이다 (npm 을 쓰지 말 것).** 설정(`nodeLinker: hoisted`, `allowBuilds`, `overrides`)은 `pnpm-workspace.yaml` 에 있다. pnpm 11 부터 `.npmrc` 의 pnpm 설정은 무시된다. `nodeLinker: hoisted` 는 지우지 않는다 (네이티브 모듈 호환).

**`tsconfig.json` 의 `"types": ["jest", "node"]` 는 지우면 안 된다.** TypeScript 6 은 `node_modules/@types` 를 자동 포함하지 않는다.

**SDK 메이저 업그레이드에서는 락파일(`pnpm-lock.yaml`)을 재생성할 것.**

빌드 워크플로(`.github/workflows/build.yml`)는 `workflow_dispatch` 전용이라 push 만으로 빌드되지 않는다.

## License

Code: see `LICENSE`. Character names, places and terms belong to the original work; all fact sentences in `entries.json` are original summaries written for this app.

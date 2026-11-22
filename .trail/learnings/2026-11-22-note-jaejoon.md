---
title: "에뮬레이터에서 앱을 띄워 확인하는 법과 영문 표기 확인 출처"
author: Jaejoon
date: 2026-11-22
branch: main
cost: { minutes: 1, tokens: 2825 }
id: l-7d7bde8f
scope: repo
status: active
src: agent
touches:
  - "src/app/entry/[id].tsx"
  - src/app/index.tsx
  - docs/glossary.json
---

- /android 없이도 `pnpm expo start --android`가 에뮬레이터 microapp에 Expo Go를 설치하고 main을 띄운다. 네이티브 빌드는 필요 없다. 딥 링크는 `exp://<호스트>:8081/--/entry/<id>` 형식이다.
- 앱이 떠 있을 때 exp 링크를 열면 콜드 스타트가 아니라 기존 스택 위에 쌓인다. 콜드 스타트 딥 링크(뒤로가 홈으로 가는지)는 `am force-stop host.exp.exponent` 뒤에 열어서 본다.
- 화면 글자와 좌표는 `uiautomator dump`로 읽는다. 화면 밖 노드는 나오지 않으므로 스크롤하며 모은다.
- 에뮬레이터 Gboard에는 한글 자판이 없어 초성 입력을 기기에서 해 볼 수 없다. 같은 Metro가 서빙하는 웹(http://localhost:8081)에서 입력해 확인했다.
- 루트 화면에서 뒤로 키(keyevent 4)를 보내면 앱이 닫히고 에뮬레이터의 다른 앱이 앞에 온다. 탭을 보내기 전에 앞에 뜬 앱이 Expo Go인지 확인한다.
- entries.json을 고치면 Fast Refresh로 앱이 다시 로드되어 진행 중인 기기 확인이 틀어진다. 기기 확인이 끝난 뒤에 데이터를 고친다.
- 영문판 표기는 Google Books 전자책의 '자주 나오는 단어 및 구문'과 미리보기 본문 검색에서 확인할 수 있다. 브라우저로만 열리고, 검색을 많이 하면 429가 난다. 본문은 보통명사를 소문자로 쓰지만(heart tower, guardian) 앱은 항목 이름을 대문자로 쓰고 링크 매칭이 대소문자를 구분하므로 대소문자는 맞추지 않았다.

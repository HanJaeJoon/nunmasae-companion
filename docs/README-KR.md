<p align="center">
  <img src="../assets/images/icon.png" alt="Nunmasae Companion" width="96"><br>
  <a href="#어떤-앱인가">소개</a> |
  <a href="#틀린-정보-알리기">틀린 정보 알리기</a> |
  <a href="#개발자-안내">개발자 안내</a><br>
  [<a href="../README.md">English</a>] | [<a href="README-KR.md">한국어</a>] | [<a href="README-JP.md">日本語</a>] | [<a href="README-ZH.md">简体中文</a>] | [<a href="README-TW.md">繁體中文</a>] | [<a href="README-ES.md">Español</a>] | [<a href="README-PTBR.md">Português (Brasil)</a>] | [<a href="README-FR.md">Français</a>] | [<a href="README-DE.md">Deutsch</a>] | [<a href="README-IT.md">Italiano</a>] | [<a href="README-RU.md">Русский</a>] | [<a href="README-PL.md">Polski</a>] | [<a href="README-TR.md">Türkçe</a>] | [<a href="README-ID.md">Bahasa Indonesia</a>] | [<a href="README-VN.md">Tiếng Việt</a>] | [<a href="README-TH.md">ไทย</a>] | [<a href="README-AR.md">العربية</a>] | [<a href="README-HI.md">हिन्दी</a>]
</p>

# 눈마새 길잡이 (Nunmasae Companion)

소설 "눈물을 마시는 새"의 비공식 팬 동반 앱(unofficial fan companion)이다. 읽은 권까지만 보여 주는, 스포일러 없는 인물/장소/용어 길잡이.

> [!NOTE]
> 앱 화면은 영어와 한국어만 지원한다. 한국어와 영어 외의 README는 Claude로 기계 번역한 것이라 고쳐 주면 반영한다.

## 어떤 앱인가

- 몇 권까지 읽었는지(1~4권) 고르면 그 권까지 나온 인물, 종족, 장소, 용어와, 항목 안에서도 그 권까지 밝혀진 사실만 보여 준다.
- 아직 안 읽은 권의 항목과 사실은 흐리게 가리는 것이 아니라 아예 화면에 그리지 않는다. 몇 개가 숨어 있는지도 드러나지 않는다.
- 지금 읽는 권의 주요 반전은 상세 화면에서 한 번 더 눌러야 보인다.
- 영어와 한국어 화면을 지원한다. 영어 화면에는 한글 이름도 함께 나온다.
- 광고, 후원, 유료 기능, 로그인, 서버가 없다. 기기에 저장하는 것은 읽은 권수와 언어 선택뿐이다.
- 받기: Google Play (곧 공개)

## 틀린 정보 알리기

사실은 책 원문이 아니라 2차 자료로 정리해서 틀리거나 권 번호가 어긋난 곳이 있을 수 있다. 알려 주면 바로 고친다.

- 앱의 설정 > "GitHub 이슈로 알리기" 또는 "메일로 알리기"
- [GitHub 이슈](https://github.com/HanJaeJoon/nunmasae-companion/issues/new/choose)에서 양식 선택: 틀린 사실 / 권 번호가 너무 이른 사실(스포일러) / 영문 표기 / 빠진 사실
- 직접 고쳐서 PR 보내기: [CONTRIBUTING-KR.md](CONTRIBUTING-KR.md)

**스포일러 주의**: 이슈 제목과 본문에 아직 안 읽은 사람에게 스포일러가 될 내용을 쓸 때는 첫 줄에 `[스포일러 N권]`을 적어 주세요.

## 비공식 안내

원작자, 출판사(황금가지, HarperCollins), 크래프톤과 관계없는 팬 프로젝트다. 이름, 설정, 용어는 원작에 속하고, 앱의 사실 문장은 모두 직접 쓴 요약이다. 원문 인용, 표지, 삽화는 쓰지 않는다. 권리자의 요청이 오면 따지지 않고 바로 내린다.

## 개발자 안내

- 기여 안내: [CONTRIBUTING-KR.md](CONTRIBUTING-KR.md)
- 개발 문서(화면, 코드 구조, 데이터 형식, 명령어): [DEVELOPMENT.md](DEVELOPMENT.md)

Expo SDK 57 / React Native 0.86 / expo-router / TypeScript. 패키지 매니저는 pnpm이다.

## 라이선스

코드는 `LICENSE`를 따른다. 인물 이름, 장소, 용어는 원작에 속하고, `entries.json`의 사실 문장은 모두 이 앱을 위해 직접 쓴 요약이다.

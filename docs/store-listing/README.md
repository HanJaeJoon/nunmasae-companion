# Play Store 등록정보

앱 내 문자열은 코드(en/ko)에 들어 있지만 스토어 등록정보는 Play Console 에 언어별로 직접 붙여넣는다.

## 등록 절차

1. Play Console > Nunmasae Companion > 스토어 설정 > **기본 스토어 등록정보**
2. 기본 언어는 **영어(미국) en-US** 다 (영문판 독자가 대상). `en-US.md` 내용을 붙여넣기
3. **번역 관리** > "직접 번역 추가" > 한국어 ko-KR 에 `ko-KR.md` 내용 붙여넣기
4. 그래픽: `graphics/play-icon-512.png`(앱 아이콘), `graphics/feature-graphic-1024x500.png`(그래픽 이미지), 스크린샷 (아직 없음)

그래픽은 `scripts/make-icons.py` 가 생성한다. 손으로 고치지 말고 스크립트를 고쳐서 다시 뽑는다.

## 쓰지 않는 것 (CLAUDE.md "절대 올리지 않는 것")

- 앱 이름과 간단한 설명에 원작 제목이나 공식 약칭(BTDT)을 넣지 않는다. 원작 제목은 자세한 설명에서 "unofficial fan companion for ..." 형태로 한 번만 쓴다.
- 원문 인용, 줄거리 요약, 공식 표지/삽화/게임 아트를 넣지 않는다. 스크린샷도 앱 화면만 쓴다.

## 검증용 글자 수

붙여넣은 뒤 Console 이 보여주는 글자 수와 대조한다. 자동 입력 방법과 주의점(clip.exe 금지, PowerShell `-sta`, 언어 칩 확인)은 loan-calculator 의 `docs/store-listing/README.md` 와 같다.

| 파일 | 앱 이름 | 간단한 설명 | 자세한 설명 | 자세한 설명 SHA-256 앞 8자 | 상태 |
|---|---|---|---|---|---|
| `en-US` | 28 | 77 | 1397 | `95a75489` | 초안 |
| `ko-KR` | 29 | 56 | 648 | `da4449fe` | 초안 |

해시는 `## ` 헤딩으로 자른 각 구획을 `strip()` 한 문자열의 SHA-256 이다 (loan-calculator README 의 스크립트와 같다).

## 글자 수 제한

| 항목 | 제한 |
|---|---|
| 앱 이름 | 30자 |
| 간단한 설명 | 80자 |
| 자세한 설명 | 4,000자 |

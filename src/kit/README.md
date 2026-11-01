# kit

앱 도메인과 무관한 재사용 모듈. 마이크로앱 공통 골격이다.

이 앱(Nunmasae Companion)은 쓰는 모듈만 남긴다. 템플릿의 `ads/`, `share/`, `chart/`, `currency.ts` 는 지웠고, 템플릿에서 kit 을 다시 복사할 때도 가져오지 않는다.

## 규칙

- `kit/`은 `app/`, `lib/`, `components/`를 **import하지 않는다.** 단방향 의존이며 ESLint로 강제한다
- 앱 고유 값(브랜드 색, 앱 이름, 번역 문자열)은 **인자나 prop으로 받는다.** kit 안에 상수로 두지 않는다
- 사용처가 1개뿐인 추상화는 kit에 올리지 않는다. 두 번째 앱에서 같은 필요가 확인되면 그때 승격한다

## 구성

- `i18n/` - 로케일 감지와 i18n 인스턴스 생성
- `theme.ts` - 라이트/다크 팔레트
- `prefs.ts` - AsyncStorage 기반 값 저장/복원

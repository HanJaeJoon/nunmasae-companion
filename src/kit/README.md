# kit

앱 도메인과 무관한 재사용 모듈. 마이크로앱 공통 골격이다.

이 앱(Nunmasae Companion)은 광고를 넣지 않으므로 템플릿의 `ads/` 는 지웠다. 템플릿에서 kit 을 다시 복사할 때 `ads/` 는 가져오지 않는다.

## 규칙

- `kit/`은 `app/`, `lib/`, `components/`를 **import하지 않는다.** 단방향 의존이며 ESLint로 강제한다
- 앱 고유 값(브랜드 색, 앱 이름, 번역 문자열)은 **인자나 prop으로 받는다.** kit 안에 상수로 두지 않는다
- 사용처가 1개뿐인 추상화는 kit에 올리지 않는다. 두 번째 앱에서 같은 필요가 확인되면 그때 승격한다

## 구성

- `i18n/` - 로케일 감지와 i18n 인스턴스 생성
- `currency.ts` - 통화 포맷(`formatCurrency`), 로케일 소수 표기(`formatDecimal`), 환산 대상 통화 판정
- `theme.ts` - 라이트/다크 팔레트
- `prefs.ts` - AsyncStorage 기반 값 저장/복원
- `share/` - 브랜드 카드 골격과 캡처/공유/저장
- `chart/` - 차트 라벨 처리와 테마 적용 라인 차트 (아래 참고)

## chart/ - Y축 라벨 로케일 표기

`ThemedLineChart` 에 `locale` 을 넘기면 Y축 라벨을 `formatDecimal` 로 그 로케일 표기로
그린다 (de/es 는 `1.234,5`, en/ko 는 `1,234.5`). kit 은 앱 로케일을 모르므로 prop 으로 받고,
생략하면 chart-kit 기본 표기(점, 천 단위 구분자 없음)다. `decimalPlaces` 를 생략하면
`chart/yAxisDecimalPlaces.ts` 가 전 계열 값 범위로 자릿수를 고른다 (최소 1, 범위가 좁아
라벨이 `0.0` 으로 뭉개지거나 반올림 때문에 라벨 간격이 고르지 않으면 늘린다, 최대 4).
금액처럼 자릿수가 정해진 값은 `decimalPlaces` 를 준다.

```tsx
<ThemedLineChart labels={labels} values={values} decimalPlaces={0} locale={appLocale} ... />
```

### 다른 앱에 역전파할 때 (loan-calculator, brick-rogue, poker-defense 의 kit/chart)

1. `chart/yAxisDecimalPlaces.ts` 와 테스트 `__tests__/yAxisDecimalPlaces.test.ts` 를 복사하고,
   `currency.ts` 에 `formatDecimal` 이 없으면 함수와 `currency.test.ts` 의 해당 describe 를 가져온다
2. `ThemedLineChart.tsx` 에 `locale` prop, `formatYLabel`, `decimalPlaces` 기본값 계산 세 군데를
   이 파일과 같게 넣는다. 그 앱 고유 기능(extraSeries 등)은 그대로 둔다
3. 차트를 쓰는 화면에서 `locale={appLocale}` 을 넘긴다. 천 단위 구분자가 붙어 라벨이 넓어지므로
   큰 금액 차트는 de/es 로 바꿔 Y축이 잘리지 않는지 눈으로 본다

### 이번 정리에서 바뀐 API (이미 kit 을 복사한 앱)

`src/kit/` 를 통째로 다시 복사한 뒤 앱 코드에서 다음을 고친다.

- `currency.ts` 의 `formatKrwApprox` / `formatApproxConverted` 는 없어졌다
  (`formatDecimal` 은 차트 Y축 로케일 표기용으로 다시 들어왔다)

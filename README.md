# skala-vue ⛅️ 오늘의 날씨

**SK AX Full-Stack Engineering — Frontend Framework: Vue.js** 과정 실습 저장소입니다.

전국 8개 도시의 실시간 날씨를 조회하는 대시보드로, 1장부터 챕터별 학습 내용을 하나의 프로젝트에 누적하여 구축했습니다.

🔗 **배포 주소**: <https://skala-vue-omega.vercel.app/>

- **기간**: 2026.8
- **기술 스택**: Vue 3 (Composition API), Vue Router, Pinia, Axios, Element Plus, Vite
- **외부 API**: OpenWeatherMap, Open-Meteo

---

## 실행 방법

```bash
# 1. 의존성 설치
npm install

# 2. 환경 변수 설정 — 루트에 .env 파일 생성
echo "VITE_WEATHER_API_KEY=발급받은_키" > .env

# 3. 개발 서버 실행
npm run dev          # http://localhost:5173

# 4. 코드 검사 및 포맷
npm run lint
npm run format

# 5. 프로덕션 빌드
npm run build
```

> API 키는 [OpenWeatherMap](https://openweathermap.org/)에서 무료로 발급받을 수 있습니다.
> `.env`는 `.gitignore`에 등록되어 저장소에 포함되지 않습니다.

---

## 주요 기능

| 기능             | 설명                                                        |
| ---------------- | ----------------------------------------------------------- |
| 실시간 날씨 조회 | 8개 도시의 기온·날씨·습도·풍속·미세먼지를 API로 실시간 조회 |
| 도시 검색        | 한글 입력으로 즉시 필터링                                   |
| 기온 구간 분류   | 더움 / 따뜻함 / 선선함 3단계 자동 분류                      |
| 상세 페이지      | 도시별 상세 기상관측 + 12시간 강수 예보 그래프              |
| 통계 페이지      | 기온 구간별 도시 분포                                       |
| 단위 변환        | 섭씨 ↔ 화씨 전역 전환                                       |
| 반응형 레이아웃  | 화면 폭에 따라 카드 열 수 자동 조정                         |

---

## 사용 API

|  #  | API             | 제공           | 용도                                |   키   |
| :-: | --------------- | -------------- | ----------------------------------- | :----: |
|  ①  | Current Weather | OpenWeatherMap | 기온·날씨·습도·풍속                 |  필요  |
|  ②  | Air Pollution   | OpenWeatherMap | 미세먼지 등급 (좌표 기반 연쇄 호출) |  필요  |
|  ③  | Forecast        | **Open-Meteo** | 12시간 시간별 강수 예보             | 불필요 |

> OpenWeatherMap 무료 플랜은 시간별 예보를 제공하지 않아, 해당 정보는 Open-Meteo API로 보완했습니다.

---

## 진행 현황

| 챕터 | 과제                                         | 상태 |
| :--: | -------------------------------------------- | :--: |
|  1   | Getting Started — Project Scaffolding        |  ✅  |
|  2   | Vue Syntax — Weather Mockup                  |  ✅  |
|  3   | Composition API — Weather Composition        |  ✅  |
|  4   | Vue Components — Weather Component           |  ✅  |
|  5   | Vue Router — Weather Router                  |  ✅  |
|  6   | Pinia — Weather Store                        |  ✅  |
|  7   | Axios — Weather Axios                        |  ✅  |
|  8   | UI Libraries — Weather UI Library            |  ✅  |
|  9   | Modern JavaScript — Weather Refinement       |  ✅  |
|  10  | Vite Build & Deployment — Weather Deployment |  ✅  |

---

# 챕터별 구현 내용

각 챕터의 **기본 요구사항**과 **⭐ 개인 추가 구현**을 구분하여 정리했습니다.

---

## 1장. Getting Started with Vue.js

### 기본 요구사항

- Node.js / VS Code Extension / Vue Devtools 개발환경 구성
- `npm create` 로 프로젝트 생성 및 실행
- HMR(Hot Module Replacement) 동작 확인
- Vue Devtools 주요 탭 기능 확인

---

## 2장. Vue Syntax — Weather Mockup

### 기본 요구사항

|  #  | 요구사항                     | 적용 문법                       |
| :-: | ---------------------------- | ------------------------------- |
|  ①  | 날씨 카드 배열 반복 출력     | `v-for` + `:key="item.id"`      |
|  ②  | 기온 조건별 라벨 표시        | `v-if` / `v-else-if` / `v-else` |
|  ③  | 한글 도시 검색 및 출력       | `:value` + `@input`             |
|  ④  | 카드 클릭 시 상태바 갱신     | `@click`                        |
|  ⑤  | 상세보기 alert (버블링 차단) | `@click.stop`                   |

> ③은 `v-model` 대신 `:value`와 `@input`을 직접 조합하여 양방향 바인딩의 내부 동작 원리를 구현했습니다.

### ⭐ 개인 추가

- **도시 데이터 확장** — 기본 3개에서 8개로 확장 (울산·김해·포항·제주도·대구 추가)
- **기온 구간 3단계 세분화** — 요구사항은 2단계였으나 `v-else-if`로 세분화

  | 구간      | 라벨      | 카드 테두리 |
  | --------- | --------- | ----------- |
  | 상한 이상 | 🔥 더움   | 레드        |
  | 중간 구간 | ♨️ 따뜻함 | 오렌지      |
  | 하한 미만 | 🍃 선선함 | 블루        |

- **`:class` 객체 바인딩** — 기온 구간에 따라 카드 좌측 테두리 색상 동적 변경
- **반응형 레이아웃** — CSS Grid `auto-fill` + `minmax`로 화면 폭에 따라 카드 열 수 자동 조정 (미디어쿼리 없이 구현)
- **UI 디테일** — 한글 단어 단위 줄바꿈(`word-break: keep-all`), iOS 자동 확대 방지

---

## 3장. Composition API — Weather Composition

### 기본 요구사항

|  #  | 요구사항            | 적용 함수                                          |
| :-: | ------------------- | -------------------------------------------------- |
|  ①  | 반응형 상태 정의    | `ref` — searchQuery, selectedCityInfo, weatherList |
|  ②  | 검색어 기반 필터링  | `computed` → `filteredWeatherList`                 |
|  ③  | 상태바 변경 감시    | `watch(selectedCityInfo, ...)`                     |
|  ③  | 검색어 실시간 추적  | `watchEffect(...)`                                 |
|  ④  | 검색 결과 없음 안내 | `v-if`                                             |

> `watch`는 이전 값 추적이 필요한 상태바에, `watchEffect`는 현재 값만 필요한 검색어에 적용하여 두 함수의 차이를 반영했습니다.

### ⭐ 개인 추가

- **반응형 변수 추가** — `showHotOnly` (더운 도시만 보기 필터 상태)
- **Computed 추가**
  - `displayList` — 검색 결과에 조건 필터를 한 번 더 적용
  - `hotCityCount` — 기준 온도 이상 도시 개수 실시간 계산
- **Watcher 추가** — `watch(showHotOnly, ...)` 로 필터 전환 로그 기록
- **Empty State UI** — 검색 결과가 없을 때 안내 영역 표시

---

## 4장. Vue Components — Weather Component

### 기본 요구사항

기능 변경 없이 단일 파일을 컴포넌트 단위로 분리했습니다.

| 파일                    | 역할                           | 통신                                     |
| ----------------------- | ------------------------------ | ---------------------------------------- |
| `WeatherParent.vue`     | 모든 반응형 데이터 보관        | —                                        |
| `BaseDashboardCard.vue` | 검색·리스트 박스 디자인 공통화 | `slot`                                   |
| `SearchBar.vue`         | 검색어 표시 및 입력 전달       | props ↓ / `update-query` ↑               |
| `WeatherCard.vue`       | 도시 정보 표시 및 이벤트 전달  | props ↓ / `select-card`·`click-detail` ↑ |

- 각 컴포넌트의 스타일을 `<style scoped>`로 분리
- 데이터는 props로 하향, 이벤트는 emits로 상향하는 단방향 흐름 유지

### ⭐ 개인 추가

- **`ListToolBar.vue` 추가 분리** — 통계 표시 및 필터 토글 담당
  - props 3개(`totalCount`, `hotCount`, `hotOnly`) 수신 / `update-hot-only` 이벤트 발신
  - **`v-model`을 `:checked` + `@change`로 분해**하여 props 읽기 전용 원칙 준수

---

## 5장. Vue Router — Weather Router

### 기본 요구사항

|  #  | 요구사항                          | 구현                                                  |
| :-: | --------------------------------- | ----------------------------------------------------- |
|  ①  | 지연 로딩 + Catch-all Route       | 전 라우트 `() => import(...)`, Catch-all 최하단 배치  |
|  ②  | Navigation Bar + RouterView       | `App.vue`에 `RouterLink` / `RouterView`               |
|  ③  | 홈 화면 + Programmatic Navigation | `window.alert` 제거 → `router.push('/weather/' + id)` |
|  ④  | 동적 경로 상세 페이지             | `route.params.cityId` 기반 `onMounted` 시점 조회      |
|  ⑤  | 서비스 소개 페이지                | 돌아가기 버튼 포함                                    |

**라우트 구성**

| 경로               | 화면                      |
| ------------------ | ------------------------- |
| `/`                | 메인 대시보드             |
| `/weather/:cityId` | 도시 상세 (동적 세그먼트) |
| `/about`           | 서비스 소개               |
| `/stats`           | 통계 ⭐                   |
| `/:pathMatch(.*)*` | 404                       |

### ⭐ 개인 추가

- **`WeatherStatsView.vue` 신규 view 작성 및 라우팅** (`/stats`)
  - 기온 구간별 도시 그룹핑, 항목 클릭 시 상세 페이지로 이동
  - 현재 적용 중인 기온 기준을 상단에 안내
- **404 페이지에 접근 경로 표시** — `route.path`로 잘못 접근한 주소 안내
- **전체 폭 Navigation Bar** — 링크 스타일 및 hover 상태 통일

---

## 6장. Pinia — Weather Store

### 기본 요구사항

**`stores/configStore.js`**

| 구분    | 이름         | 역할                         |
| ------- | ------------ | ---------------------------- |
| state   | `unit`       | 온도 단위 (초기값 `celsius`) |
| getters | `unitSymbol` | 현재 단위 기호 (℃ / ℉)       |
| actions | `toggleUnit` | 섭씨 ↔ 화씨 토글             |

- `UnitToggler.vue` 컴포넌트 작성 후 Navigation Bar에 배치
- 메인·상세 화면의 온도 표시에 단위 설정 반영
- 원본 데이터는 섭씨로 유지하고 `computed`로 표시 시점에만 변환

> 토글 버튼(Navigation Bar)과 온도 표시(카드·상세)의 컴포넌트 계층이 멀어 props 전달이 비효율적인 구조였기에 Pinia를 적용했습니다.

### ⭐ 개인 추가 1 — configStore 확장

기존에 `WeatherCard` / `WeatherHomeView` / `WeatherStatsView` **세 파일에 하드코딩**되어 있던 기온 기준값을 store로 통합했습니다.

| 구분    | 이름              | 역할                      |
| ------- | ----------------- | ------------------------- |
| state   | `hotThreshold`    | 더움 기준 온도            |
| state   | `warmThreshold`   | 따뜻함 기준 온도          |
| getters | `thresholdLabel`  | 현재 기준을 문장으로 반환 |
| actions | `setHotThreshold` | 기준 온도 변경            |

**효과** — 기준값 하나를 변경하면 카드 테두리·뱃지·홈 필터·통계 분류·기준 안내 문구가 동시에 반영됩니다.

### ⭐ 개인 추가 2 — weatherStore 신규 작성

**`stores/weatherStore.js`**

도시 데이터가 세 개의 View에 중복 정의되어 있던 문제를 해결했습니다.

| 구분    | 이름          | 역할                   |
| ------- | ------------- | ---------------------- |
| state   | `weatherList` | 전체 도시 날씨 데이터  |
| actions | `getCityById` | id 기반 단일 도시 조회 |

**효과** — 도시 추가 시 `cityMeta` 배열 한 줄만 수정하면 전 화면에 반영됩니다. 7장 API 연동 시에도 store 한 곳만 수정하여 세 화면에 동시 적용할 수 있었습니다.

---

## 7장. Axios — Weather Axios

### 기본 요구사항

|  #   | 요구사항                 | 구현                                        |
| :--: | ------------------------ | ------------------------------------------- |
| 준비 | Axios 설치 / API 키 발급 | `npm install axios`, OpenWeatherMap 가입    |
|  ①   | 실제 날씨 데이터 적용    | Current Weather API로 Mock 데이터 전면 대체 |
|  ②   | OpenWeather 추가 API     | Air Pollution API                           |
|  ③   | 기타 외부 API            | Open-Meteo Forecast API                     |

**구현 내용**

- API 키를 `.env`(`VITE_` 접두어) 환경 변수로 분리하고 `.gitignore`에 등록
- `weatherStore`에 `fetchWeather` / `isLoading` / `errorMessage` 추가
- `async/await` + `try/catch/finally` 기반 비동기 처리
- 로딩 중·에러 상태를 `v-if` / `v-else-if` / `v-else`로 분기 표시
- 한글 도시명과 API 조회용 영문명을 `cityMeta` 대조표로 분리 관리

### ⭐ 개인 추가 1 — 대기질 API 연동

- OpenWeatherMap **Air Pollution API** 추가 연동
- 날씨 응답의 좌표(`coord.lat`, `coord.lon`)를 사용한 **연쇄 비동기 호출**
- AQI 등급(1~5)을 한글 라벨로 변환하여 상세 페이지에 표시

### ⭐ 개인 추가 2 — 시간별 강수 예보 (기타 외부 API)

**Open-Meteo API** — 유럽·미국 기상청 공개 데이터를 제공하는 무료 오픈소스 기상 API (인증 키 불필요)

- 현재 시각 기준 **12시간 강수확률·강수량·기온** 조회
- 응답의 시간 배열 인덱스와 현재 시각을 매칭해 필요한 구간만 슬라이싱
- **차트 라이브러리 없이** `v-bind` 스타일 바인딩만으로 막대그래프 구현

```vue
<div class="bar" :style="{ height: item.rainProb + '%' }"></div>
```

- 12시간 누적 강수량 예상치 계산 및 표시

---

## 8장. UI Libraries — Weather UI Library

### 기본 요구사항

- 외부 UI Library로 **Element Plus** 선정 — 국내 점유율과 학습 난이도를 고려
- `main.js`에 전역 등록 (`app.use(ElementPlus)` + 전용 CSS import)

### 적용 컴포넌트

| 위치      | 컴포넌트          | 카테고리 | 개선 효과                       |
| --------- | ----------------- | -------- | ------------------------------- |
| 검색창    | `el-input`        | Form     | 지우기(X) 버튼·검색 아이콘 내장 |
| 필터 토글 | `el-switch`       | Form     | 체크박스보다 직관적인 조작      |
| 상세보기  | `el-button`       | Basic    | 표준 버튼 스타일 및 상태 지원   |
| 상세 정보 | `el-descriptions` | Data     | 명세서 형태 격자 표             |
| 로딩      | `el-skeleton`     | Feedback | 레이아웃 시프트 없는 로딩 표현  |
| 결과 없음 | `el-empty`        | Data     | 일러스트 포함 안내              |
| 알림      | `ElMessage`       | Feedback | 토스트 알림 (성공·실패)         |

### ⭐ 개인 추가 및 판단

- **전면 교체가 아닌 부분 적용** — 직접 구현한 카드 디자인과 강수 예보 그래프는 유지하고, 라이브러리가 확실히 유리한 영역(폼·피드백·데이터 표시)에만 선별 적용
- **`el-input`의 이벤트 시그니처 차이 대응** — 일반 `<input>`의 `@input`은 이벤트 객체를 전달하지만 `el-input`은 값을 직접 전달하므로 핸들러 수정

```js
const handleInput = (value) => emit('update-query', value)
```

- **`:model-value` 사용** — `v-model` 대신 값만 하향 전달하여 단방향 데이터 흐름 원칙 유지
- **죽은 CSS 정리** — `scoped` 스타일이 라이브러리 컴포넌트 내부에 적용되지 않는 특성을 확인하고, 무효가 된 규칙을 제거

---

## 9장. Modern JavaScript — Weather Refinement

### 기본 요구사항

|  #  | 요구사항                     | 구현                                           |
| :-: | ---------------------------- | ---------------------------------------------- |
|  ①  | 라이브러리 추가 및 기능 정비 | dayjs 도입, ES6+ 문법으로 전면 리팩터링        |
|  ②  | 스타일 다듬기                | 서비스 소개 페이지 갱신, 전체 폭 레이아웃 개선 |
|  ③  | README 정리                  | 챕터별 요구사항·개인 확장 문서화               |

### ⭐ 개인 추가 1 — API 응답 방어 코드

외부 API 응답 구조를 신뢰하던 코드에 **옵셔널 체이닝**과 **널 병합 연산자**를 적용해, 필드가 누락되어도 앱이 중단되지 않도록 처리했습니다.

```js
const { main, weather, wind, coord } = res.data
const { query: _query, ...cityInfo } = city

result.push({
  ...cityInfo,
  temp: Math.round(main?.temp ?? 0),
  status: weather?.[0]?.description ?? '정보 없음',
  wind: wind?.speed ?? 0,
})
```

| 문법               | 적용 이유                                            |
| ------------------ | ---------------------------------------------------- |
| `?.` 옵셔널 체이닝 | 중간 객체 누락 시 에러 대신 `undefined` 반환         |
| `??` 널 병합       | 풍속·강수량처럼 **0이 유효한 값**에 `\|\|` 대신 사용 |
| 구조분해 할당      | 중첩 접근을 줄여 파싱 코드 간결화                    |
| Rest 문법          | API 조회용 `query` 필드를 결과에서 제외              |
| 스프레드           | 도시 메타 정보와 API 응답을 병합                     |

### ⭐ 개인 추가 2 — dayjs 도입

문자열 슬라이싱으로 처리하던 시각 계산을 날짜 라이브러리로 교체했습니다.

```js
// 이전
const startIndex = new Date().getHours()
hour: hourly.time[i].slice(11, 13)

// 이후
const startIndex = dayjs().hour()
hour: dayjs(hourly.time?.[i]).format('HH')
```

문자열 형식 변경에 취약하던 구조를 개선했습니다.

### ⭐ 개인 추가 3 — API 실패 상태 처리

개발 중 Open-Meteo 무료 사용량을 초과해 **429 (Too Many Requests)** 응답을 받았고, 이때 예보 그래프가 아무 안내 없이 사라지는 문제를 발견했습니다.

```js
forecastError.value =
  e.response?.status === 429
    ? '예보 조회 요청이 많아 잠시 후 다시 시도해 주세요.'
    : '예보 정보를 불러오지 못했습니다.'
```

상태 코드에 따라 다른 안내를 표시하도록 개선했습니다.

### ⭐ 개인 추가 4 — 직접 접근 대응

상세 페이지를 URL로 직접 열거나 새로고침하면 전역 store가 비어 있어 데이터를 찾지 못하는 문제를 확인하고, 데이터가 없을 때 스스로 조회하도록 보완했습니다.

```js
onMounted(async () => {
  if (weatherStore.weatherList.length === 0) {
    await weatherStore.fetchWeather()
  }
})
```

---

## 10장. Vite Build & Deployment — Weather Deployment

### 기본 요구사항

|  #  | 요구사항                 | 구현                                      |
| :-: | ------------------------ | ----------------------------------------- |
|  ①  | ESLint 점검 후 Error 0건 | `npm run lint` 통과 (oxlint + ESLint)     |
|  ②  | API 키 환경 변수 처리    | `.env` + `.gitignore` 등록, 저장소 미포함 |
|  ③  | 프로젝트 빌드            | `npm run build`                           |
|  ④  | 정적 호스팅 후 확인      | Vercel 배포                               |

### ⭐ 개인 추가

- **ESLint 커스텀 규칙 대응** — Rest 문법으로 특정 필드를 제외하는 패턴이 `no-unused-vars`에 걸리는 문제를 확인하고, 명명 규칙(`_` 접두어)으로 의도를 명시
- **린터 이원화 구조 파악** — 프로젝트가 oxlint(1차 고속 검사)와 ESLint(정밀 검사)를 순차 실행하는 구조임을 확인하고, 오류 출처에 따라 해당 설정 파일을 수정
- **배포 환경 변수 분리** — `.env`가 저장소에 포함되지 않으므로 호스팅 플랫폼에 별도 등록

---

# 프로젝트 구조

```
src/
├── main.js                        앱 초기화 (Pinia · Router · Element Plus 등록)
├── App.vue                        Navigation Bar + RouterView
├── router/
│   └── index.js                   라우트 정의 (지연 로딩 · Catch-all)
├── stores/
│   ├── configStore.js             단위 설정 · 기온 기준
│   └── weatherStore.js            도시 날씨 데이터 · API 통신
├── views/
│   ├── WeatherHomeView.vue        메인 대시보드
│   ├── WeatherDetailView.vue      도시 상세 + 강수 예보
│   ├── WeatherStatsView.vue       통계 ⭐
│   ├── WeatherAboutView.vue       서비스 소개
│   └── NotFoundView.vue           404
└── components/
    └── exercise/
        ├── BaseDashboardCard.vue  공통 박스 (slot)
        ├── SearchBar.vue          검색창
        ├── WeatherCard.vue        날씨 카드
        ├── ListToolBar.vue        통계·필터 툴바 ⭐
        └── UnitToggler.vue        단위 전환 버튼
```

---

# 개인 커스터마이징 요약

| 챕터 | 추가 구현                                                                               |
| :--: | --------------------------------------------------------------------------------------- |
|  2   | 도시 8개로 확장 · 기온 3단계 세분화 · `:class` 테두리 색상 · `auto-fill` 반응형 그리드  |
|  3   | `showHotOnly` 필터 · `displayList`·`hotCityCount` computed · watcher 추가 · Empty State |
|  4   | `ListToolBar.vue` 추가 분리 · `v-model` 분해 구현                                       |
|  5   | `WeatherStatsView` 신규 view + 라우팅 · 404 경로 안내                                   |
|  6   | configStore에 기온 기준 확장 · **weatherStore 신규 작성**                               |
|  7   | Air Pollution API 연쇄 호출 · **Open-Meteo 강수 예보 그래프**                           |
|  8   | Element Plus **선별 적용** · 이벤트 시그니처 차이 대응 · 죽은 CSS 정리                  |
|  9   | **API 방어 코드(`?.` `??`)** · dayjs 도입 · 429 에러 처리 · 직접 접근 대응              |
|  10  | ESLint 규칙 대응 · 린터 이원화 구조 파악 · 배포 환경 변수 분리                          |

---

# 참고

- [Vue.js 공식 문서](https://vuejs.org/)
- [Vue Router](https://router.vuejs.org/) · [Pinia](https://pinia.vuejs.org/) · [Vite](https://vite.dev/)
- [Element Plus](https://element-plus.org/) · [Day.js](https://day.js.org/)
- [OpenWeatherMap API](https://openweathermap.org/api) · [Open-Meteo API](https://open-meteo.com/)

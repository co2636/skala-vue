<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
  router.push('/')
}
</script>

<template>
  <div class="about-page">
    <div class="about-card">
      <h2>ℹ️ 서비스 소개</h2>
      <p>
        전국 주요 도시의 실시간 날씨를 한눈에 확인할 수 있는 대시보드입니다. SKALA 과정의 Vue.js
        실습 프로젝트로 제작했습니다.
      </p>

      <h3>주요 기능</h3>
      <ul>
        <li><strong>실시간 조회</strong> — 기온·날씨·습도·풍속·미세먼지</li>
        <li><strong>도시 검색</strong> — 한글 입력으로 즉시 필터링</li>
        <li><strong>기온 구간 분류</strong> — 더움 / 따뜻함 / 선선함 자동 구분</li>
        <li><strong>상세 페이지</strong> — 12시간 강수 예보 그래프 제공</li>
        <li><strong>단위 전환</strong> — 섭씨 ↔ 화씨 (상단 버튼)</li>
      </ul>

      <h3>데이터 출처</h3>
      <ul>
        <li>현재 날씨 · 대기질 — OpenWeatherMap</li>
        <li>시간별 강수 예보 — Open-Meteo</li>
      </ul>

      <h3>사용 기술</h3>
      <ul>
        <li><strong>Vue 3</strong> — Composition API (ref, computed, watch, watchEffect)</li>
        <li><strong>Component</strong> — props, emits, slot 기반 컴포넌트 분리</li>
        <li><strong>Vue Router</strong> — 동적 라우팅, 지연 로딩, Catch-all Route</li>
        <li><strong>Pinia</strong> — 전역 상태 관리 (날씨 데이터, 단위 설정)</li>
        <li><strong>Axios</strong> — 외부 API 비동기 통신</li>
        <li><strong>Element Plus</strong> — UI 컴포넌트 라이브러리</li>
      </ul>

      <button class="btn-back" @click="goHome">← 대시보드로 돌아가기</button>
    </div>
  </div>
</template>

<style scoped>
.about-page {
  max-width: 620px;
  margin: 0 auto;
  padding: 0 16px;
  color: #2c3e50;
}

.about-card {
  padding: 24px;
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
}

.about-card h2 {
  margin: 0 0 12px;
  font-size: 22px;
}

.about-card h3 {
  margin: 22px 0 8px;
  font-size: 16px;
  color: #0f766e;
}

.about-card ul {
  margin: 0;
  padding-left: 20px;
}

.about-card li {
  margin: 5px 0;
}

.about-card p,
.about-card li {
  font-size: 15px;
  line-height: 1.7;
  color: #475569;
}

.btn-back {
  width: 100%;
  margin-top: 20px;
  padding: 12px;
  font-size: 15px;
  font-weight: 600;
  color: #ffffff;
  background-color: #0f766e;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}
</style>

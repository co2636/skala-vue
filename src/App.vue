<script setup>
import { RouterLink, RouterView } from 'vue-router'
import UnitToggler from '@/components/exercise/UnitToggler.vue'
</script>

<template>
  <div class="app-wrapper">
    <nav class="nav-bar">
      <div class="nav-links">
        <RouterLink to="/">🏠 대시보드</RouterLink>
        <RouterLink to="/about">ℹ️ 서비스 소개</RouterLink>
        <RouterLink to="/stats">📊 통계</RouterLink>
      </div>

      <UnitToggler />
    </nav>

    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.nav-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  padding: 12px 20px;
  background-color: #0f766e;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 6px;
}

.nav-links a {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 9px 16px;
  font-size: 15px;
  font-weight: 600;
  color: #d1fae5;
  text-decoration: none;
  border-radius: 8px;
  white-space: nowrap;
  transition:
    background-color 0.15s,
    color 0.15s;
}

.nav-links a:hover {
  color: #ffffff;
  background-color: rgba(255, 255, 255, 0.14);
}

/* 현재 페이지 강조 (Vue Router가 자동으로 붙여주는 클래스) */
.nav-links a.router-link-exact-active {
  color: #0f766e;
  background-color: #ffffff;
}

.main-content {
  padding: 20px 0 0;
}

@media (max-width: 599px) {
  .nav-bar {
    justify-content: center;
    padding: 12px 14px;
  }

  .nav-links a {
    padding: 8px 12px;
    font-size: 14px;
  }
}
</style>

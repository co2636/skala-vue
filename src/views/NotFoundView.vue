<script setup>
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const goHome = () => {
  router.push('/')
}
</script>

<template>
  <div class="notfound-page">
    <h1>404</h1>
    <p>요청하신 페이지를 찾을 수 없습니다.</p>
    <p class="path">{{ route.path }}</p>
    <button class="btn-back" @click="goHome">← 대시보드로 돌아가기</button>
  </div>
</template>

<style scoped>
.notfound-page {
  max-width: 480px;
  margin: 60px auto;
  padding: 0 16px;
  text-align: center;
  color: #2c3e50;
}

.notfound-page h1 {
  margin: 0;
  font-size: 72px;
  color: #cbd5e1;
}

.path {
  font-size: 14px;
  color: #94a3b8;
}

.btn-back {
  margin-top: 20px;
  padding: 12px 24px;
  font-size: 15px;
  font-weight: 600;
  color: #ffffff;
  background-color: #0f766e;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}
</style>

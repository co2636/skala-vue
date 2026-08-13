<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useConfigStore } from '@/stores/configStore.js'
import { useWeatherStore } from '@/stores/weatherStore.js'

const weatherStore = useWeatherStore()
const configStore = useConfigStore()
const router = useRouter()

const hotCities = computed(() =>
  weatherStore.weatherList.filter((item) => item.temp >= configStore.hotThreshold),
)
const warmCities = computed(() =>
  weatherStore.weatherList.filter(
    (item) => item.temp >= configStore.warmThreshold && item.temp < configStore.hotThreshold,
  ),
)
const coolCities = computed(() =>
  weatherStore.weatherList.filter((item) => item.temp < configStore.warmThreshold),
)

const convertTemp = (rawTemp) => {
  if (configStore.unit === 'fahrenheit') {
    return Math.round((rawTemp * 9) / 5 + 32)
  }
  return rawTemp
}
const goDetail = (cityId) => {
  router.push('/weather/' + cityId)
}

const goHome = () => {
  router.push('/')
}
</script>

<template>
  <div class="stats-page">
    <h2>📊 날씨 통계</h2>
    <p class="threshold-info">기준: {{ configStore.thresholdLabel }}</p>
    <div class="stat-box">
      <h3>🔥 더운 도시 ({{ hotCities.length }}곳)</h3>
      <ul>
        <li v-for="item in hotCities" :key="item.id" @click="goDetail(item.id)">
          {{ item.name }} — {{ convertTemp(item.temp) }}{{ configStore.unitSymbol }}
        </li>
      </ul>
    </div>

    <div class="stat-box">
      <h3>♨️ 따뜻한 도시 ({{ warmCities.length }}곳)</h3>
      <ul>
        <li v-for="item in warmCities" :key="item.id" @click="goDetail(item.id)">
          {{ item.name }} — {{ convertTemp(item.temp) }}{{ configStore.unitSymbol }}
        </li>
      </ul>
    </div>

    <div class="stat-box">
      <h3>🍃 선선한 도시 ({{ coolCities.length }}곳)</h3>
      <ul>
        <li v-for="item in coolCities" :key="item.id" @click="goDetail(item.id)">
          {{ item.name }} — {{ convertTemp(item.temp) }}{{ configStore.unitSymbol }}
        </li>
      </ul>
    </div>

    <button class="btn-back" @click="goHome">← 대시보드로 돌아가기</button>
  </div>
</template>

<style scoped>
.threshold-info {
  margin: 0 0 16px;
  font-size: 14px;
  color: #64748b;
}

.stats-page {
  max-width: 620px;
  margin: 0 auto;
  padding: 0 16px;
  color: #2c3e50;
}

.stat-box {
  margin-bottom: 16px;
  padding: 20px;
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
}

.stat-box h3 {
  margin: 0 0 12px;
  font-size: 16px;
}

.stat-box ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

.stat-box li {
  padding: 10px 0;
  font-size: 15px;
  border-bottom: 1px solid #f1f5f9;
  cursor: pointer;
}

.stat-box li:hover {
  color: #0f766e;
}

.btn-back {
  width: 100%;
  padding: 12px;
  font-size: 15px;
  font-weight: 600;
  color: #ffffff;
  background-color: #0f766e;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.btn-back:hover {
  background-color: #115e59;
}
</style>

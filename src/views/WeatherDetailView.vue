<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useConfigStore } from '@/stores/configStore.js'
import { useWeatherStore } from '@/stores/weatherStore.js'

const weatherStore = useWeatherStore()
const configStore = useConfigStore()

const route = useRoute()
const router = useRouter()

const cityDetail = ref(null)

onMounted(() => {
  const cityId = route.params.cityId
  cityDetail.value = weatherStore.getCityById(cityId)

  if (cityDetail.value) {
    weatherStore.fetchForecast(cityDetail.value.lat, cityDetail.value.lon)
  }
})

const goHome = () => {
  router.push('/')
}

const displayTemp = computed(() => {
  if (!cityDetail.value) return 0

  const rawTemp = cityDetail.value.temp
  if (configStore.unit === 'fahrenheit') {
    return Math.round((rawTemp * 9) / 5 + 32)
  }
  return rawTemp
})
const totalRain = computed(() => {
  let sum = 0
  for (const item of weatherStore.forecastList) {
    sum = sum + item.rainMm
  }
  return Math.round(sum * 10) / 10
})
</script>

<template>
  <div class="detail-page">
    <div v-if="cityDetail" class="detail-card">
      <h2>{{ cityDetail.name }} 상세 기상관측</h2>
      <p class="status">{{ cityDetail.status }} · {{ displayTemp }}{{ configStore.unitSymbol }}</p>

      <el-descriptions :column="2" border>
        <el-descriptions-item label="습도">{{ cityDetail.humidity }}%</el-descriptions-item>
        <el-descriptions-item label="풍속">{{ cityDetail.wind }} m/s</el-descriptions-item>
        <el-descriptions-item label="미세먼지">{{ cityDetail.dust }}</el-descriptions-item>
        <el-descriptions-item label="도시 코드">{{ cityDetail.id }}</el-descriptions-item>
      </el-descriptions>

      <div v-if="weatherStore.forecastList.length > 0" class="forecast">
        <h3 class="forecast-title">앞으로 12시간 강수</h3>

        <div class="forecast-chart">
          <div v-for="item in weatherStore.forecastList" :key="item.hour" class="forecast-col">
            <span class="prob">{{ item.rainProb }}%</span>

            <div class="bar-area">
              <div class="bar" :style="{ height: item.rainProb + '%' }"></div>
            </div>

            <span class="temp">{{ item.temp }}°</span>
            <span class="hour">{{ item.hour }}</span>
          </div>
        </div>

        <p class="forecast-note">총 강수량 {{ totalRain }}mm 예상</p>
      </div>

      <button class="btn-back" @click="goHome">← 대시보드로 돌아가기</button>
    </div>

    <div v-else class="detail-card">
      <h2>해당 도시 정보를 찾을 수 없습니다</h2>
      <p class="status">요청한 도시 코드: {{ route.params.cityId }}</p>
      <button class="btn-back" @click="goHome">← 대시보드로 돌아가기</button>
    </div>
  </div>
</template>

<style scoped>
.detail-page {
  max-width: 620px;
  margin: 0 auto;
  padding: 0 16px;
  color: #2c3e50;
}

.detail-card {
  padding: 24px;
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
}

.detail-card h2 {
  margin: 0 0 6px;
  font-size: 22px;
}

.status {
  margin: 0 0 20px;
  font-size: 15px;
  color: #64748b;
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
.forecast {
  margin-top: 24px;
  padding-top: 20px;
  border-top: 1px solid #f1f5f9;
}

.forecast-title {
  margin: 0 0 14px;
  font-size: 15px;
  font-weight: 700;
}

.forecast-chart {
  display: flex;
  justify-content: space-between;
  gap: 4px;
}

.forecast-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  flex: 1;
}

.prob {
  font-size: 10px;
  color: #3b82f6;
  font-weight: 600;
}

.bar-area {
  display: flex;
  align-items: flex-end;
  width: 100%;
  height: 60px;
  background-color: #f1f5f9;
  border-radius: 4px;
  overflow: hidden;
}

.bar {
  width: 100%;
  background-color: #3b82f6;
  border-radius: 4px 4px 0 0;
  min-height: 2px;
}

.temp {
  font-size: 11px;
  font-weight: 600;
  color: #2c3e50;
}

.hour {
  font-size: 10px;
  color: #94a3b8;
}

.forecast-note {
  margin: 14px 0 0;
  font-size: 13px;
  color: #64748b;
  text-align: center;
}
</style>

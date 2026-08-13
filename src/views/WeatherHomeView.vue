<script setup>
import { ref, computed, watch, watchEffect, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import BaseDashboardCard from '@/components/exercise/BaseDashboardCard.vue'
import SearchBar from '@/components/exercise/SearchBar.vue'
import WeatherCard from '@/components/exercise/WeatherCard.vue'
import ListToolBar from '@/components/exercise/ListToolBar.vue'
import { useConfigStore } from '@/stores/configStore.js'
import { useWeatherStore } from '@/stores/weatherStore.js'

import { ElMessage } from 'element-plus'

onMounted(async () => {
  await weatherStore.fetchWeather()

  if (weatherStore.errorMessage) {
    ElMessage.error(weatherStore.errorMessage)
  } else {
    ElMessage.success('날씨 정보를 불러왔습니다.')
  }
})

onMounted(() => {
  weatherStore.fetchWeather()
})
const configStore = useConfigStore()
const weatherStore = useWeatherStore()
const router = useRouter()

const searchQuery = ref('')
const selectedCityInfo = ref('카드를 클릭하거나 검색해 보세요.')

const showHotOnly = ref(false)

const filteredWeatherList = computed(() => {
  const query = searchQuery.value.trim()

  if (!query) {
    return weatherStore.weatherList
  }
  return weatherStore.weatherList.filter((item) => item.name.includes(query))
})

const displayList = computed(() => {
  if (showHotOnly.value) {
    return filteredWeatherList.value.filter((item) => item.temp >= configStore.hotThreshold)
  }
  return filteredWeatherList.value
})

const hotCityCount = computed(() => {
  return filteredWeatherList.value.filter((item) => item.temp >= configStore.hotThreshold).length
})

watch(selectedCityInfo, (newInfo, oldInfo) => {
  console.log(`[watch 감지] 상태바 변경: "${oldInfo}" → "${newInfo}"`)
})

watchEffect(() => {
  console.log(
    `[watchEffect 자동 호출] 현재 검색어 '${searchQuery.value}'에 매칭되는 데이터를 필터링합니다.`,
  )
})

watch(showHotOnly, (newValue, oldValue) => {
  console.log(`[watch 감지] 더운 도시만 보기: ${oldValue} → ${newValue}`)
})

const onUpdateQuery = (newQuery) => {
  searchQuery.value = newQuery
}

const onSelectCard = (cityName) => {
  selectedCityInfo.value = `${cityName}이 선택되었습니다.`
}

const onClickDetail = (cityItem) => {
  router.push('/weather/' + cityItem.id)
}

const onUpdateHotOnly = (value) => {
  showHotOnly.value = value
}
</script>

<template>
  <div>
    <h1>⛅️ 오늘의 날씨!</h1>
  </div>

  <div class="dashboard">
    <BaseDashboardCard title="🔍 도시 검색">
      <SearchBar :query="searchQuery" @update-query="onUpdateQuery" />
    </BaseDashboardCard>

    <BaseDashboardCard title="🏙️ 지역별 날씨 현황">
      <ListToolBar
        :total-count="filteredWeatherList.length"
        :hot-count="hotCityCount"
        :hot-only="showHotOnly"
        @update-hot-only="onUpdateHotOnly"
      />

      <div class="card-grid">
        <template v-if="weatherStore.isLoading">
          <el-skeleton v-for="n in 8" :key="n" :rows="3" animated class="skeleton-card" />
        </template>

        <p v-else-if="weatherStore.errorMessage" class="empty-message">
          {{ weatherStore.errorMessage }}
        </p>

        <template v-else>
          <WeatherCard
            v-for="item in displayList"
            :key="item.id"
            :city-item="item"
            @select-card="onSelectCard"
            @click-detail="onClickDetail"
          />

          <el-empty
            v-if="displayList.length === 0"
            class="empty-message"
            description="조건에 일치하는 도시가 없습니다"
          />
        </template>
      </div>
    </BaseDashboardCard>

    <div class="status-bar">
      {{ selectedCityInfo }}
    </div>
  </div>
</template>

<style scoped>
h1 {
  max-width: 1600px;
  margin: 28px auto 18px;
  padding: 18px 16px;
  font-size: 24px;
  text-align: center;
  color: #ffffff;
  background-color: #0f766e;
  border-radius: 14px;
  word-break: keep-all;
}

.dashboard {
  max-width: 1600px;
  margin: 0 auto 60px;
  padding: 0 16px;
  font-family: 'Malgun Gothic', sans-serif;
  color: #2c3e50;
  box-sizing: border-box;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 14px;
}

.empty-message {
  grid-column: 1 / -1;
  padding: 20px 16px;
  margin: 0;
  text-align: center;
  font-size: 15px;
  color: #94a3b8;
  background-color: #ffffff;
  border-radius: 12px;
  word-break: keep-all;
}

.status-bar {
  padding: 14px 18px;
  font-size: 14px;
  font-weight: 500;
  color: #ffffff;
  background-color: #2c3e50;
  border-radius: 10px;
  text-align: center;
  word-break: keep-all;
}

@media (min-width: 600px) {
  h1 {
    font-size: 28px;
  }

  .dashboard {
    padding: 0 24px;
  }
}

.skeleton-card {
  padding: 16px;
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
}
</style>

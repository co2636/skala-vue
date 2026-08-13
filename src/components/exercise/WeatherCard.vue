<script setup>
import { computed } from 'vue'
import { useConfigStore } from '@/stores/configStore.js'

const props = defineProps({
  cityItem: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['select-card', 'click-detail'])

const configStore = useConfigStore()

const displayTemp = computed(() => {
  const rawTemp = props.cityItem.temp
  if (configStore.unit === 'fahrenheit') {
    return Math.round((rawTemp * 9) / 5 + 32)
  }
  return rawTemp
})

const handleCardClick = (cityName) => {
  emit('select-card', cityName)
}

const handleDetailClick = (item) => {
  emit('click-detail', item)
}
</script>

<template>
  <div
    class="weather-card"
    :class="{
      'card-hot': cityItem.temp >= configStore.hotThreshold,
      'card-warm':
        cityItem.temp >= configStore.warmThreshold && cityItem.temp < configStore.hotThreshold,
      'card-cool': cityItem.temp < configStore.warmThreshold,
    }"
    @click="handleCardClick(cityItem.name)"
  >
    <h4>{{ cityItem.name }}({{ cityItem.status }})</h4>
    <p>현재 기온: {{ displayTemp }}{{ configStore.unitSymbol }}</p>

    <span v-if="cityItem.temp >= configStore.hotThreshold" class="badge hot">
      🔥 더움 ({{ configStore.hotThreshold }}도 이상)
    </span>
    <span v-else-if="cityItem.temp >= configStore.warmThreshold" class="badge warm">
      ♨️ 따뜻함
    </span>
    <span v-else class="badge cool">🍃 선선함</span>

    <el-button
      class="btn-detail"
      type="success"
      size="small"
      @click.stop="handleDetailClick(cityItem)"
    >
      상세보기
    </el-button>
  </div>
</template>

<style scoped>
.weather-card {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 16px;
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-left: 4px solid #94a3b8;
  border-radius: 12px;
  cursor: pointer;
}

.weather-card.card-hot {
  border-left-color: #ef4444; /* 빨강 */
}

.weather-card.card-warm {
  border-left-color: #f97316; /* 주황 */
}

.weather-card.card-cool {
  border-left-color: #3b82f6; /* 파랑 */
}

.weather-card h4 {
  margin: 0;
  font-size: 17px;
  word-break: keep-all;
}

.weather-card p {
  margin: 0;
  font-size: 14px;
  color: #64748b;
}

.badge {
  align-self: flex-start;
  padding: 5px 12px;
  font-size: 13px;
  font-weight: 600;
  border-radius: 999px;
  white-space: nowrap;
}

.badge.hot {
  background-color: #fee2e2;
  color: #b91c1c;
}

.badge.warm {
  background-color: #feebdb;
  color: #d8451d;
}

.badge.cool {
  background-color: #dbeafe;
  color: #1d4ed8;
}

.btn-detail {
  width: 100%;
}

@media (min-width: 600px) {
  .weather-card {
    position: relative;
    padding: 18px 20px;
    padding-right: 120px;
  }

  .btn-detail {
    position: absolute;
    top: 18px;
    right: 20px;
    width: auto;
    padding: 8px 15px;
    font-size: 13px;
  }
}
</style>

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useConfigStore = defineStore('config', () => {
  const unit = ref('celsius')
  const hotThreshold = ref(30)
  const warmThreshold = ref(24)

  const unitSymbol = computed(() => (unit.value === 'celsius' ? '℃' : '℉'))
  const thresholdLabel = computed(
    () => `더움 ${hotThreshold.value}도 이상 / 따뜻함 ${warmThreshold.value}도 이상`,
  )

  const toggleUnit = () => {
    unit.value = unit.value === 'celsius' ? 'fahrenheit' : 'celsius'
  }

  const setHotThreshold = (value) => {
    hotThreshold.value = value
  }

  return {
    unit,
    hotThreshold,
    warmThreshold,
    unitSymbol,
    thresholdLabel,
    toggleUnit,
    setHotThreshold,
  }
})

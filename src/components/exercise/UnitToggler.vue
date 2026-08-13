<script setup>
import { useConfigStore } from '@/stores/configStore.js'

const configStore = useConfigStore()

const handleToggle = () => {
  configStore.toggleUnit()
}
</script>

<template>
  <div class="unit-area">
    <span class="unit-label">
      날씨단위:
      <strong>{{ configStore.unit === 'celsius' ? '섭씨(℃)' : '화씨(℉)' }}</strong>
    </span>
    <button class="unit-toggler" @click="handleToggle">단위변경</button>
  </div>
</template>

<style scoped>
.unit-area {
  display: inline-flex;
  align-items: center;
  gap: 10px;
}

.unit-label {
  font-size: 14px;
  font-weight: 500;
  color: #d1fae5;
  white-space: nowrap;
}

.unit-label strong {
  font-size: 15px;
  font-weight: 700;
  color: #ffffff;
}

.unit-toggler {
  padding: 8px 16px;
  font-size: 15px;
  font-weight: 700;
  color: #0f766e;
  background-color: #ffffff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  white-space: nowrap;
}

.unit-toggler:hover {
  background-color: #e2e8f0;
}
</style>

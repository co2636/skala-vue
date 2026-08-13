<script setup>
import { Search } from '@element-plus/icons-vue'

defineProps({
  query: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['update-query'])

const handleInput = (value) => {
  emit('update-query', value)
}
</script>

<template>
  <div class="search-area">
    <el-input
      :model-value="query"
      @input="handleInput"
      placeholder="검색할 도시 이름 입력"
      size="large"
      clearable
      :prefix-icon="Search"
    />
    <p>
      검색 중인 도시: <strong>{{ query }}</strong>
    </p>
  </div>
</template>

<style scoped>
.search-area p {
  margin: 10px 0 0;
  font-size: 14px;
  color: #64748b;
  word-break: keep-all;
}

.search-area strong {
  color: #42b883;
}
</style>

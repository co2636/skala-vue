<script setup>
defineProps({
  totalCount: {
    type: Number,
    required: true,
  },
  hotCount: {
    type: Number,
    required: true,
  },
  hotOnly: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits(['update-hot-only'])
</script>

<template>
  <div class="list-toolbar">
    <span>총 {{ totalCount }}곳 · 더운 도시 {{ hotCount }}곳</span>
    <div class="toolbar-check">
      <el-switch
        :model-value="hotOnly"
        @change="(value) => emit('update-hot-only', value)"
        active-text="더운 도시만"
      />
    </div>
  </div>
</template>

<style scoped>
.list-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 12px;
  font-size: 14px;
  color: #64748b;
}

.toolbar-check {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
}
</style>

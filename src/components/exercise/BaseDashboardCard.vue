<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <section class="dashboard-card">
    <h3>{{ title }}</h3>
    <slot></slot>
  </section>
</template>

<style scoped>
.dashboard-card {
  margin-bottom: 24px;
  padding: 16px;
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
}

.dashboard-card h3 {
  margin: 0 0 12px;
  font-size: 16px;
  font-weight: 700;
}

@media (min-width: 600px) {
  .dashboard-card {
    padding: 20px;
  }
}
</style>

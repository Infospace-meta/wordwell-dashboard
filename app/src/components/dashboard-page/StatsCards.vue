<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2">
    <div
      v-for="stat in stats"
      :key="stat.title"
      class="rounded-xl p-3 border border-gray-200 bg-white"
    >
      <p class="text-gray-600">{{ stat.title }}</p>
      <p class="text-gray-700">{{ stat.value }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  stats: {
    type: Array,
    default: () => [],
  },
});
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
    <div 
      v-for="stat in stats" 
      :key="stat.title"
      class="bg-white rounded-xl shadow-sm p-6 flex flex-col"
    >
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-sm font-medium text-gray-500">{{ stat.title }}</h3>
        <Icon :name="stat.icon" class="w-5 h-5 text-gray-400" />
      </div>
      <p class="text-2xl font-bold text-gray-900">{{ stat.value }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  stats: {
    type: Array,
    default: () => []
  }
});
</script>
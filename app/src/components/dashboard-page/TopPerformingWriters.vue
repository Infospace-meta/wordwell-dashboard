<template>
  <div class="bg-white rounded-xl shadow-sm p-6">
    <h2 class="text-lg font-semibold mb-4">Top Performing Writers</h2>
    <div class="space-y-4">
      <div v-for="n in 3" :key="n" class="flex items-center justify-between">
        <div class="flex items-center">
          <div class="w-8 h-8 bg-gray-300 rounded-full"></div>
          <div class="ml-3">
            <p class="font-medium text-gray-900">Writer {{ n }}</p>
            <p class="text-sm text-gray-500">Completed: {{ 10 - n }} orders</p>
          </div>
        </div>
        <span class="text-green-600 font-medium">Rating: 4.{{ 9 - n / 2 }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>
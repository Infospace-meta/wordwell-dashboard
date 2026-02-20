<!-- src/components/dashboard-page/PendingReviews.vue -->
<template>
  <div class="bg-white rounded-xl shadow-sm p-6">
    <h2 class="text-lg font-semibold mb-4">Pending Reviews</h2>
    <div class="space-y-4">
      <!-- Placeholder -->
      <div v-for="n in 2" :key="n" class="border-b pb-2">
        <p class="font-medium text-gray-900">Order #{{ 100 + n }}</p>
        <p class="text-sm text-gray-500">Awaiting review from client</p>
      </div>
    </div>
    <p v-if="false" class="text-center text-gray-500">No pending reviews</p>
  </div>
</template>

<script setup>
// Fetch real data if needed
</script>
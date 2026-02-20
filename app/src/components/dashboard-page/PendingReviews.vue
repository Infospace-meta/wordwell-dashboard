<template>
  <div class="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm h-full">
    <h3 class="font-semibold text-slate-700 mb-4">Pending Reviews</h3>
    
    <div class="space-y-3">
      <div v-for="review in pendingReviews" :key="review.id" class="flex items-center justify-between">
        <span class="text-sm text-slate-600">{{ review.title }}</span>
        <span class="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full">
          {{ review.timeLeft }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  pendingReviews: {
    type: Array,
    default: () => [
      { id: "10234", title: "#10234 - Academic Essay", timeLeft: "2h left" },
      { id: "10212", title: "#10212 - Research Paper", timeLeft: "4h left" },
    ]
  }
});
</script>
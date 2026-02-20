<!-- src/components/dashboard-page/QuickActions.vue -->
<template>
  <div class="bg-white rounded-xl shadow-sm p-6">
    <h2 class="text-lg font-semibold mb-4">Quick Actions</h2>
    <div class="space-y-3">
      <button 
        @click="$emit('new-order')"
        class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
      >
        Create New Order
      </button>
      <button 
        @click="$emit('add-writer')"
        class="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
      >
        Add New Writer
      </button>
      <!-- Add more actions if needed -->
    </div>
  </div>
</template>

<script setup>
defineEmits(['new-order', 'add-writer']);
</script>
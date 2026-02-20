<template>
  <div class="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm h-full">
    <h3 class="font-semibold text-slate-700 mb-4">Quick Actions</h3>
    
    <div class="grid grid-cols-2 gap-3">
      <button 
        class="p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors flex flex-col items-center gap-2"
        @click="emit('new-order')"
      >
        <svg class="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        <span class="text-xs text-slate-600">New Order</span>
      </button>

      <button 
        class="p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors flex flex-col items-center gap-2"
        @click="emit('add-writer')"
      >
        <svg class="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <span class="text-xs text-slate-600">Add Writer</span>
      </button>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['new-order', 'add-writer']);
</script>
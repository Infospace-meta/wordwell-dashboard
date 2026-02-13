<script setup>
defineProps({
  activeFilter: String,
  filters: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["update:activeFilter"]);

const setFilter = (filter) => {
  emit("update:activeFilter", filter);
};
</script>

<template>
  <div class="flex flex-wrap gap-3">
    <button
      v-for="filter in filters"
      :key="filter"
      @click="setFilter(filter)"
      class="relative px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300"
      :class="[
        activeFilter === filter
          ? 'bg-linear-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-600/25 scale-105'
          : 'bg-white text-slate-600 border-2 border-slate-200 hover:border-blue-500/50 hover:bg-slate-50/80 hover:shadow-md',
      ]"
    >
      {{ filter }}
      <span
        v-if="activeFilter === filter"
        class="absolute -top-1 -right-1 h-3 w-3"
      >
        <span
          class="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"
        ></span>
        <span class="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
      </span>
    </button>
  </div>
</template>

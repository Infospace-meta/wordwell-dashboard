<template>
  <div class="flex flex-wrap justify-end gap-1">
    <button
      v-for="filter in filters"
      :key="filter"
      @click="setFilter(filter)"
      class="px-4 py-1"
      :class="[
        activeFilter === filter
          ? 'bg-linear-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-600/25 rounded-2xl'
          : 'bg-white text-slate-600 border rounded-2xl border-slate-200 hover:border-blue-500/50 hover:bg-slate-50/80',
      ]"
    >
      {{ filter }}
      <span v-if="activeFilter === filter"> </span>
    </button>
  </div>
</template>

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

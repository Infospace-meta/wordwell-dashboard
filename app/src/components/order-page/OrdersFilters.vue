<template>
  <div class="flex flex-wrap justify-end border-neutral-200 py-4 px-6">
    <button
      v-for="filter in filters"
      :key="filter"
      @click="setFilter(filter)"
      class="px-4 py-1"
      :class="[
        activeFilter === filter
          ? 'bg-neutral-50 text-blue-600 border-neutral-300 mx-2'
          : 'bg-white text-neutral-600 border-neutral-200 hover:bg-neutral-50/80',
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

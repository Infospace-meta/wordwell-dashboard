<script setup>
defineProps({
  search: String,
});

const emit = defineEmits(["update:search"]);

const handleSearch = (e) => {
  emit("update:search", e.target.value);
};
</script>

<template>
  <div
    class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6"
  >
    <div class="space-y-2">
      <div class="flex items-center gap-3">
        <div
          class="h-10 w-2 bg-linear-to-b from-blue-600 to-indigo-600 rounded-full"
        ></div>
        <h1
          class="text-4xl font-bold bg-linear-to-r from-slate-800 to-slate-700 bg-clip-text text-transparent"
        >
          Orders
        </h1>
      </div>
      <p class="text-slate-500 text-sm ml-5">
        Track and manage all customer orders in one place
      </p>
    </div>

    <div class="relative w-full sm:w-96">
      <div
        class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"
      >
        <svg
          class="h-5 w-5 text-slate-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <input
        :value="search"
        @input="handleSearch"
        type="text"
        placeholder="Search by order ID or email..."
        class="w-full pl-12 pr-5 py-3.5 rounded-2xl border-2 border-slate-200 bg-white/80 backdrop-blur-sm shadow-lg focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 outline-none transition-all duration-300 text-slate-700 placeholder-slate-400"
      />
    </div>
  </div>
</template>

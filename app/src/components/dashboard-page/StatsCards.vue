<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
    <div
      v-for="stat in stats"
      :key="stat.title"
      class="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 group"
    >
      <div class="flex items-start justify-between">
        <div>
          <p class="text-sm font-medium text-slate-500">{{ stat.title }}</p>
          <p
            class="text-2xl font-bold text-slate-800 mt-2 group-hover:text-blue-600 transition-colors"
          >
            {{ stat.value }}
          </p>
          <p
            v-if="stat.change"
            class="text-xs mt-2"
            :class="
              stat.change.includes('+') ? 'text-emerald-600' : 'text-rose-600'
            "
          >
            {{ stat.change }} from last month
          </p>
        </div>

        <!-- Icon -->
        <div class="p-3 rounded-xl" :class="getIconColor(stat.title)">
          <svg
            class="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              :d="getIcon(stat.icon)"
            />
          </svg>
        </div>
      </div>

      <!-- Mini sparkline (visual element) -->
      <div class="mt-4 h-1 w-full bg-slate-100 rounded-full overflow-hidden">
        <div
          class="h-full bg-blue-600 rounded-full"
          :style="{ width: Math.random() * 70 + 30 + '%' }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  stats: {
    type: Array,
    required: true,
  },
});

const getIcon = (iconName) => {
  const icons = {
    "shopping-bag": "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z",
    "credit-card":
      "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z",
    clock: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
    "check-circle": "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
    "trending-up": "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
  };
  return icons[iconName] || icons["shopping-bag"];
};

const getIconColor = (title) => {
  const colors = {
    "Total Orders": "text-blue-600 bg-blue-50",
    "Paid Orders": "text-emerald-600 bg-emerald-50",
    "In Progress": "text-amber-600 bg-amber-50",
    Completed: "text-emerald-600 bg-emerald-50",
    Revenue: "text-indigo-600 bg-indigo-50",
  };
  return colors[title] || "text-slate-600 bg-slate-50";
};
</script>

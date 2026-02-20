<template>
  <div class="grid grid-cols-2 lg:grid-cols-5 gap-4">
    <div
      class="bg-white/80 backdrop-blur-sm rounded-2xl p-5 border-2 border-slate-200 shadow-lg"
    >
      <p class="text-xs font-semibold text-slate-500 uppercase tracking-wider">
        Total Orders
      </p>
      <p class="text-3xl font-bold text-slate-800 mt-2">{{ totalOrders }}</p>
    </div>
    <div
      class="bg-white/80 backdrop-blur-sm rounded-2xl p-5 border-2 border-slate-200 shadow-lg"
    >
      <p class="text-xs font-semibold text-slate-500 uppercase tracking-wider">
        Active
      </p>
      <p class="text-3xl font-bold text-blue-600 mt-2">{{ activeOrders }}</p>
    </div>
    <div
      class="bg-white/80 backdrop-blur-sm rounded-2xl p-5 border-2 border-slate-200 shadow-lg"
    >
      <p class="text-xs font-semibold text-slate-500 uppercase tracking-wider">
        Completed
      </p>
      <p class="text-3xl font-bold text-emerald-600 mt-2">
        {{ completedOrders }}
      </p>
    </div>
    <div
      class="bg-white/80 backdrop-blur-sm rounded-2xl p-5 border-2 border-slate-200 shadow-lg"
    >
      <p class="text-xs font-semibold text-slate-500 uppercase tracking-wider">
        Revenue
      </p>
      <p class="text-3xl font-bold text-slate-800 mt-2">${{ totalRevenue }}</p>
    </div>
    <div
      class="bg-linear-to-br from-blue-600 to-indigo-600 rounded-2xl p-5 border-2 border-white/20 shadow-lg"
    >
      <p class="text-xs font-semibold text-white/80 uppercase tracking-wider">
        Success Rate
      </p>
      <p class="text-3xl font-bold text-white mt-2">{{ successRate }}%</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  orders: {
    type: Array,
    required: true,
  },
});

const totalOrders = computed(() => props.orders.length);
const activeOrders = computed(
  () => props.orders.filter((o) => o.status === "In Progress").length,
);
const completedOrders = computed(
  () => props.orders.filter((o) => o.status === "Completed").length,
);
const totalRevenue = computed(() => {
  return props.orders.reduce(
    (acc, curr) => acc + parseFloat(curr.amount.replace("$", "")),
    0,
  );
});
const successRate = computed(() => {
  return Math.round((completedOrders.value / totalOrders.value) * 100) || 0;
});
</script>

<template>
  <div class="grid grid-cols-2 lg:grid-cols-5 gap-2">
    <div class="rounded-lg py-3 border border-slate-200 px-4">
      <p class="text-slate-500">Total Orders</p>
      <p class="text-lg text-slate-800">{{ totalOrders }}</p>
    </div>
    <div class="rounded-lg py-3 border border-slate-200 px-4">
      <p class="text-slate-500">
        Active
      </p>
      <p class="text-lg text-slate-800">{{ activeOrders }}</p>
    </div>
    <div class="rounded-lg py-3 border border-slate-200 px-4">
      <p class="text-slate-500">
        Completed
      </p>
      <p class="text-lg text-slate-800">
        {{ completedOrders }}
      </p>
    </div>
    <div class="rounded-lg py-3 border border-slate-200 px-4">
      <p class="text-slate-500">
        Revenue
      </p>
      <p class="text-lg text-slate-800">${{ totalRevenue }}</p>
    </div>
    <div class="rounded-lg py-3 border border-slate-200 px-4">
      <p class="text-slate-500">
        Success Rate
      </p>
      <p class="text-lg text-slate-800">{{ successRate }}%</p>
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
  () => props.orders.filter((o) => o.status === "In Progress").length
);
const completedOrders = computed(
  () => props.orders.filter((o) => o.status === "Completed").length
);
const totalRevenue = computed(() => {
  return props.orders.reduce(
    (acc, curr) => acc + parseFloat(curr.amount.replace("$", "")),
    0
  );
});
const successRate = computed(() => {
  return Math.round((completedOrders.value / totalOrders.value) * 100) || 0;
});
</script>

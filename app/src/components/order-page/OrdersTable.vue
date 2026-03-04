<template>
  <div class="bg-white rounded-lg border border-slate-200 overflow-hidden">
    <div class="overflow-x-auto">
      <table class="min-w-full text-sm">
        <thead>
          <tr
            class="bg-linear-to-r from-slate-50 to-white border-b-2 border-slate-200"
          >
            <th class="px-6 py-3 text-left">
              <span
                class="text-xs font-semibold text-slate-500 uppercase tracking-wider"
                >Order</span
              >
            </th>
            <th class="px-6 py-3 text-left">
              <span
                class="text-xs font-semibold text-slate-500 uppercase tracking-wider"
                >Deadline</span
              >
            </th>
            <th class="px-6 py-3 text-left">
              <span
                class="text-xs font-semibold text-slate-500 uppercase tracking-wider"
                >Words</span
              >
            </th>
            <th class="px-6 py-3 text-left">
              <span
                class="text-xs font-semibold text-slate-500 uppercase tracking-wider"
                >Amount</span
              >
            </th>
            <th class="px-6 py-3 text-left">
              <span
                class="text-xs font-semibold text-slate-500 uppercase tracking-wider"
                >Status</span
              >
            </th>
            <th class="px-6 py-3 text-left">
              <span
                class="text-xs font-semibold text-slate-500 uppercase tracking-wider"
                >Payment</span
              >
            </th>
            <th class="px-6 py-3 text-right">
              <span
                class="text-xs font-semibold text-slate-500 uppercase tracking-wider"
                >Actions</span
              >
            </th>
          </tr>
        </thead>

        <tbody class="divide-y divide-slate-100">
          <OrderRow
            v-for="order in filteredOrders"
            :key="order.id"
            :order="order"
          />

          <EmptyState v-if="filteredOrders.length === 0" />
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import OrderRow from "./OrderRow.vue";
import EmptyState from "./EmptyState.vue";

const props = defineProps({
  orders: {
    type: Array,
    required: true,
  },
  search: String,
  activeFilter: String,
});

const filteredOrders = computed(() =>
  props.orders.filter((order) => {
    const matchesFilter =
      props.activeFilter === "All" ||
      order.status === props.activeFilter ||
      order.payment === props.activeFilter;

    const matchesSearch =
      order.id.toLowerCase().includes(props.search.toLowerCase()) ||
      order.email.toLowerCase().includes(props.search.toLowerCase());

    return matchesFilter && matchesSearch;
  })
);
</script>

<template>
  <div
    class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
  >
    <div
      class="px-6 py-4 border-b border-slate-100 flex items-center justify-between"
    >
      <div>
        <h3 class="font-semibold text-slate-800">Recent Orders</h3>
        <p class="text-xs text-slate-500 mt-1">
          Latest 5 orders from your store
        </p>
      </div>
      <button
        class="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
      >
        View All
        <svg
          class="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>

    <div class="overflow-x-auto">
      <table class="w-full text-sm">
        <thead class="bg-slate-50 text-slate-500 text-xs">
          <tr>
            <th class="px-6 py-3 text-left font-medium">Order ID</th>
            <th class="px-6 py-3 text-left font-medium">Client</th>
            <th class="px-6 py-3 text-left font-medium">Deadline</th>
            <th class="px-6 py-3 text-left font-medium">Words</th>
            <th class="px-6 py-3 text-left font-medium">Amount</th>
            <th class="px-6 py-3 text-left font-medium">Status</th>
            <th class="px-6 py-3 text-left font-medium">Payment</th>
            <th class="px-6 py-3 text-right font-medium">Actions</th>
          </tr>
        </thead>

        <tbody class="divide-y divide-slate-100">
          <tr
            v-for="order in orders"
            :key="order.id"
            class="hover:bg-slate-50 transition-colors"
          >
            <td class="px-6 py-4 font-mono font-medium text-slate-800">
              {{ order.id }}
            </td>
            <td class="px-6 py-4">
              <div class="flex items-center gap-2">
                <div
                  class="w-7 h-7 rounded-full bg-linear-to-br from-slate-600 to-slate-700 flex items-center justify-center text-white text-xs font-medium"
                >
                  {{ order.email.charAt(0).toUpperCase() }}
                </div>
                <span class="text-slate-600">{{ order.email }}</span>
              </div>
            </td>
            <td class="px-6 py-4 text-slate-600">{{ order.deadline }}</td>
            <td class="px-6 py-4 text-slate-600">
              {{ order.words.toLocaleString() }}
            </td>
            <td class="px-6 py-4 font-semibold text-slate-800">
              {{ order.amount }}
            </td>

            <td class="px-6 py-4">
              <span
                class="inline-flex px-3 py-1 rounded-full text-xs font-medium"
                :class="statusColors[order.status]"
              >
                {{ order.status }}
              </span>
            </td>

            <td class="px-6 py-4">
              <span
                class="inline-flex px-3 py-1 rounded-full text-xs font-medium"
                :class="paymentColors[order.payment]"
              >
                {{ order.payment }}
              </span>
            </td>

            <td class="px-6 py-4 text-right">
              <button
                class="px-3 py-1.5 text-xs rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
              >
                View
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Table Footer -->
    <div
      class="px-6 py-3 border-t border-slate-100 bg-slate-50/50 text-xs text-slate-500 flex items-center justify-between"
    >
      <span>Showing {{ orders.length }} orders</span>
      <span>Updated just now</span>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";

defineProps({
  orders: {
    type: Array,
    required: true,
  },
});

const statusColors = {
  Completed: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20",
  "In Progress": "bg-blue-50 text-blue-700 ring-1 ring-blue-600/20",
  Pending: "bg-amber-50 text-amber-700 ring-1 ring-amber-600/20",
  Failed: "bg-rose-50 text-rose-700 ring-1 ring-rose-600/20",
};

const paymentColors = {
  Paid: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20",
  Pending: "bg-amber-50 text-amber-700 ring-1 ring-amber-600/20",
  Failed: "bg-rose-50 text-rose-700 ring-1 ring-rose-600/20",
};
</script>

<template>
  <div class="bg-white rounded-lg overflow-hidden border border-slate-200">
    <div class="overflow-x-auto">
      <table class="min-w-full text-sm">
        <thead>
          <tr class="border-b border-slate-200 bg-slate-50/50">
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
          <!-- Render Rows -->
          <tr
            v-for="order in filteredOrders"
            :key="order.id"
            class="group hover:bg-neutral-400/5 transition-all duration-300"
          >
            <td class="px-6 py-5">
              <div class="flex flex-col">
                <span class="font-medium text-slate-800">{{ order.id }}</span>
                <span
                  class="text-sm text-slate-500 mt-1 flex items-center gap-1"
                >
                  <svg
                    class="h-3 w-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  {{ order.email }}
                </span>
              </div>
            </td>

            <td class="px-6 py-5">
              <div class="flex items-center gap-2 text-slate-600">
                <svg
                  class="h-4 w-4 text-slate-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                {{ order.deadline }}
              </div>
            </td>

            <td class="px-6 py-5 text-slate-600">
              {{ (order.words || 0).toLocaleString() }}
            </td>

            <td class="px-6 py-5">
              <span class="text-neutral-800 text-lg font-medium">
                {{ order.amount }}
              </span>
            </td>

            <td class="px-6 py-5">
              <!-- Replaced custom OrderBadge with dynamic classes for demonstration -->
              <span
                :class="[
                  'px-2.5 py-1 rounded-full text-xs font-medium',
                  order.status === 'Completed'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-amber-100 text-amber-700',
                ]"
              >
                {{ order.status }}
              </span>
            </td>

            <td class="px-6 py-5">
              <span
                :class="[
                  'px-2.5 py-1 rounded-full text-xs font-medium',
                  order.payment === 'Paid'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-slate-100 text-slate-700',
                ]"
              >
                {{ order.payment }}
              </span>
            </td>

            <td class="px-6 py-5 text-right">
              <div class="flex items-center justify-end gap-2">
                <button
                   @click="selectOrder(order.id)"
                  class="px-4 py-2 text-sm rounded-lg text-neutral-500 border border-neutral-300 hover:cursor-pointer hover:text-blue-800 hover:border-blue-800 transition-all duration-200 flex items-center gap-1"
                >
                  View
                </button>
                <button
                  v-if="order.status !== 'Completed'"
                  class="px-4 py-2 text-sm bg-green-700 hover:bg-green-800 hover:cursor-pointer text-white rounded-md transition-all duration-200"
                >
                  Complete
                </button>
              </div>
            </td>
          </tr>

          <!-- Empty State -->
          <tr v-if="filteredOrders.length === 0">
            <td colspan="7" class="px-6 py-12 text-center text-slate-500">
              <div class="flex flex-col items-center gap-2">
                <svg
                  class="h-8 w-8 text-slate-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p>No orders found matching your criteria.</p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";

/**VARIABLES */
const router = useRouter();

const props = defineProps({
  orders: {
    type: Array,
    required: true,
    default: () => [],
  },
  search: {
    type: String,
    default: "",
  },
  activeFilter: {
    type: String,
    default: "All",
  },
});

const emit = defineEmits(["select-order"]);

const selectOrder = (orderId) => {
  // Option A: Use the name we defined in step 1
  router.push({ name: 'order-edit', params: { id: orderId } });
  
  // Optional: keeping the emit if your parent component still needs it
  emit("select-order", orderId);
};

const filteredOrders = computed(() => {
  return props.orders.filter((order) => {
    // 1. Logic for Category/Status filter
    const matchesFilter =
      props.activeFilter === "All" ||
      order.status === props.activeFilter ||
      order.payment === props.activeFilter;

    // 2. Logic for Search (ID or Email)
    const searchLower = props.search.toLowerCase();
    const matchesSearch =
      order.id.toLowerCase().includes(searchLower) ||
      order.email.toLowerCase().includes(searchLower);

    return matchesFilter && matchesSearch;
  });
});
</script>

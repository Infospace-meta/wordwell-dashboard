<template>
  <div class="bg-white rounded-lg max-h-[55vh] overflow-auto border border-slate-200">
    <div class="overflow-x-auto">
      <table class="min-w-full text-sm ">
        <thead class="border-b border-slate-200 bg-slate-50/50">
          <tr>
            <th
              v-for="header in [
                'Order',
                'Deadline',
                'Words',
                'Amount',
                'Status',
                'Payment',
              ]"
              :key="header"
              class="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider"
            >
              {{ header }}
            </th>
            <th
              class="px-6 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider"
            >
              Actions
            </th>
          </tr>
        </thead>

        <tbody class="divide-y divide-slate-100 overflow-auto ">
          <!-- Loading State -->
          <tr v-if="loading">
            <td colspan="7" class="px-6 py-12 text-center text-slate-400">
              <div class="flex flex-col items-center gap-2">
                <svg
                  class="animate-spin h-5 w-5 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Loading orders...
              </div>
            </td>
          </tr>

          <!-- Data Rows -->
          <tr
            v-else
            v-for="order in filteredOrders"
            :key="order.id"
            class="group hover:bg-slate-50 transition-all duration-200 "
          >
            <td @click="handleView(order.id)" class="px-6 py-5 hover:cursor-pointer">
              <div class="flex flex-col">
                <span class="font-semibold text-slate-900">{{
                  order.displayId || `#${order.id.slice(0, 5)}`
                }}</span>
                <span
                  class="text-xs text-slate-500 mt-1 flex items-center gap-1"
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

            <td class="px-6 py-5 text-slate-600">
              {{ order.deadline || "---" }}
            </td>

            <td class="px-6 py-5 text-slate-600">
              {{ (order.words || 0).toLocaleString() }}
              <span class="text-xs opacity-60">wds</span>
            </td>

            <td class="px-6 py-5">
              <span class="text-slate-900 font-bold">
                {{ formatCurrency(order.amount) }}
              </span>
            </td>

            <td class="px-6 py-5">
              <span :class="getStatusStyles(order.status)">
                {{ formatStatus(order.status) }}
              </span>
            </td>

            <td class="px-6 py-5">
              <span
                :class="
                  order.payment === 'Paid'
                    ? 'bg-blue-50 text-blue-700'
                    : 'bg-slate-100 text-slate-600'
                "
                class="px-2.5 py-1 rounded-full text-xs font-medium border border-transparent"
              >
                {{ order.payment }}
              </span>
            </td>

            <td class="px-6 py-5 text-right">
              <div
                class="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <button
                  @click="handleView(order.id)"
                  class="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="View details"
                >
                  <svg
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </button>
                <!-- <button
                  v-if="order.status !== 'COMPLETED'"
                  @click="handleComplete(order.id)"
                  class="p-2 text-slate-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                  title="Mark Complete"
                >
                  <svg
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </button> -->
              </div>
            </td>
          </tr>

          <!-- Empty State -->
          <tr v-if="!loading && filteredOrders.length === 0">
            <td colspan="7" class="px-6 py-12 text-center text-slate-500">
              <div class="flex flex-col items-center">
                <div class="bg-slate-50 p-3 rounded-full mb-3">
                  <svg
                    class="w-6 h-6 text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <p class="font-medium text-slate-900">No orders found</p>
                <p class="text-sm">Try adjusting your search or filters.</p>
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
import { useOrderStore } from "@/store";

const props = defineProps({
  orders: { type: Array, required: true },
  search: { type: String, default: "" },
  activeFilter: { type: String, default: "All" },
  loading: { type: Boolean, default: false },
});

const emit = defineEmits(["select-order"]);
const router = useRouter();
const orderStore = useOrderStore();

// UI Helpers
const formatCurrency = (val) => {
  const amount =
    typeof val === "string" ? parseFloat(val.replace(/[^0-9.-]+/g, "")) : val;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount || 0);
};

// const getStatusClass = (status) => {
//   const base =
//     "px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-tight ";
//   switch (status?.toLowerCase()) {
//     case "completed":
//       return base + "bg-green-100 text-green-700";
//     case "failed":
//       return base + "bg-red-100 text-red-700";
//     case "pending":
//       return base + "bg-amber-100 text-amber-700";
//     default:
//       return base + "bg-slate-100 text-slate-700";
//   }
// };

// Helper to make "PENDING_PAYMENT" look like "Pending"
const formatStatus = (status) => {
  if (!status) return "Unknown";
  return status.replace("_", " ").toLowerCase();
};

// Helper for dynamic colors
const getStatusStyles = (status) => {
  const base = "px-2.5 py-1 rounded-full text-xs font-medium capitalize ";
  if (status === "PAID") return base + "bg-green-100 text-green-700";
  if (status.includes("PENDING")) return base + "bg-amber-100 text-amber-700";
  return base + "bg-slate-100 text-slate-700";
};

const handleView = (orderId) => {
  router.push({ name: "order-edit", params: { id: orderId } });
  emit("select-order", orderId);
};

const handleComplete = async (orderId) => {
  if (confirm("Mark this order as completed?")) {
    try {
      await orderStore.updateOrder(orderId, { status: "COMPLETED" });
    } catch (err) {
      alert("Failed to update status");
    }
  }
};

const filteredOrders = computed(() => {
  return props.orders.filter((order) => {
    // 1. Filter Logic
    let matchesFilter = true;

    if (props.activeFilter !== "All") {
      if (props.activeFilter === "Paid") {
        // Matches the 'payment' property you created in the store
        matchesFilter = order.payment === "Paid";
      } else if (props.activeFilter === "Pending") {
        // Matches 'PENDING_PAYMENT' from your API (Case-insensitive)
        matchesFilter = order.status?.toLowerCase().includes("pending");
      } else {
        // Fallback for other statuses like 'COMPLETED'
        matchesFilter =
          order.status?.toLowerCase() === props.activeFilter.toLowerCase();
      }
    }

    // 2. Search Logic
    const searchLower = props.search.toLowerCase();
    const orderId = String(order.displayId || "").toLowerCase();
    const orderEmail = String(order.email || "").toLowerCase();

    const matchesSearch =
      orderId.includes(searchLower) || orderEmail.includes(searchLower);

    return matchesFilter && matchesSearch;
  });
});
</script>

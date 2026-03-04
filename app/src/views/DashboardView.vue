<template>
  <div class="">
    <main class="p-6 max-w-7xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <p class="text-4xl text-slate-800">
          Welcome back, Admin 👋
        </p>
      </div>

      <!-- Stats cards -->
      <StatsCards :stats="orderStore.stats" />

      <!-- Main content: Recent Orders + Order Detail -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
        <div class="lg:col-span-2">
          <RecentOrders
            :orders="orderStore.orders"
            @select-order="orderStore.fetchOrderById"
          />
        </div>

        <div class="lg:col-span-1">
          <OrderDetail
            v-if="orderStore.currentOrder"
            :order="orderStore.currentOrder"
            @close="orderStore.currentOrder = null"
            @update-order="handleUpdate"
            @update-payment-status="handleUpdate"
            @delete-order="handleDelete"
            @suspend-order="handleSuspend"
          />
          <div
            v-else
            class="bg-white rounded-xl p-6 h-full flex items-center justify-center text-center text-gray-400 border border-dashed"
          >
            <p>Select an order to view full details</p>
          </div>
        </div>
      </div>

      <!-- Bottom cards – adapt layout when detail is open -->
      <!-- <div class="mt-6">
        <div
          class="grid gap-6"
          :class="
            selectedOrder
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
              : 'grid-cols-1 md:grid-cols-3'
          "
        >
          <TopPerformingWriters />
          <PendingReviews />
          <QuickActions
            @new-order="handleNewOrder"
            @add-writer="handleAddWriter"
          />
        </div>
      </div> -->
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useAuthStore, useOrderStore } from "@/store";
import StatsCards from "@/components/dashboard-page/StatsCards.vue";
import RecentOrders from "@/components/dashboard-page/RecentOrders.vue";
import OrderDetail from "@/components/dashboard-page/OrderDetail.vue";
import TopPerformingWriters from "@/components/dashboard-page/TopPerformingWriters.vue";
import PendingReviews from "@/components/dashboard-page/PendingReviews.vue";
import QuickActions from "@/components/dashboard-page/QuickActions.vue";

/**VARIABLES */
const orderStore = useOrderStore();
const authStore = useAuthStore();

/**FUNCTIONS */
/**Onload function */
onMounted(async () => {
  orderStore.fetchOrders();
});

/**Function to handle update */
const handleUpdate = async ({ orderId, updates, newStatus }) => {
  const payload = updates || { status: newStatus };
  await orderStore.updateOrder(orderId, payload);
};

/**Function to handle delete */
const handleDelete = async (orderId) => {
  if (confirm("Delete permanently?")) {
    await orderStore.deleteOrder(orderId);
  }
};

const handleSuspend = async (orderId) => {
  await orderStore.updateOrder(orderId, { status: "SUSPENDED" });
};
</script>

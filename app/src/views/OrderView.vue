<template>
  <div class="bg-slate-50/50">
    <div class="mx-auto max-w-7xl p-4 md:p-8">
      <div class="flex flex-col gap-6">
        <!-- Header -->
        <OrdersHeader v-model:search="search" />

        <div
          class="bg-white border rounded-xl shadow-sm border-slate-200 oveflow-auto"
        >
          <!-- Filter Tabs -->
          <div class="px-4 border-b border-slate-100">
            <OrdersFilters
              v-model:activeFilter="activeFilter"
              :filters="filters"
            />
          </div>

          <!-- Table -->
          <OrdersTable
            :orders="orderStore.orders"
            :search="search"
            :active-filter="activeFilter"
            :loading="isLoading"
            @select-order="onOrderSelect"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useOrderStore } from "@/store";
import OrdersHeader from "@/components/order-page/OrdersHeader.vue";
import OrdersFilters from "@/components/order-page/OrdersFilters.vue";
import OrdersTable from "@/components/order-page/OrdersTable.vue";

const search = ref("");
const activeFilter = ref("All");
const isLoading = ref(false);

// Note: Ensure your API/Store uses these exact strings
const filters = ["All", "Paid", "Pending"];

const orderStore = useOrderStore();

const onOrderSelect = (id) => {
  orderStore.fetchOrderById(id);
};

onMounted(async () => {
  isLoading.value = true;
  try {
    await orderStore.fetchOrders();
  } catch (error) {
    console.error("Failed to load orders:", error);
  } finally {
    isLoading.value = false;
  }
});
</script>

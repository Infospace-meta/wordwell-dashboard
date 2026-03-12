<template>
  <div>
    <div class="mx-auto max-w-7xl p-6">
      <div class="flex flex-col gap-2">
        <OrdersHeader v-model:search="search" />
        <!-- <OrdersStats :orders="orders" /> -->
        <div class="border rounded-lg border-neutral-200">
          <OrdersFilters
            v-model:activeFilter="activeFilter"
            :filters="filters"
          />

          <OrdersTable
            :orders="orders"
            :search="search"
            :active-filter="activeFilter"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import OrdersHeader from "../components/order-page/OrdersHeader.vue";
import OrdersStats from "../components/order-page/OrdersStats.vue";
import OrdersFilters from "../components/order-page/OrdersFilters.vue";
import OrdersTable from "../components/order-page/OrdersTable.vue";

/**VARIABLES */
const search = ref("");
const activeFilter = ref("All");
const filters = ["All", "Paid", "In Progress", "Completed", "Failed"];
const orders = ref([
  {
    id: "#10234",
    email: "john.doe@example.com",
    deadline: "Apr 25, 2026",
    words: 1500,
    amount: "$120.00",
    status: "In Progress",
    payment: "Paid",
  },
  {
    id: "#10212",
    email: "sarah.smith@example.com",
    deadline: "Apr 24, 2026",
    words: 2000,
    amount: "$180.00",
    status: "Completed",
    payment: "Paid",
  },
  {
    id: "#10245",
    email: "mike.wilson@example.com",
    deadline: "Apr 26, 2026",
    words: 3000,
    amount: "$250.00",
    status: "Failed",
    payment: "Pending",
  },
]);
</script>

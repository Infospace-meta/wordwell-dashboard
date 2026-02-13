<script setup>
import { ref } from "vue";
import OrdersHeader from "./OrdersHeader.vue";
import OrdersStats from "./OrdersStats.vue";
import OrdersFilters from "./OrdersFilters.vue";
import OrdersTable from "./OrdersTable.vue";

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

<template>
  <div
    class="min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-100 p-6 lg:p-10"
  >
    <div class="mx-auto max-w-7xl">
      <div class="flex flex-col gap-8">
        <OrdersHeader v-model:search="search" />
        <OrdersStats :orders="orders" />
        <OrdersFilters v-model:activeFilter="activeFilter" :filters="filters" />
        <OrdersTable
          :orders="orders"
          :search="search"
          :active-filter="activeFilter"
        />
      </div>
    </div>
  </div>
</template>

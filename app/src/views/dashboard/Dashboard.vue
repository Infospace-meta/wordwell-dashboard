<script setup>
import { ref, onMounted } from "vue";
import api from "@/services/api"; // Ensure baseURL: http://localhost:4000

import DashboardHeader from "../../components/dashboard-page/DashboardHeader.vue";
import StatsCards from "../../components/dashboard-page/StatsCards.vue";
import RecentOrders from "../../components/dashboard-page/RecentOrders.vue";
import RevenueChart from "../../components/dashboard-page/RevenueChart.vue";

/* -----------------------
   STATE
----------------------- */
const orders = ref([]);
const stats = ref([]);
const loading = ref(false);
const error = ref(null);

/* -----------------------
   HELPERS
----------------------- */
const formatStatus = (status) => {
  return status
    .toLowerCase()
    .replace("_", " ")
    .replace(/\b\w/g, l => l.toUpperCase());
};

/* -----------------------
   FETCH ORDERS AND CALCULATE STATS
----------------------- */
const fetchOrders = async () => {
  try {
    loading.value = true;

    const res = await api.get("/orders");

    // Replace this if your API wraps orders inside a field
    const backendOrders = Array.isArray(res.data) ? res.data : res.data.orders;

    // Map orders for table display
    orders.value = backendOrders.map(order => ({
      id: `#${order.order_number}`,
      email: order.user?.email ?? "N/A",
      deadline: new Date(order.deadline).toLocaleDateString(),
      words: order.pages * 275, // approximate words per page
      amount: `$${order.total_price}`,
      status: formatStatus(order.status),
      payment: order.status === "PAID" ? "Paid" : "Pending",
    }));

    // Calculate stats dynamically
    const totalOrders = backendOrders.length;
    const paidOrders = backendOrders.filter(o => o.status === "PAID").length;
    const inProgressOrders = backendOrders.filter(o => o.status === "IN_PROGRESS").length;
    const completedOrders = backendOrders.filter(o => o.status === "COMPLETED").length;
    const totalRevenue = backendOrders.reduce(
      (sum, o) => sum + Number(o.total_price || 0),
      0
    );

    stats.value = [
      { title: "Total Orders", value: totalOrders, change: "", icon: "shopping-bag" },
      { title: "Paid Orders", value: paidOrders, change: "", icon: "credit-card" },
      { title: "In Progress", value: inProgressOrders, change: "", icon: "clock" },
      { title: "Completed", value: completedOrders, change: "", icon: "check-circle" },
      { title: "Revenue", value: `$${totalRevenue.toLocaleString()}`, change: "", icon: "trending-up" },
    ];

  } catch (err) {
    console.error(err);
    error.value = "Failed to load dashboard data";
  } finally {
    loading.value = false;
  }
};

onMounted(fetchOrders);
</script>

<template>
  <div class="min-h-screen bg-slate-50">
    <!-- <DashboardHeader /> -->

    <main class="p-6 lg:p-8 max-w-7xl mx-auto">
      <!-- Welcome Section -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-slate-800">
          Welcome back, Admin 👋
        </h1>
        <p class="text-slate-500 mt-1">
          Here's what's happening with your orders today
        </p>
      </div>

      <!-- Stats Grid -->
      <StatsCards :stats="stats || []" />

      <!-- Charts & Tables Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <!-- Recent Orders Table (spans 2 columns) -->
        <div class="lg:col-span-2">
          <RecentOrders :orders="orders || []" />
        </div>

        <!-- Revenue Chart -->
        <div class="lg:col-span-1">
          <RevenueChart />
        </div>
      </div>

      <!-- Additional Stats Row (optional) -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div class="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <div class="flex items-center justify-between mb-4">
            <h3 class="font-semibold text-slate-700">Top Performing Writers</h3>
            <span
              class="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full"
              >This week</span
            >
          </div>
          <div class="space-y-4">
            <!-- Placeholder static writers; can be updated from backend later -->
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div
                  class="w-8 h-8 rounded-full bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-sm font-medium"
                >
                  JD
                </div>
                <div>
                  <p class="font-medium text-slate-700">John Doe</p>
                  <p class="text-xs text-slate-500">12 orders completed</p>
                </div>
              </div>
              <span class="text-emerald-600 font-semibold">$1,240</span>
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div
                  class="w-8 h-8 rounded-full bg-linear-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white text-sm font-medium"
                >
                  SS
                </div>
                <div>
                  <p class="font-medium text-slate-700">Sarah Smith</p>
                  <p class="text-xs text-slate-500">8 orders completed</p>
                </div>
              </div>
              <span class="text-emerald-600 font-semibold">$980</span>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <h3 class="font-semibold text-slate-700 mb-4">Pending Reviews</h3>
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-sm text-slate-600">#10234 - Academic Essay</span>
              <span class="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full">2h left</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-sm text-slate-600">#10212 - Research Paper</span>
              <span class="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full">4h left</span>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <h3 class="font-semibold text-slate-700 mb-4">Quick Actions</h3>
          <div class="grid grid-cols-2 gap-3">
            <button
              class="p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors flex flex-col items-center gap-2"
            >
              <svg
                class="w-5 h-5 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              <span class="text-xs text-slate-600">New Order</span>
            </button>
            <button
              class="p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors flex flex-col items-center gap-2"
            >
              <svg
                class="w-5 h-5 text-emerald-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <span class="text-xs text-slate-600">Add Writer</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

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
      <StatsCards :stats="stats" />

      <!-- Charts & Tables -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <div class="lg:col-span-2">
          <RecentOrders :orders="orders" />
        </div>
        <div class="lg:col-span-1">
          <RevenueChart />
        </div>
      </div>

      <!-- Bottom row - three cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <TopPerformingWriters />
        <PendingReviews />
        <QuickActions 
          @new-order="handleNewOrder"
          @add-writer="handleAddWriter"
        />
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '@/services/api';

import StatsCards from '@/components/dashboard-page/StatsCards.vue';
import RecentOrders from '@/components/dashboard-page/RecentOrders.vue';
import RevenueChart from '@/components/dashboard-page/RevenueChart.vue';
import TopPerformingWriters from '@/components/dashboard-page/TopPerformingWriters.vue';
import PendingReviews from '@/components/dashboard-page/PendingReviews.vue';
import QuickActions from '@/components/dashboard-page/QuickActions.vue';

const orders = ref([]);
const stats = ref([]);
const loading = ref(false);

const fetchOrders = async () => {
  try {
    loading.value = true;
    const res = await api.get("/orders");
    const backendOrders = Array.isArray(res.data) ? res.data : res.data.orders || [];

    // Format for RecentOrders table
    orders.value = backendOrders.map(order => ({
      id: `#${order.order_number}`,
      email: order.user?.email ?? "N/A",
      deadline: new Date(order.deadline).toLocaleDateString(),
      words: order.pages * 275,
      amount: `$${order.total_price}`,
      status: formatStatus(order.status),
      payment: order.status === "PAID" ? "Paid" : "Pending",
    }));

    // Calculate stats
    const totalOrders = backendOrders.length;
    const paidOrders = backendOrders.filter(o => o.status === "PAID").length;
    const inProgress = backendOrders.filter(o => o.status === "IN_PROGRESS").length;
    const completed = backendOrders.filter(o => o.status === "COMPLETED").length;
    const totalRevenue = backendOrders.reduce((sum, o) => sum + Number(o.total_price || 0), 0);

    stats.value = [
      { title: "Total Orders", value: totalOrders, icon: "shopping-bag" },
      { title: "Paid Orders",   value: paidOrders,   icon: "credit-card" },
      { title: "In Progress",   value: inProgress,   icon: "clock" },
      { title: "Completed",     value: completed,    icon: "check-circle" },
      { title: "Revenue",       value: `$${totalRevenue.toLocaleString()}`, icon: "trending-up" },
    ];
  } catch (err) {
    console.error("Dashboard load error:", err);
  } finally {
    loading.value = false;
  }
};

const formatStatus = (status) => {
  return status
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, l => l.toUpperCase());
};

const handleNewOrder = () => {
  console.log("New order clicked");
  // router.push('/orders/new') or modal, etc.
};

const handleAddWriter = () => {
  console.log("Add writer clicked");
  // router.push('/writers/new') or modal
};

onMounted(fetchOrders);
</script>
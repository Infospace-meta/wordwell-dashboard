<script setup>
import { ref } from "vue";
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler
);

/* -----------------------
   MOCK DATA (Replace with API later)
------------------------*/

const stats = ref([
  { title: "Total Orders", value: "1,220" },
  { title: "Paid Orders", value: "845", extra: "+8% this week" },
  { title: "In Progress", value: "32" },
  { title: "Completed", value: "610" },
  { title: "Revenue This Month", value: "$12,540", extra: "+15% this month" },
]);

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
    id: "#10198",
    email: "mike.jones@example.com",
    deadline: "Apr 23, 2026",
    words: 750,
    amount: "$75.00",
    status: "Pending",
    payment: "Paid",
  },
]);

/* -----------------------
   CHART DATA
------------------------*/

const chartData = {
  labels: ["Apr 1", "Apr 8", "Apr 15", "Apr 22", "Apr 30"],
  datasets: [
    {
      data: [200, 850, 1200, 1500, 1000],
      fill: true,
      tension: 0.4,
    },
  ],
};

const chartOptions = {
  responsive: true,
  plugins: {
    legend: { display: false },
  },
};
</script>

<template>
  <div class="min-h-screen bg-gray-100 p-6">
    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-semibold">Dashboard</h1>

      <div class="flex items-center gap-4">
        <input
          type="text"
          placeholder="Search..."
          class="border rounded-lg px-4 py-2"
        />
        <!-- <div class="flex items-center gap-2">
          <img
            src="https://i.pravatar.cc/40"
            class="w-8 h-8 rounded-full"
          />
          <span>Admin</span>
        </div> -->
      </div>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4 mb-6">
      <div
        v-for="stat in stats"
        :key="stat.title"
        class="bg-white p-4 rounded-xl shadow"
      >
        <p class="text-gray-500 text-sm">{{ stat.title }}</p>
        <p class="text-2xl font-bold">{{ stat.value }}</p>
        <p v-if="stat.extra" class="text-green-600 text-sm">
          {{ stat.extra }}
        </p>
      </div>
    </div>

    <!-- Orders Table -->
    <div class="bg-white rounded-xl shadow mb-6">
      <div class="p-4 border-b font-semibold">Orders</div>

      <div class="overflow-x-auto">
        <table class="w-full text-left">
          <thead class="bg-gray-50 text-gray-500 text-sm">
            <tr>
              <th class="p-3">Order ID</th>
              <th>Client Email</th>
              <th>Deadline</th>
              <th>Word Count</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Payment</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="order in orders"
              :key="order.id"
              class="border-t"
            >
              <td class="p-3 font-medium">{{ order.id }}</td>
              <td>{{ order.email }}</td>
              <td>{{ order.deadline }}</td>
              <td>{{ order.words }}</td>
              <td>{{ order.amount }}</td>

              <td>
                <span
                  class="px-3 py-1 rounded-full text-sm"
                  :class="{
                    'bg-green-100 text-green-700':
                      order.status === 'Completed',
                    'bg-yellow-100 text-yellow-700':
                      order.status === 'Pending',
                    'bg-blue-100 text-blue-700':
                      order.status === 'In Progress'
                  }"
                >
                  {{ order.status }}
                </span>
              </td>

              <td>
                <span
                  class="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm"
                >
                  {{ order.payment }}
                </span>
              </td>

              <td>
                <button
                  class="bg-gray-100 px-3 py-1 rounded-lg hover:bg-gray-200"
                >
                  View
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Revenue Chart -->
    <div class="bg-white p-6 rounded-xl shadow">
      <h3 class="font-semibold mb-4">Revenue Trend (Last 30 Days)</h3>
      <Line :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>

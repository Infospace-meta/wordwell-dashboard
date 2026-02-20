<template>
  <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
    <div class="flex items-center justify-between mb-6">
      <div>
        <h3 class="font-semibold text-slate-800">Revenue Trend</h3>
        <p class="text-xs text-slate-500 mt-1">Last 30 days performance</p>
      </div>
      <div class="flex bg-slate-100 rounded-lg p-1">
        <button
          @click="timeRange = 'daily'"
          class="px-3 py-1 text-xs font-medium rounded-md transition-colors"
          :class="
            timeRange === 'daily'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-slate-600 hover:text-slate-800'
          "
        >
          Daily
        </button>
        <button
          @click="timeRange = 'weekly'"
          class="px-3 py-1 text-xs font-medium rounded-md transition-colors"
          :class="
            timeRange === 'weekly'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-slate-600 hover:text-slate-800'
          "
        >
          Weekly
        </button>
        <button
          @click="timeRange = 'monthly'"
          class="px-3 py-1 text-xs font-medium rounded-md transition-colors"
          :class="
            timeRange === 'monthly'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-slate-600 hover:text-slate-800'
          "
        >
          Monthly
        </button>
      </div>
    </div>

    <div class="h-64">
      <Line :data="chartData" :options="chartOptions" />
    </div>

    <div class="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-slate-100">
      <div>
        <p class="text-xs text-slate-500">Total Revenue</p>
        <p class="text-lg font-bold text-slate-800">$13,600</p>
        <p class="text-xs text-emerald-600 mt-1">+24.5%</p>
      </div>
      <div>
        <p class="text-xs text-slate-500">Avg. Order Value</p>
        <p class="text-lg font-bold text-slate-800">$156</p>
        <p class="text-xs text-emerald-600 mt-1">+8.2%</p>
      </div>
      <div>
        <p class="text-xs text-slate-500">Conversion</p>
        <p class="text-lg font-bold text-slate-800">12.3%</p>
        <p class="text-xs text-emerald-600 mt-1">+2.1%</p>
      </div>
    </div>
  </div>
</template>

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
  Filler,
);

// Time range filter
const timeRange = ref("weekly");

const chartData = {
  labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"],
  datasets: [
    {
      data: [1200, 1900, 2800, 3500, 4200],
      fill: true,
      tension: 0.4,
      backgroundColor: (context) => {
        const ctx = context.chart.ctx;
        const gradient = ctx.createLinearGradient(0, 0, 0, 200);
        gradient.addColorStop(0, "rgba(59, 130, 246, 0.2)");
        gradient.addColorStop(1, "rgba(59, 130, 246, 0)");
        return gradient;
      },
      borderColor: "#3B82F6",
      borderWidth: 2,
      pointBackgroundColor: "#3B82F6",
      pointBorderColor: "white",
      pointBorderWidth: 2,
      pointRadius: 4,
      pointHoverRadius: 6,
    },
  ],
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: "#1E293B",
      titleColor: "#F1F5F9",
      bodyColor: "#CBD5E1",
      padding: 12,
      cornerRadius: 8,
      displayColors: false,
      callbacks: {
        label: (context) => `Revenue: $${context.raw.toLocaleString()}`,
      },
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        color: "#E2E8F0",
        drawBorder: false,
      },
      ticks: {
        callback: (value) => `$${value}`,
        color: "#64748B",
      },
    },
    x: {
      grid: {
        display: false,
      },
      ticks: {
        color: "#64748B",
      },
    },
  },
};
</script>

<!-- src/views/Dashboard.vue -->
<template>
  <div class="min-h-screen bg-slate-50">
    <main class="p-6 lg:p-8 max-w-7xl mx-auto">
      <!-- Welcome -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-slate-800">
          Welcome back, Admin 👋
        </h1>
        <p class="text-slate-500 mt-1">
          Here's what's happening with your orders today
        </p>
      </div>

      <!-- Stats -->
      <StatsCards :stats="stats" />

      <!-- Main content: Orders table + Detail panel -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <div class="lg:col-span-2">
          <RecentOrders 
            :orders="orders" 
            @select-order="handleOrderSelect"
          />
        </div>

        <div class="lg:col-span-1">
          <OrderDetail 
            v-if="selectedOrder"
            :order="selectedOrder"
            @close="selectedOrder = null"
          />
          <div 
            v-else 
            class="bg-white rounded-xl shadow-sm p-6 h-full flex items-center justify-center text-center text-gray-500"
          >
            <div>
              <p class="text-lg font-medium mb-2">Select an order to view details</p>
              <p class="text-sm">Click any row in the recent orders table</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom cards -->
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
import { ref, onMounted } from 'vue'
import api from '@/services/api'

import StatsCards        from '@/components/dashboard-page/StatsCards.vue'
import RecentOrders      from '@/components/dashboard-page/RecentOrders.vue'
import OrderDetail       from '@/components/dashboard-page/OrderDetail.vue'
import TopPerformingWriters from '@/components/dashboard-page/TopPerformingWriters.vue'
import PendingReviews    from '@/components/dashboard-page/PendingReviews.vue'
import QuickActions      from '@/components/dashboard-page/QuickActions.vue'

const orders = ref([])
const stats = ref([])
const selectedOrder = ref(null)

const fetchOrders = async () => {
  try {
    const res = await api.get('/orders')
    const data = Array.isArray(res.data) ? res.data : res.data.orders || []

    orders.value = data.map(order => ({
      id: order.id,                           // ← UUID for fetching detail
      displayId: `#${order.order_number}`,
      email: order.user?.email ?? 'N/A',
      words: order.pages * 275,
      amount: `$${Number(order.total_price).toFixed(2)}`,
      payment: order.status === 'PAID' ? 'Paid' : 'Pending'
    }))

    // Stats
    const totalOrders   = data.length
    const paid          = data.filter(o => o.status === 'PAID').length
    const inProgress    = data.filter(o => o.status === 'IN_PROGRESS').length
    const completed     = data.filter(o => o.status === 'COMPLETED').length
    const revenue       = data.reduce((sum, o) => sum + Number(o.total_price || 0), 0)

    stats.value = [
      { title: 'Total Orders',  value: totalOrders,   icon: 'shopping-bag' },
      { title: 'Paid Orders',   value: paid,          icon: 'credit-card' },
      { title: 'In Progress',   value: inProgress,    icon: 'clock' },
      { title: 'Completed',     value: completed,     icon: 'check-circle' },
      { title: 'Revenue',       value: `$${revenue.toLocaleString()}`, icon: 'trending-up' }
    ]
  } catch (err) {
    console.error('Failed to load orders list:', err)
  }
}

const handleOrderSelect = async (uuid) => {
  if (!uuid) return

  try {
    const res = await api.get(`/orders/${uuid}`)
    selectedOrder.value = res.data
  } catch (err) {
    console.error(`Failed to load order ${uuid}:`, err)
    // You can add toast/notification here
  }
}

const handleNewOrder  = () => console.log('Create new order clicked')
const handleAddWriter = () => console.log('Add writer clicked')

onMounted(fetchOrders)
</script>
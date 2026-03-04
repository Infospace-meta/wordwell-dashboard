<template>
  <div class="bg-white rounded-xl border border-gray-200 p-6">
    <p class="text-2xl mb-4">Recent Orders</p>

    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-100">
          <tr>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Order NO
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Email
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Words
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Amount
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Payment
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr
            v-for="order in orders"
            :key="order.id"
            @click="selectOrder(order.id.replace('#', ''))"
            class="hover:bg-gray-50 cursor-pointer transition-colors"
          >
            <td class="px-6 py-4 whitespace-nowrap text-gray-700">
              #{{ order.order_number }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-gray-500">
              {{ order.email }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-gray-500">
              {{ order.words }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-gray-500">
              {{ order.amount }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span
                :class="
                  order.payment === 'Paid' ? 'text-green-600' : 'text-amber-600'
                "
                class="font-medium"
              >
                {{ order.payment }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <p v-if="!orders.length" class="text-center text-gray-500 py-8">
      No recent orders found
    </p>
  </div>
</template>

<script setup>
defineProps({
  orders: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["select-order"]);

const selectOrder = (orderId) => {
  emit("select-order", orderId);
};
</script>

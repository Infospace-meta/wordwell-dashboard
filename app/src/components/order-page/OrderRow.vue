<template>
  <tr class="group hover:bg-neutral-400/5 transition-all duration-300">
    <td class="px-6 py-5">
      <div class="flex flex-col">
        <span class="text-slate-800 transition-colors">
          {{ order.id }}
        </span>
        <span class="text-sm text-slate-500 mt-1 flex items-center gap-1">
          <svg
            class="h-3 w-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          {{ order.email }}
        </span>
      </div>
    </td>

    <td class="px-6 py-5">
      <div class="flex items-center gap-2 text-slate-600">
        <svg
          class="h-4 w-4 text-slate-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        {{ order.deadline }}
      </div>
    </td>

    <td class="px-6 py-5">
      <div class="flex items-center gap-2 text-slate-600">
        <svg
          class="h-4 w-4 text-slate-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
          />
        </svg>
        {{ order.words.toLocaleString() }}
      </div>
    </td>

    <td class="px-6 py-5">
      <span class="text-neutral-800 text-lg font-medium">
        {{ order.amount }}
      </span>
    </td>

    <td class="px-6 py-5">
      <OrderBadge :type="order.status" />
    </td>

    <td class="px-6 py-5">
      <OrderBadge :type="order.payment" />
    </td>

    <td class="px-6 py-5 text-right">
      <div class="flex items-center justify-end gap-2">
        <button
          class="px-4 py-2 text-sm rounded-lg text-neutral-400 border border-neutral-300 hover:cursor-pointer hover:text-blue-800 hover:border-blue-800 transition-all duration-200 flex items-center gap-1"
        >
          View
          <svg
            class="h-3.5 w-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
        </button>

        <button
          v-if="order.status !== 'Completed'"
          class="px-4 py-2 text-sm bg-green-700 hover:bg-green-800 hover:cursor-pointer text-white rounded-md transition-all duration-200 flex items-center gap-1"
        >
          Complete
        </button>
      </div>
    </td>
  </tr>
</template>
<script setup>
import OrderBadge from "./OrderBadge.vue";

defineProps({
  order: {
    type: Object,
    required: true,
  },
});
</script>

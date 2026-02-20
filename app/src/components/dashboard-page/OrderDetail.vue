<!-- src/components/dashboard-page/OrderDetail.vue -->
<template>
  <div class="bg-white rounded-xl shadow-sm border border-gray-200 h-full flex flex-col overflow-hidden">
    <!-- Header - smaller -->
    <div class="px-5 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/70">
      <div>
        <h2 class="text-lg font-semibold text-gray-800">
          Order #{{ order.order_number }}
        </h2>
      </div>
      <button
        @click="$emit('close')"
        class="p-1.5 rounded-full hover:bg-gray-200 transition-colors"
      >
        <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Content - tighter spacing -->
    <div class="flex-1 overflow-y-auto px-5 py-5 space-y-6 text-sm">
      <!-- Client -->
      <div>
        <h3 class="text-xs font-semibold uppercase text-gray-500 mb-2">Client</h3>
        <div class="bg-gray-50 rounded-lg p-3.5 border border-gray-100">
          <p class="font-medium text-gray-900">{{ order.user.full_name }}</p>
          <p class="text-gray-600 mt-0.5">{{ order.user.email }}</p>
          <p class="text-gray-500 mt-1 flex items-center gap-1.5">
            <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            {{ order.user.whatsapp_no }}
          </p>
        </div>
      </div>

      <!-- Grid - more compact -->
      <div class="grid grid-cols-2 gap-x-6 gap-y-4">
        <div>
          <dt class="text-xs text-gray-500">Service</dt>
          <dd class="font-medium capitalize mt-0.5">{{ order.service_type }}</dd>
        </div>
        <div>
          <dt class="text-xs text-gray-500">Level</dt>
          <dd class="font-medium mt-0.5">{{ order.academic_level }}</dd>
        </div>
        <div>
          <dt class="text-xs text-gray-500">Subject</dt>
          <dd class="font-medium mt-0.5">{{ order.subject }}</dd>
        </div>
        <div>
          <dt class="text-xs text-gray-500">Pages</dt>
          <dd class="font-medium mt-0.5">
            {{ order.pages }} page{{ order.pages !== 1 ? 's' : '' }}
            <span class="text-gray-500 text-xs">({{ order.pages * 275 }} words)</span>
          </dd>
        </div>
        <div>
          <dt class="text-xs text-gray-500">Citation</dt>
          <dd class="font-medium uppercase mt-0.5">{{ order.citation_style }}</dd>
        </div>
        <div>
          <dt class="text-xs text-gray-500">Deadline</dt>
          <dd class="font-medium mt-0.5">
            {{ new Date(order.deadline).toLocaleString('en-KE', { dateStyle: 'medium', timeStyle: 'short' }) }}
          </dd>
        </div>
      </div>

      <!-- Price & Status - smaller but still prominent -->
      <div class="bg-emerald-50/60 rounded-lg p-4 border border-emerald-100 flex items-center justify-between gap-4">
        <div>
          <p class="text-xs text-emerald-700">Total</p>
          <p class="text-xl font-bold text-emerald-700">
            ${{ Number(order.total_price).toFixed(2) }}
          </p>
        </div>
        <div class="text-right">
          <span
            :class="getStatusClasses(order.status)"
            class="inline-flex px-3 py-1 rounded-full text-xs font-medium"
          >
            {{ formatStatus(order.status) }}
          </span>
        </div>
      </div>

      <!-- Instructions -->
      <div v-if="order.instructions && order.instructions.trim()">
        <h3 class="text-xs font-semibold uppercase text-gray-500 mb-2">Instructions</h3>
        <div class="bg-gray-50 rounded-lg p-4 border border-gray-100 text-gray-700 whitespace-pre-wrap leading-relaxed text-[0.925rem]">
          {{ order.instructions }}
        </div>
      </div>

      <!-- Files -->
      <div v-if="order.files?.length">
        <h3 class="text-xs font-semibold uppercase text-gray-500 mb-2">
          Files ({{ order.files.length }})
        </h3>
        <div class="space-y-1.5">
          <a
            v-for="file in order.files"
            :key="file.id"
            :href="file.file_url"
            target="_blank"
            class="flex items-center gap-2.5 p-2.5 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition-colors text-sm"
          >
            <svg class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span class="truncate font-medium text-gray-800">{{ file.file_name }}</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  order: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close'])

const formatStatus = (status) => {
  return status
    .toLowerCase()
    .replace(/_/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase())
}

const getStatusClasses = (status) => {
  const classes = {
    'PENDING_PAYMENT': 'bg-amber-100 text-amber-800',
    'PAID':            'bg-green-100 text-green-800',
    'IN_PROGRESS':     'bg-blue-100 text-blue-800',
    'COMPLETED':       'bg-emerald-100 text-emerald-800',
    'CANCELLED':       'bg-red-100 text-red-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}
</script>
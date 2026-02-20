<template>
  <div class="bg-white rounded-xl shadow-sm border border-gray-200 h-full flex flex-col overflow-hidden">
    <!-- Header – smaller & cleaner -->
    <div class="px-4 py-3 border-b border-gray-100 flex items-center justify-between bg-gray-50/80">
      <h2 class="text-base font-semibold text-gray-900">
        Order #{{ order.order_number }}
      </h2>
      <div class="flex items-center gap-4">
        <button
          v-if="!isEditing"
          @click="startEditing"
          class="text-sm font-medium text-indigo-700 hover:text-indigo-900 transition"
        >
          Edit
        </button>

        <button
          @click="$emit('close')"
          class="p-1 rounded-full hover:bg-gray-200 text-gray-600 hover:text-gray-900 transition"
          title="Close"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Content – reduced spacing -->
    <div class="flex-1 overflow-y-auto px-4 py-4 space-y-5 text-sm">
      <!-- Client – more compact -->
      <section>
        <h3 class="text-xs font-semibold uppercase text-gray-500 mb-1.5">Client</h3>
        <div class="bg-gray-50 rounded-lg p-3 border border-gray-100">
          <p class="font-medium text-gray-900 text-[0.93rem]">{{ order.user.full_name }}</p>
          <p class="text-gray-600 mt-0.5 text-[0.93rem]">{{ order.user.email }}</p>
          <p class="mt-1 flex items-center gap-1.5 text-gray-600 text-[0.93rem]">
            <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            {{ order.user.whatsapp_no }}
          </p>
        </div>
      </section>

      <!-- Order Details – tighter grid -->
      <section>
        <h3 class="text-xs font-semibold uppercase text-gray-500 mb-1.5">
          Order Details
          <span v-if="isEditing" class="text-indigo-600 text-xs normal-case font-normal">(editing)</span>
        </h3>

        <div class="grid grid-cols-2 gap-x-5 gap-y-3">
          <div>
            <dt class="text-xs text-gray-500">Service</dt>
            <dd class="mt-0.5">
              <input
                v-if="isEditing"
                v-model="editedOrder.service_type"
                type="text"
                class="w-full px-2.5 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <span v-else class="font-medium capitalize">{{ order.service_type }}</span>
            </dd>
          </div>

          <div>
            <dt class="text-xs text-gray-500">Level</dt>
            <dd class="mt-0.5">
              <select
                v-if="isEditing"
                v-model="editedOrder.academic_level"
                class="w-full px-2.5 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="high school">High School</option>
                <option value="undergraduate">Undergraduate</option>
                <option value="masters">Masters</option>
                <option value="PHD">PhD</option>
              </select>
              <span v-else class="font-medium">{{ order.academic_level }}</span>
            </dd>
          </div>

          <div>
            <dt class="text-xs text-gray-500">Subject</dt>
            <dd class="mt-0.5">
              <input
                v-if="isEditing"
                v-model="editedOrder.subject"
                type="text"
                class="w-full px-2.5 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <span v-else class="font-medium">{{ order.subject }}</span>
            </dd>
          </div>

          <div>
            <dt class="text-xs text-gray-500">Pages</dt>
            <dd class="mt-0.5">
              <input
                v-if="isEditing"
                v-model.number="editedOrder.pages"
                type="number"
                min="1"
                class="w-full px-2.5 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <span v-else class="font-medium">
                {{ order.pages }} page{{ order.pages !== 1 ? 's' : '' }}
                <span class="ml-1 text-gray-500 text-xs">({{ order.pages * 275 }} words)</span>
              </span>
            </dd>
          </div>

          <div>
            <dt class="text-xs text-gray-500">Citation</dt>
            <dd class="mt-0.5">
              <select
                v-if="isEditing"
                v-model="editedOrder.citation_style"
                class="w-full px-2.5 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 uppercase"
              >
                <option value="APA">APA</option>
                <option value="MLA">MLA</option>
                <option value="Harvard">Harvard</option>
                <option value="Chicago">Chicago</option>
              </select>
              <span v-else class="font-medium uppercase">{{ order.citation_style }}</span>
            </dd>
          </div>

          <div>
            <dt class="text-xs text-gray-500">Deadline</dt>
            <dd class="mt-0.5">
              <input
                v-if="isEditing"
                v-model="editedOrder.deadline"
                type="datetime-local"
                class="w-full px-2.5 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <span v-else class="font-medium">
                {{ new Date(order.deadline).toLocaleString('en-KE', { dateStyle: 'medium', timeStyle: 'short' }) }}
              </span>
            </dd>
          </div>
        </div>
      </section>

      <!-- Instructions -->
      <section v-if="order.instructions?.trim() || isEditing">
        <h3 class="text-xs font-semibold uppercase text-gray-500 mb-1.5">Instructions</h3>
        <div v-if="isEditing">
          <textarea
            v-model="editedOrder.instructions"
            rows="5"
            class="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y"
            placeholder="Enter instructions..."
          ></textarea>
        </div>
        <div v-else class="bg-gray-50 rounded-lg p-3 border border-gray-100 text-gray-700 leading-relaxed whitespace-pre-wrap text-[0.93rem]">
          {{ order.instructions }}
        </div>
      </section>

      <!-- Price & Status -->
      <section class="bg-emerald-50/40 rounded-lg p-3 border border-emerald-100/60">
        <div class="flex flex-wrap items-baseline justify-between gap-3 mb-2">
          <div>
            <p class="text-xs text-emerald-700/90">Total</p>
            <p class="text-xl font-bold text-emerald-700">
              ${{ Number(order.total_price).toFixed(2) }}
            </p>
          </div>
          <div class="text-right">
            <span
              :class="getStatusClasses(order.status)"
              class="inline-flex px-2.5 py-1 rounded-full text-xs font-medium shadow-sm"
            >
              {{ formatStatus(order.status) }}
            </span>
          </div>
        </div>

        <div class="flex flex-wrap gap-2">
          <button
            v-if="order.status !== 'PAID'"
            :disabled="updatingStatus"
            @click="updatePayment('PAID')"
            class="px-3 py-1.5 bg-green-600 hover:bg-green-700 disabled:bg-green-400 disabled:cursor-not-allowed text-white text-xs font-medium rounded shadow-sm transition"
          >
            {{ updatingStatus ? '...' : 'Mark Paid' }}
          </button>
          <button
            v-if="order.status === 'PAID' || order.status === 'IN_PROGRESS'"
            :disabled="updatingStatus"
            @click="updatePayment('PENDING_PAYMENT')"
            class="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 disabled:bg-amber-400 disabled:cursor-not-allowed text-white text-xs font-medium rounded shadow-sm transition"
          >
            {{ updatingStatus ? '...' : 'Revert Pending' }}
          </button>
        </div>
      </section>

      <!-- Files -->
      <section v-if="order.files?.length">
        <h3 class="text-xs font-semibold uppercase text-gray-500 mb-1.5">
          Files ({{ order.files.length }})
        </h3>
        <div class="space-y-1">
          <a
            v-for="file in order.files"
            :key="file.id"
            :href="file.file_url"
            target="_blank"
            class="flex items-center gap-2.5 p-2.5 bg-gray-50 hover:bg-gray-100 rounded border border-gray-200 transition text-sm group"
          >
            <svg class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span class="truncate font-medium text-gray-800 group-hover:text-blue-700">
              {{ file.file_name }}
            </span>
          </a>
        </div>
      </section>
    </div>

    <!-- Footer actions – compact -->
    <div class="border-t border-gray-200 px-4 py-3 bg-gray-50 flex flex-wrap gap-3 justify-end">
      <template v-if="isEditing">
        <button
          :disabled="saving"
          @click="cancelEdit"
          class="px-3 py-1.5 bg-gray-300 hover:bg-gray-400 text-gray-800 text-xs font-medium rounded shadow-sm transition"
        >
          Cancel
        </button>
        <button
          :disabled="saving"
          @click="saveChanges"
          class="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-not-allowed text-white text-xs font-medium rounded shadow-sm transition flex items-center gap-1.5"
        >
          <span v-if="saving">Saving...</span>
          <span v-else>Save</span>
        </button>
      </template>

      <template v-else>
        <button
          :disabled="isActionLoading"
          @click="confirmAction('suspend')"
          class="px-3 py-1.5 bg-yellow-600 hover:bg-yellow-700 disabled:bg-yellow-400 disabled:cursor-not-allowed text-white text-xs font-medium rounded shadow-sm transition"
        >
          {{ isActionLoading ? '...' : 'Suspend' }}
        </button>
        <button
          :disabled="isActionLoading"
          @click="confirmAction('delete')"
          class="px-3 py-1.5 bg-red-600 hover:bg-red-700 disabled:bg-red-400 disabled:cursor-not-allowed text-white text-xs font-medium rounded shadow-sm transition"
        >
          {{ isActionLoading ? '...' : 'Delete' }}
        </button>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  order: {
    type: Object,
    required: true
  }
})

const emit = defineEmits([
  'close',
  'update-payment-status',
  'update-order',
  'suspend-order',
  'delete-order'
])

const isEditing = ref(false)
const editedOrder = ref({})
const saving = ref(false)
const updatingStatus = ref(false)
const isActionLoading = ref(false)

// Sync editedOrder when order prop changes
watch(() => props.order, (newOrder) => {
  editedOrder.value = { ...newOrder }
}, { deep: true, immediate: true })

const startEditing = () => {
  isEditing.value = true
  editedOrder.value = { ...props.order }
}

const cancelEdit = () => {
  isEditing.value = false
}

const saveChanges = async () => {
  saving.value = true

  const payload = {
    service_type: editedOrder.value.service_type,
    academic_level: editedOrder.value.academic_level,
    subject: editedOrder.value.subject,
    pages: Number(editedOrder.value.pages),
    citation_style: editedOrder.value.citation_style,
    deadline: editedOrder.value.deadline,
    instructions: editedOrder.value.instructions?.trim() || null
  }

  emit('update-order', {
    orderId: props.order.id,
    updates: payload
  })

  saving.value = false
  isEditing.value = false  // auto-exit edit mode after save (optimistic)
}

// Quick payment status
const updatePayment = async (newStatus) => {
  if (!confirm(`Set status to "${formatStatus(newStatus)}"?`)) return

  updatingStatus.value = true
  emit('update-payment-status', { orderId: props.order.id, newStatus })
  updatingStatus.value = false
}

// Actions
const confirmAction = (type) => {
  let msg = type === 'delete' 
    ? 'Delete permanently? Cannot undo.' 
    : 'Suspend this order?'

  if (!confirm(msg)) return

  isActionLoading.value = true
  emit(type === 'delete' ? 'delete-order' : 'suspend-order', props.order.id)
  isActionLoading.value = false
}

// Helpers
const formatStatus = (status) => status
  .toLowerCase()
  .replace(/_/g, ' ')
  .replace(/\b\w/g, l => l.toUpperCase())

const getStatusClasses = (status) => {
  const map = {
    'PENDING_PAYMENT': 'bg-amber-100 text-amber-800 border border-amber-200',
    'PAID': 'bg-green-100 text-green-800 border border-green-200',
    'IN_PROGRESS': 'bg-blue-100 text-blue-800 border border-blue-200',
    'COMPLETED': 'bg-emerald-100 text-emerald-800 border border-emerald-200',
    'CANCELLED': 'bg-red-100 text-red-800 border border-red-200'
  }
  return map[status] || 'bg-gray-100 text-gray-700 border border-gray-200'
}
</script>
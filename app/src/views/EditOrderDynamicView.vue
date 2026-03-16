<template>
  <div class="p-6 max-w-5xl mx-auto">
    <!-- Loading State -->
    <div
      v-if="loading"
      class="flex flex-col items-center justify-center h-64 text-gray-500"
    >
      <div
        class="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600 mb-4"
      ></div>
      <p>Loading order details...</p>
    </div>

    <!-- Error State -->
    <div
      v-else-if="error"
      class="bg-red-50 p-6 rounded-xl border border-red-200 text-center"
    >
      <p class="text-red-700 font-medium">{{ error }}</p>
      <button
        @click="router.push('/orders')"
        class="mt-4 text-sm text-indigo-600 underline"
      >
        Back to Orders
      </button>
    </div>

    <!-- Main Content -->
    <div
      v-else
      class="bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col overflow-hidden"
    >
      <!-- Header -->
      <div
        class="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-gray-50/80"
      >
        <div>
          <button
            @click="router.push('/orders')"
            class="text-xs text-gray-500 hover:text-indigo-600 flex items-center gap-1 mb-1"
          >
            ← Back to List
          </button>
          <h2 class="text-lg font-bold text-gray-900">
            Order #{{ order.order_number || order.id }}
          </h2>
        </div>

        <div class="flex items-center gap-3">
          <button
            v-if="!isEditing"
            @click="startEditing"
            class="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
          >
            Edit Order
          </button>
        </div>
      </div>

      <!-- Content -->
      <div class="flex-1 overflow-y-auto px-6 py-6 space-y-8 text-sm">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Left Column: Client & Status -->
          <div class="md:col-span-1 space-y-6">
            <section>
              <h3
                class="text-xs font-semibold uppercase text-gray-500 mb-3 tracking-wider"
              >
                Client Details
              </h3>
              <div class="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <p class="font-bold text-gray-900 text-base">
                  {{ order.user?.full_name || "N/A" }}
                </p>
                <p class="text-gray-600 mt-1">{{ order.user?.email }}</p>
                <p class="mt-2 flex items-center gap-2 text-gray-600">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"
                    />
                  </svg>
                  {{ order.user?.whatsapp_no || "No Phone" }}
                </p>
              </div>
            </section>

            <section
              class="bg-emerald-50/50 rounded-xl p-4 border border-emerald-100"
            >
              <div class="flex justify-between items-start mb-4">
                <div>
                  <p
                    class="text-xs text-emerald-700 font-semibold uppercase tracking-wider"
                  >
                    Total Price
                  </p>
                  <p class="text-2xl font-black text-emerald-700">
                    ${{ Number(order.total_price).toFixed(2) }}
                  </p>
                </div>
                <span
                  :class="getStatusClasses(order.status)"
                  class="px-3 py-1 rounded-full text-xs font-bold shadow-sm"
                >
                  {{ formatStatus(order.status) }}
                </span>
              </div>

              <div class="grid grid-cols-1 gap-2">
                <button
                  v-if="order.status !== 'PAID'"
                  @click="updatePayment('PAID')"
                  class="w-full py-2 bg-green-600 text-white rounded-lg font-bold text-xs hover:bg-green-700 transition"
                >
                  Mark as Paid
                </button>
                <button
                  v-if="order.status === 'PAID'"
                  @click="updatePayment('PENDING_PAYMENT')"
                  class="w-full py-2 bg-amber-600 text-white rounded-lg font-bold text-xs hover:bg-amber-700 transition"
                >
                  Revert to Pending
                </button>
              </div>
            </section>
          </div>

          <!-- Right Column: Order Configuration -->
          <div class="md:col-span-2 space-y-8">
            <section>
              <h3
                class="text-xs font-semibold uppercase text-gray-500 mb-4 tracking-wider flex items-center gap-2"
              >
                Order Configuration
                <span
                  v-if="isEditing"
                  class="text-indigo-600 normal-case font-normal"
                  >(Editing Mode)</span
                >
              </h3>

              <div
                class="grid grid-cols-2 gap-6 bg-white border border-gray-100 p-5 rounded-xl shadow-sm"
              >
                <div
                  v-for="field in [
                    'service_type',
                    'subject',
                    'academic_level',
                    'pages',
                    'citation_style',
                    'deadline',
                  ]"
                  :key="field"
                >
                  <dt class="text-xs text-gray-400 font-medium uppercase mb-1">
                    {{ field.replace("_", " ") }}
                  </dt>
                  <dd>
                    <!-- Inputs for Editing -->
                    <template v-if="isEditing">
                      <input
                        v-if="
                          field !== 'academic_level' &&
                          field !== 'citation_style' &&
                          field !== 'deadline'
                        "
                        v-model="editedOrder[field]"
                        class="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 outline-none"
                      />

                      <select
                        v-else-if="field === 'academic_level'"
                        v-model="editedOrder.academic_level"
                        class="w-full p-2 border border-gray-300 rounded"
                      >
                        <option value="undergraduate">Undergraduate</option>
                        <option value="masters">Masters</option>
                        <option value="PHD">PhD</option>
                      </select>

                      <input
                        v-else-if="field === 'deadline'"
                        type="datetime-local"
                        v-model="editedOrder.deadline"
                        class="w-full p-2 border border-gray-300 rounded"
                      />
                    </template>

                    <!-- View Mode -->
                    <span
                      v-else
                      class="text-sm font-semibold text-gray-800 capitalize"
                    >
                      {{
                        field === "deadline"
                          ? new Date(order[field]).toLocaleString()
                          : order[field]
                      }}
                    </span>
                  </dd>
                </div>
              </div>
            </section>

            <section>
              <h3
                class="text-xs font-semibold uppercase text-gray-500 mb-3 tracking-wider"
              >
                Instructions
              </h3>
              <textarea
                v-if="isEditing"
                v-model="editedOrder.instructions"
                rows="4"
                class="w-full p-3 border border-gray-300 rounded-xl"
              ></textarea>
              <div
                v-else
                class="p-4 bg-gray-50 rounded-xl border border-gray-100 text-gray-700 whitespace-pre-wrap"
              >
                {{ order.instructions || "No instructions provided." }}
              </div>
            </section>
          </div>
        </div>
      </div>

      <!-- Footer Actions -->
      <div
        class="border-t border-gray-200 px-6 py-4 bg-gray-50 flex justify-end gap-3"
      >
        <template v-if="isEditing">
          <button
            @click="cancelEdit"
            class="px-5 py-2 text-sm font-medium text-gray-600"
          >
            Cancel
          </button>
          <button
            @click="saveChanges"
            class="px-6 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold shadow-md hover:bg-indigo-700"
          >
            Save Changes
          </button>
        </template>
        <template v-else>
          <button
            @click="handleAction('delete')"
            class="px-5 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg"
          >
            Delete Order
          </button>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
// import { useOrderStore } from "@/stores/orderStore"; // Example Store

const route = useRoute();
const router = useRouter();
// const orderStore = useOrderStore();

/** STATE */
const order = ref(null);
const editedOrder = ref({});
const loading = ref(true);
const error = ref(null);
const isEditing = ref(false);

/** FETCH DATA ON LOAD */
onMounted(async () => {
  try {
    const id = route.params.id;
    // Mocking an API call - Replace this with your actual store/API logic
    // const data = await orderStore.fetchOrderById(id);

    // TEMPORARY MOCK DATA FOR TESTING
    setTimeout(() => {
      order.value = {
        id: id,
        order_number: "8821",
        total_price: 150.0,
        status: "PENDING_PAYMENT",
        service_type: "Essay Writing",
        academic_level: "Masters",
        subject: "History",
        pages: 5,
        citation_style: "APA",
        deadline: "2023-12-31T23:59",
        instructions: "Please follow the guidelines carefully.",
        user: {
          full_name: "John Doe",
          email: "john@example.com",
          whatsapp_no: "+123456789",
        },
      };
      loading.value = false;
    }, 500);
  } catch (err) {
    error.value = "Failed to load order details.";
    loading.value = false;
  }
});

/** METHODS */
const startEditing = () => {
  editedOrder.value = { ...order.value };
  isEditing.value = true;
};

const cancelEdit = () => {
  isEditing.value = false;
};

const saveChanges = async () => {
  // 1. Call your API/Store to update
  // await orderStore.updateOrder(order.value.id, editedOrder.value);

  // 2. Update local state (optimistic)
  order.value = { ...editedOrder.value };
  isEditing.value = false;
  alert("Order updated successfully!");
};

const updatePayment = (newStatus) => {
  order.value.status = newStatus;
  // await orderStore.updateStatus(order.value.id, newStatus);
};

const handleAction = (type) => {
  if (confirm(`Are you sure you want to ${type} this order?`)) {
    // await orderStore.deleteOrder(order.value.id);
    router.push("/orders");
  }
};

const formatStatus = (s) => s?.replace("_", " ");

const getStatusClasses = (status) => {
  const map = {
    PENDING_PAYMENT: "bg-amber-100 text-amber-700",
    PAID: "bg-green-100 text-green-700",
    COMPLETED: "bg-blue-100 text-blue-700",
  };
  return map[status] || "bg-gray-100 text-gray-700";
};
</script>

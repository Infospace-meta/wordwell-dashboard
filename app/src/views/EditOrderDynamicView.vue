<template>
  <div class="p-6 max-w-5xl mx-auto">
    <!-- Loading State (Use store loading) -->
    <div
      v-if="orderStore.loading"
      class="flex flex-col items-center justify-center h-64 text-gray-500"
    >
      <div
        class="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600 mb-4"
      ></div>
      <p>Loading order details...</p>
    </div>

    <!-- Error State -->
    <div
      v-else-if="orderStore.error"
      class="bg-red-50 p-6 rounded-xl border border-red-200 text-center"
    >
      <p class="text-red-700 font-medium">{{ orderStore.error }}</p>
      <button
        @click="router.push('/orders')"
        class="mt-4 text-sm text-indigo-600 underline"
      >
        Back to Orders
      </button>
    </div>

    <!-- Main Content (Show only if selectedOrder exists) -->
    <div
      v-else-if="orderStore.selectedOrder"
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
            Order #{{ orderStore.selectedOrder.order_number }}
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
            <!-- Client Info Section -->
            <section>
              <h3
                class="text-xs font-semibold uppercase text-gray-500 mb-3 tracking-wider"
              >
                Client Details
              </h3>
              <div class="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <p class="font-bold text-gray-900 text-base">
                  {{ orderStore.selectedOrder.user?.full_name || "N/A" }}
                </p>
                <p class="text-gray-600 mt-1">
                  {{ orderStore.selectedOrder.user?.email }}
                </p>
                <p class="mt-2 flex items-center gap-2 text-gray-600">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"
                    />
                  </svg>
                  {{ orderStore.selectedOrder.user?.whatsapp_no || "No Phone" }}
                </p>
              </div>
            </section>

            <!-- Payment Status Section -->
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
                    ${{
                      Number(orderStore.selectedOrder.total_price).toFixed(2)
                    }}
                  </p>
                </div>
                <span
                  :class="
                    getStatusClasses(orderStore.selectedOrder.payment_status)
                  "
                  class="px-3 py-1 rounded-full text-[10px] font-bold shadow-sm uppercase"
                >
                  {{ formatStatus(orderStore.selectedOrder.payment_status) }}
                </span>
              </div>

              <!-- Update Payment Buttons -->
              <!-- <div class="grid grid-cols-1 gap-2">
                <button
                  v-if="orderStore.selectedOrder.payment_status !== 'PAID'"
                  @click="updatePayment('PAID')"
                  class="w-full py-2 bg-green-600 text-white rounded-lg font-bold text-xs hover:bg-green-700 transition"
                >
                  Mark as Paid
                </button>
                <button
                  v-else
                  @click="updatePayment('PENDING_PAYMENT')"
                  class="w-full py-2 bg-amber-600 text-white rounded-lg font-bold text-xs hover:bg-amber-700 transition"
                >
                  Revert to Pending
                </button>
              </div> -->
            </section>

            <!-- Order Progress Status Section -->
            <section
              class="bg-indigo-50/50 rounded-xl p-4 border border-indigo-100"
            >
              <div class="flex justify-between items-start mb-4">
                <div>
                  <p
                    class="text-xs text-indigo-700 font-semibold uppercase tracking-wider"
                  >
                    Work Progress
                  </p>
                  <p class="text-lg font-bold text-indigo-900 mt-1">
                    {{ formatStatus(orderStore.selectedOrder.order_status) }}
                  </p>
                </div>
                <span
                  :class="
                    getOrderStatusClasses(orderStore.selectedOrder.order_status)
                  "
                  class="px-3 py-1 rounded-full text-[10px] font-bold shadow-sm uppercase border"
                >
                  {{ orderStore.selectedOrder.order_status }}
                </span>
              </div>

              <!-- Status Change Selector -->
              <div class="space-y-2">
                <label
                  class="text-[10px] font-bold text-indigo-400 uppercase tracking-tighter"
                  >Update Status</label
                >
                <select
                  :value="orderStore.selectedOrder.order_status"
                  @change="(e) => updateOrderStatus(e.target.value)"
                  class="w-full p-2 bg-white border border-indigo-200 rounded-lg text-xs font-medium focus:ring-2 focus:ring-indigo-500 outline-none cursor-pointer"
                >
                  <option value="PENDING">Pending</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="COMPLETED">Completed</option>
                  <option value="REVISION">Revision</option>
                  <option value="SUSPENDED">Suspended</option>
                </select>
              </div>
            </section>
          </div>

          <!-- Right Column: Configuration -->
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
                    <!-- EDIT MODE -->
                    <template v-if="isEditing">
                      <select
                        v-if="field === 'academic_level'"
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
                      <input
                        v-else
                        v-model="editedOrder[field]"
                        class="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 outline-none"
                      />
                    </template>

                    <!-- VIEW MODE -->
                    <span
                      v-else
                      class="text-sm font-semibold text-gray-800 capitalize"
                    >
                      {{
                        field === "deadline"
                          ? formatDate(orderStore.selectedOrder[field])
                          : orderStore.selectedOrder[field]
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
                {{
                  orderStore.selectedOrder.instructions ||
                  "No instructions provided."
                }}
              </div>
            </section>
          </div>
        </div>
      </div>

      <!-- Footer -->
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
            :disabled="orderStore.loading"
            class="px-6 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold shadow-md hover:bg-indigo-700 disabled:bg-slate-400"
          >
            {{ orderStore.loading ? "Saving..." : "Save Changes" }}
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
import { useOrderStore } from "../store/orders.store";

/**VARIABLES */
const route = useRoute();
const router = useRouter();
const orderStore = useOrderStore();
/** State */
const isEditing = ref(false);
const editedOrder = ref({});

/**FUNCTIONS */
/** Fetch data onMount */
onMounted(async () => {
  const id = route.params.id;
  if (id) {
    await orderStore.fetchOrderById(id);
  }
});

/**Function to trigger edit */
const startEditing = () => {
  /**Capture selected order */
  const selectedOrder = { ...orderStore.selectedOrder };

  /**separate orderdata from other fields to match api dto */
  const { id, order_number, user_id, user, total_price, ...orderData } =
    selectedOrder;

  /**Clone the store object to our local editor */
  editedOrder.value = { ...orderData };
  isEditing.value = true;
};

/**Function to cancel edit */
const cancelEdit = () => {
  isEditing.value = false;
};

/**Function to save changes */
const saveChanges = async () => {
  try {
    await orderStore.updateOrder(
      orderStore.selectedOrder.id,
      editedOrder.value,
    );
    isEditing.value = false;
    alert("Order updated successfully!");
  } catch (err) {
    alert("Update failed.");
  }
};

/**Function to update payment */
const updatePayment = async (newStatus) => {
  try {
    await orderStore.updateOrder(orderStore.selectedOrder.id, {
      payment_status: newStatus,
    });
  } catch (err) {
    alert("Status update failed.");
  }
};

/**Function to handle delete action */
const handleAction = async (type) => {
  if (
    type === "delete" &&
    confirm(`Are you sure you want to delete this order?`)
  ) {
    await orderStore.deleteOrder(orderStore.selectedOrder.id);
    router.push("/orders");
  }
};

/**Function to format date */
const formatDate = (date) => {
  if (!date) return "N/A";
  return new Date(date).toLocaleString("en-KE", {
    dateStyle: "medium",
    timeStyle: "short",
  });
};

/**Function to format status */
const formatStatus = (s) => s?.replace("_", " ") || "Pending";

/**Function to apply styling */
const getStatusClasses = (status) => {
  const map = {
    PAID: "bg-green-100 text-green-700",
    PENDING_PAYMENT: "bg-amber-100 text-amber-700",
  };
  return map[status] || "bg-gray-100 text-gray-700";
};

/**Colors for Order Status (Work Progress) */
const getOrderStatusClasses = (status) => {
  const map = {
    PENDING: "bg-amber-100 text-amber-700 border-amber-200",
    IN_PROGRESS: "bg-blue-100 text-blue-700 border-blue-200",
    COMPLETED: "bg-emerald-100 text-emerald-700 border-emerald-200",
    REVISION: "bg-rose-100 text-rose-700 border-rose-200",
    SUSPENDED: "bg-slate-100 text-slate-700 border-slate-200",
  };
  return map[status] || "bg-gray-100 text-gray-700";
};

/**Function to update orderstatus */
const updateOrderStatus = async (newStatus) => {
  try {
    /**Call store update order */
    await orderStore.updateOrderStatus(orderStore.selectedOrder.id, {
      order_status: newStatus,
    });
    alert(`Order status updated to ${newStatus}`);
  } catch (error) {
    alert("Failed to update work status.");
  }
};
</script>

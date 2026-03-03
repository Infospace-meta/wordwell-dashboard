import { ref } from "vue";
import { defineStore } from "pinia";
import api from "../providers/api/axios";

export const useOrderStore = defineStore("orders", () => {
  /**
   * STATE
   * - `orders`: Holds the list of orders for the current view.
   * - `currentOrder`: Holds a single order, typically for an "edit" view.
   * - `loading`: A boolean to track when any API call is in progress.
   * - `error`: A string to hold the last error message for display.
   */
  const orders = ref([]);
  const currentOrder = ref(null);
  const loading = ref(false);
  const error = ref(null);

  /**ACTIONS */
  /**Fetch orders from API based on filter object
   * [filters={}] - Optional filters (e.g., { status: 'ACTIVE', storeId: '...' })
   */
  async function fetchOrders() {
    loading.value = true;
    error.value = null;

    try {
      const { data } = await api.get(`/orders`);

      orders.value = data;
      return data;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Failed to fetch orders.";
      error.value = errorMessage;
      console.error("Error fetching orders:", err);
      throw new Error(errorMessage);
    } finally {
      loading.value = false;
    }
  }

  /**Fetch a single order by ID */
  async function fetchOrderById(orderId) {
    loading.value = true;
    error.value = null;
    currentOrder.value = null; // Reset previous state

    try {
      const { data } = await api.get(`/orders/${orderId}`);
      currentOrder.value = data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Order not found.";
      error.value = errorMessage;
      console.error("Error fetching order:", err);
      throw new Error(errorMessage);
    } finally {
      loading.value = false;
    }
  }

  /**Update an existing order and local state */
  async function updateOrder(orderId, patchData) {
    loading.value = true;
    error.value = null;

    try {
      const { data } = await api.patch(`/orders/${orderId}`, patchData);
      /**Find and update the order in our local list for instant reactivity */
      const index = orders.value.findIndex((o) => o.id === orderId);
      if (index !== -1) {
        orders.value[index] = { ...orders.value[index], ...data };
      }
      return data;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Failed to update order.";
      error.value = errorMessage;
      console.error("Error updating order:", err);
      throw new Error(errorMessage);
    } finally {
      loading.value = false;
    }
  }

  /**Delete an order and remove it from local state */
  async function deleteOrder(orderId) {
    loading.value = true;
    error.value = null;

    try {
      await api.delete(`/orders/${orderId}`);
      /**Remove the order from our local list for instant reactivity */
      orders.value = orders.value.filter((o) => o.id !== orderId);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Failed to delete order.";
      error.value = errorMessage;
      console.error("Error deleting order:", err);
      throw new Error(errorMessage);
    } finally {
      loading.value = false;
    }
  }

  /**RETURN SECTION */
  return {
    orders,
    currentOrder,
    loading,
    error,
    fetchOrders,
    fetchOrderById,
    updateOrder,
    deleteOrder,
  };
});

import { ref, computed } from "vue";
import { defineStore } from "pinia";
import api from "@/providers/api/axios";

export const useOrderStore = defineStore("orders", () => {
  /**
   * STATE
   * - `orders`: Holds the list of orders for the current view.
   * - `selectedOrder`: Holds a single order, typically for an "edit" view.
   * - `loading`: A boolean to track when any API call is in progress.
   * - `error`: A string to hold the last error message for display.
   */
  const orders = ref([]);
  const selectedOrder = ref(null);
  const loading = ref(false);
  const error = ref(null);

  /**
   * GETTERS (Computed)
   * These calculate stats automatically whenever the 'orders' array changes
   */
  const stats = computed(() => {
    const data = orders.value;
    const totalOrders = data.length;
    const paid = data.filter((o) => o.payment_status === "PAID").length;
    const inProgress = data.filter(
      (o) => o.order_status === "IN_PROGRESS",
    ).length;
    const completed = data.filter((o) => o.order_status === "COMPLETED").length;
    const revenue = data.reduce(
      (sum, o) => sum + Number(o.total_price || 0),
      0,
    );

    return [
      { title: "Total Orders", value: totalOrders, icon: "shopping-bag" },
      { title: "Paid Orders", value: paid, icon: "credit-card" },
      { title: "In Progress", value: inProgress, icon: "clock" },
      { title: "Completed", value: completed, icon: "check-circle" },
      {
        title: "Revenue",
        value: `$${revenue.toLocaleString()}`,
        icon: "trending-up",
      },
    ];
  });

  /**ACTIONS */
  /**Fetch orders from API based on filter object
   * [filters={}] - Optional filters (e.g., { status: 'ACTIVE', storeId: '...' })
   */
  async function fetchOrders() {
    loading.value = true;
    error.value = null;

    try {
      const { data } = await api.get(`/orders`);
      console.log(data);
      /**Map data for the RecentOrders table requirements */
      orders.value = data.map((order) => ({
        ...order,
        displayId: `#${order.order_number}`,
        email: order.user?.email ?? "N/A",
        words: order.pages * 275,
        amount: `$${Number(order.total_price || 0).toFixed(2)}`,
        payment: order.payment_status === "PAID" ? "Paid" : "Pending",
      }));
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
    selectedOrder.value = null; // Reset previous state

    try {
      const { data } = await api.get(`/orders/${orderId}`);
      selectedOrder.value = data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Order not found.";
      error.value = errorMessage;
      console.error("Error fetching order:", err);
      throw new Error(errorMessage);
    } finally {
      loading.value = false;
    }
  }

  /**Update Order status */
  async function updateOrderStatus(orderId, newStatus) {
    return await updateOrder(orderId, { payment_status: newStatus });
  }

  /**Update an existing order and local state */
  async function updateOrder(orderId, patchData) {
    loading.value = true;
    error.value = null;

    try {
      const { data } = await api.patch(`/orders/${orderId}`, patchData);

      /**Find and update the order in our local list for instant reactivity */
      // Inside your Pinia updateOrder action:
      const index = orders.value.findIndex((o) => o.id === orderId);
      if (index !== -1) {
        orders.value[index] = {
          ...orders.value[index],
          ...data,
          // Add these mappings so the table doesn't "break" after an update
          displayId: `#${data.order_number || orders.value[index].order_number}`,
          payment: data.payment_status === "PAID" ? "Paid" : "Pending",
        };
      }

      /**Update current selected view */
      if (selectedOrder.value?.id === orderId) {
        selectedOrder.value = { ...selectedOrder.value, ...data };
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
    selectedOrder,
    loading,
    error,
    stats,
    fetchOrders,
    fetchOrderById,
    updateOrder,
    updateOrderStatus,
    deleteOrder,
  };
});

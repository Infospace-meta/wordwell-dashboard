import { createRouter, createWebHistory } from "vue-router";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import LoginView from "../views/LoginView.vue";
import AuthConfirm from "../components/auth/AuthConfirm.vue";
import { useAuthStore } from "../store";
import DashboardView from "../views/DashboardView.vue";
import OrderView from "../views/OrderView.vue";
import EditOrderDynamicView from "../views/EditOrderDynamicView.vue";

const routes = [
  {
    path: "/",
    component: DefaultLayout,
    meta: { requiresAuth: true }, //add auth guard
    redirect: "/dashboard",
    children: [
      { path: "dashboard", name: "dashboard", component: DashboardView },
      { path: "orders", name: "orders", component: OrderView },
      {
        path: "order/:id",
        name: "order-edit",
        component: EditOrderDynamicView,
        props: true // This allows the :id to be passed as a prop to the component
      }
    ],
  },
  { path: "/login", name: "login", component: LoginView },
  { path: "/auth-confirm", name: "auth-confirm", component: AuthConfirm },
];

const router = createRouter({ history: createWebHistory(), routes });

router.beforeEach(async (to) => {
  const auth = useAuthStore();

  /**If the user is just landing, try to restore session first
   * This "picks up" the session from the Magic Link URL hash
   */
  if (!auth.user) {
    try {
      await auth.fetchUser();
    } catch (err) {
      console.error("Failed to restore session:", err);
    }
  }

  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  // 2. If route requires auth and we still don't have a user
  if (requiresAuth && !auth.isLoggedIn && auth.profile?.role !== "ADMIN") {
    console.warn("Non-admin tried to access admin dashboard");
    await auth.logout();
    return {
      path: "/login",
      query: { returnUrl: to.fullPath },
    };
  }

  /**If user is logged in and tries to go to login page */
  if (
    (to.name === "login" || to.name === "signup") &&
    auth.isLoggedIn &&
    auth.profile?.role === "ADMIN"
  ) {
    return { path: "/" };
  }
});

export default router;

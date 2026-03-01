import { h, resolveComponent } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import LoginView from "../views/auth/LoginView.vue";

const routes = [
  {
    path: "/",
    component: DefaultLayout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard", // Relative path
        name: "Dashboard",
        component: () => import("@/views/DashboardView.vue"),
      },
      {
        path: "orders",
        name: "Orders",
        component: () => import("@/views/OrderView.vue"),
      },
    ],
  },
  {
    path: "/pages",
    name: "Pages",
    component: { render: () => h(resolveComponent("router-view")) },
    children: [
      {
        path: "404",
        name: "Page404",
        component: () => import("@/views/pages/Page404.vue"),
      },
      {
        path: "login",
        name: "Login",
        component: () => import("@/views/pages/Login.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/auth-confirm",
    name: "auth-confirm",
    component: AuthConfirm,
  },
  // Catch-all route for 404
  {
    path: "/:pathMatch(.*)*",
    redirect: "/pages/404",
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    // always scroll to top
    return { top: 0 };
  },
});

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
  if (requiresAuth && !auth.user) {
    return {
      path: "/login",
      query: { returnUrl: to.fullPath },
    };
  }

  /**If user is logged in and tries to go to login page */
  if (to.name === "login" && auth.user) {
  }
});

export default router;



// import { createRouter, createWebHistory } from "vue-router";
// import { OrderView, DashboardView } from "../views";
// import ConfirmOrder from "../components/ConfirmOrder.vue";
// import { useAuthStore } from "../store";

// const routes = [
//   { path: "/", redirect: { name: "order" } },
//   { path: "/order", name: "order", component: OrderView },
//   { path: "/dashboard", name: "dashboard", component: DashboardView },
//   { path: "/confirm-order", name: "confirm-order", component: ConfirmOrder },
// ];

// /**Initialize here */
// const router = createRouter({ history: createWebHistory(), routes });

// // router.beforeEach(async (to, from) => {
// //   // redirect to login page if not logged in and trying to access a restricted page
// //   const publicPages = ["/", "/login"];
// //   const authRequired = !publicPages.includes(to.path);
// //   const auth = useAuthStore();

// //   /**add function to check if user is logged in */
// //   if (authRequired && !auth.user) {
// //     auth.returnUrl = to.fullPath;
// //     auth.isLoginModalOpen = true;
// //     return from.fullPath;
// //     // return "/login";
// //   }
// // });

// export default router;

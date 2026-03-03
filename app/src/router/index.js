import { h, resolveComponent } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import LoginView from "../views/LoginView.vue";
import AuthConfirm from "../components/auth/AuthConfirm.vue";
import { useAuthStore } from "../store";
import DashboardView from "../views/DashboardView.vue";
import OrderView from "../views/OrderView.vue";

const routes = [
  {
    path: "/",
    component: DefaultLayout,
    redirect: "/dashboard",
    children: [
      { path: "dashboard", name: "dashboard", component: DashboardView },
      { path: "orders", name: "orders", component: OrderView },
    ],
  },
  { path: "/login", name: "login", component: LoginView },
  { path: "/auth-confirm", name: "auth-confirm", component: AuthConfirm },
];

// const routes = [
//     {
//     path: "/pages",
//     name: "Pages",
//     component: { render: () => h(resolveComponent("router-view")) },
//     children: [
//       {
//         path: "404",
//         name: "Page404",
//         component: () => import("@/views/pages/Page404.vue"),
//       },
//       {
//         path: "login",
//         name: "Login",
//         component: () => import("@/views/pages/Login.vue"),
//       },
//     ],
//   },

//   // Catch-all route for 404
//   {
//     path: "/:pathMatch(.*)*",
//     redirect: "/pages/404",
//   },
// ];

const router = createRouter({ history: createWebHistory(), routes });

router.beforeEach(async (to, from, next) => {
  const auth = useAuthStore();

  /** If the store hasn't checked for a session yet, do it now. */
  if (!auth.initialized) {
    await auth.fetchUser();
  }

  /** redirect to login page if not logged in and trying to access a restricted page */
  const publicPages = ["/login", "/auth-confirm"];
  const authRequired = !publicPages.includes(to.path);

  /**add function to check if user is logged in */
  if (authRequired && !auth.isLoggedIn && auth.profile?.role !== "ADMIN") {
    console.warn("Non-admin tried to access admin dashboard");
    await auth.logout();
    return next({ name: "login" });
  }

  /**Already logged in and trying to go to login page */
  if (
    to.path === "/login" &&
    auth.isLoggedIn &&
    auth.profile?.role === "ADMIN"
  ) {
    return next({ name: "dashboard" });
  }

  next(); // Proceed as normal
});

export default router;

import { h, resolveComponent } from "vue";
import { createRouter, createWebHistory } from "vue-router";

import DefaultLayout from "@/layouts/DefaultLayout.vue";

const routes = [
  {
    path: "/",
    component: DefaultLayout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard", // Relative path
        name: "Dashboard",
        component: () => import("@/views/dashboard/Dashboard.vue"),
      },
      {
        path: "orders",
        name: "Orders",
        component: () => import("@/views/orders/Order.vue"),
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

export default router;

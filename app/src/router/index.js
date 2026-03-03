import { h, resolveComponent } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import LoginView from "../views/LoginView.vue";
import AuthConfirm from "../components/auth/AuthConfirm.vue";
import { useAuthStore } from "../store";
import DashboardView from "../views/DashboardView.vue";
import OrderView from "../views/OrderView.vue";

const routes = [
  { path: "/", redirect: { name: "dashboard" } },
  { path: "/dashboard", name: "dashboard", component: DashboardView },
  { path: "/orders", name: "orders", component: OrderView },
  { path: "/login", name: "login", component: LoginView },
  { path: "/auth-confirm", name: "auth-confirm", component: AuthConfirm },
];

// const routes = [
//   {
//     path: "/",
//     component: DefaultLayout,
//     redirect: "/dashboard",
//     children: [
//       {
//         path: "dashboard", // Relative path
//         name: "Dashboard",
//         component: () => import("@/views/DashboardView.vue"),
//       },
//       {
//         path: "orders",
//         name: "Orders",
//         component: () => import("@/views/OrderView.vue"),
//       },
//       {
//         path: "/login",
//         name: "login",
//         component: LoginView,
//       },
//       {
//         path: "/auth-confirm",
//         name: "auth-confirm",
//         component: AuthConfirm,
//       },
//     ],
//   },
//   {
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
// const router = createRouter({
//   history: createWebHistory(import.meta.env.BASE_URL),
//   routes,
//   scrollBehavior() {
//     // always scroll to top
//     return { top: 0 };
//   },
// });

// router.beforeEach(async (to, from) => {
//   // redirect to login page if not logged in and trying to access a restricted page
//   const publicPages = ["/login"];
//   const authRequired = !publicPages.includes(to.path);
//   const auth = useAuthStore();

//   /**add function to check if user is logged in */
//   if (authRequired && !auth.user) {
//     auth.returnUrl = to.fullPath;
//     auth.isLoginModalOpen = true;
//     return from.fullPath;
//     // return "/login";
//   }
// });

export default router;

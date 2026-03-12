<template>
  <!-- Mobile Overlay: Only visible when sidebar.visible is true on small screens -->
  <div
    v-if="sidebar.visible"
    @click="sidebar.toggleVisible(false)"
    class="fixed inset-0 z-40 bg-black/50 lg:hidden"
  ></div>

  <aside
    :class="[
      'fixed inset-y-0 left-0 z-50 flex flex-col bg-white text-neutral-700 transition-all duration-300 ease-in-out border-r border-black/10',

      /* FIX: Toggle translation based on visibility state for ALL screens */
      sidebar.visible ? 'translate-x-0' : '-translate-x-full',

      /* Width Logic */
      sidebar.unfoldable ? 'w-14' : 'w-64',
    ]"
  >
    <!-- Logo Section -->
    <div class="flex items-center justify-center h-16 py-15 overflow-hidden">
      <img
        src="../assets/brand/InkWell-Writers-Logo.png"
        alt="Logo"
        :class="[
          sidebar.unfoldable ? 'hidden' : 'h-16',
          'transition-all duration-300',
        ]"
      />
    </div>

    <!-- Nav Links -->
    <nav
      :class="
        sidebar.unfoldable
          ? 'flex-1 overflow-y-auto py-4 px-1.5 space-y-1'
          : 'flex-1 overflow-y-auto py-4 px-3 space-y-1'
      "
    >
      <RouterLink
        active-class="bg-black/5"
        to="/dashboard"
        :class="
          sidebar.unfoldable
            ? 'flex justify-center items-center p-2 rounded-lg'
            : 'flex p-4 rounded-lg hover:bg-neutral-200 text-lg items-center'
        "
      >
        <span class="material-symbols-sharp"> analytics </span>
        <p
          class="font-semibold"
          :class="
            sidebar.unfoldable
              ? 'opacity-0 w-0 overflow-hidden'
              : 'ml-3 opacity-100'
          "
        >
          Dashboard
        </p>
      </RouterLink>
      <RouterLink
        active-class="bg-black/5"
        to="/orders"
        :class="
          sidebar.unfoldable
            ? 'flex justify-center items-center p-2 rounded-lg'
            : 'flex p-4 rounded-lg hover:bg-neutral-200 text-lg items-center'
        "
      >
        <span class="material-symbols-sharp"> rubric </span>
        <p
          class="font-semibold"
          :class="
            sidebar.unfoldable
              ? 'opacity-0 w-0 overflow-hidden'
              : 'ml-3 opacity-100'
          "
        >
          Orders
        </p>
      </RouterLink>
    </nav>

    <!-- Unfoldable Toggler (Desktop Only) -->
    <div class="p-0.5 border-t border-black/10 hidden lg:block">
      <button
        @click="sidebar.toggleUnfoldable()"
        class="w-full flex justify-end p-2 rounded-md transition-colors"
      >
        <span class="material-symbols-outlined text-black/40">
          right_panel_close
        </span>
      </button>
    </div>
  </aside>
</template>

<script setup>
import { RouterLink } from "vue-router";
import { useSidebarStore } from "@/store/sidebar.js";
const sidebar = useSidebarStore();
</script>

<style>
.material-symbols-sharp {
  font-variation-settings: "FILL" 0, "wght" 400, "GRAD" 0, "opsz" 40;
}
</style>

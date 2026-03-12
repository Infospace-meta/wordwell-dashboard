<template>
  <div class="min-h-screen">
    <AppSidebar />

    <div
      :class="[
        'flex flex-col min-h-screen transition-all duration-300 ease-in-out',
        /* FIX: Only add margin if the sidebar is actually visible */
        !sidebar.visible
          ? 'ml-0'
          : sidebar.unfoldable
          ? 'lg:ml-14'
          : 'lg:ml-64',
      ]"
    >
      <AppHeader />
      <main class="grow p-4 md:p-8">
        <router-view />
      </main>
      <AppFooter />
    </div>
  </div>
</template>

<script setup>
import AppSidebar from "@/components/AppSidebar.vue";
import AppHeader from "@/components/AppHeader.vue";
import { useSidebarStore } from "@/store/sidebar.js";
import AppFooter from "../components/AppFooter.vue";

const sidebar = useSidebarStore();
</script>

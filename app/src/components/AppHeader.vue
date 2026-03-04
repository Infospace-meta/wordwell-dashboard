<template>
  <header
    class="sticky top-0 z-30 flex h-16 w-full items-center justify-between px-4 text-neutral-700 shadow-sm border-b border-white/10"
  >
    <!-- Left: Menu Toggle -->
    <button
      @click="sidebar.toggleVisible()"
      class="flex p-2 rounded-md active:bg-neutral-100 transition-colors"
    >
      <span class="material-symbols-outlined block">menu</span>
    </button>

    <!-- Right: Account Dropdown -->
    <div class="flex items-center">
      <AppHeaderDropdownAccnt />
    </div>
  </header>
</template>

<script setup>
import AppHeaderDropdownAccnt from "@/components/AppHeaderDropdownAccnt.vue";
import { useSidebarStore } from "@/store/sidebar.js";
const sidebar = useSidebarStore();
</script>

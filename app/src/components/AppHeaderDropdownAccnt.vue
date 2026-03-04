<template>
  <div class="relative">
    <!-- Dropdown Toggle (Avatar) -->
    <button
      @click="isOpen = !isOpen"
      type="button"
      class="flex items-center rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-neutral-800"
      id="user-menu-button"
    >
      <span class="sr-only">Open user menu</span>
      <img
        class="h-10 w-10 rounded-full border-2 border-neutral-700 object-cover"
        :src="avatar"
        alt="User Avatar"
      />
    </button>

    <!-- Dropdown Menu -->
    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div
        v-if="isOpen"
        class="absolute right-0 z-50 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      >
        <!-- Logout Item -->
        <button
          @click="handleLogout"
          class="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
        >
          <!-- Material Symbol Icon (consistent with your header) -->
          <span class="material-symbols-outlined mr-2 text-lg">logout</span>
          Logout
        </button>
      </div>
    </transition>

    <!-- Invisible Backdrop to close dropdown when clicking outside -->
    <div 
      v-if="isOpen" 
      @click="isOpen = false" 
      class="fixed inset-0 z-40 h-full w-full cursor-default"
    ></div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import avatar from "@/assets/images/avatars/8.jpg";
import { useAuthStore } from "../store";

const isOpen = ref(false);
const auth = useAuthStore();
const router = useRouter();

/**Handle logout and redirect */
const handleLogout = async () => {
  isOpen.value = false; // Close menu
  await auth.logout();
  router.push("/login");
};
</script>

<style scoped>
/* Ensure Material Symbols align nicely with text */
.material-symbols-outlined {
  vertical-align: middle;
}
</style>
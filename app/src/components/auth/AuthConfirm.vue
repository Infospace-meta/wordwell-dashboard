<template>
  <div
    class="min-h-screen bg-slate-50 flex flex-col items-center justify-center"
  >
    <!-- Visual Spinner -->
    <div class="relative w-20 h-20 mb-6">
      <div
        class="absolute inset-0 border-4 border-indigo-100 rounded-full"
      ></div>
      <div
        class="absolute inset-0 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"
      ></div>
    </div>

    <h2 class="text-xl font-bold text-slate-800">Verifying Credentials</h2>
    <p class="text-slate-500 mt-2">Securing your administrative session...</p>

    <!-- Error State (Hidden by default) -->
    <div
      v-if="error"
      class="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl text-center max-w-sm"
    >
      <p class="text-red-600 text-sm font-medium">{{ error }}</p>
      <button
        @click="goBack"
        class="mt-4 text-indigo-600 font-bold text-sm hover:underline"
      >
        Back to Login
      </button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { supabase } from "../../providers/supabase";
import { useAuthStore } from "../../store";

/**VARIABLES */
const router = useRouter();
const authStore = useAuthStore();
const error = ref(null);

/**FUNCTIONS */
const goBack = () => router.push("/login");

onMounted(async () => {
  try {
    /**1. Get the session Supabase just established from the URL */
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError || !session) {
      throw new Error("Session could not be established or link expired.");
    }

    /**2. CHECK ROLE: This is the security gate */
    const role = session.user.app_metadata?.role;
    console.log(role);

    if (role === "ADMIN") {
      /**SUCCESS: Sync the store (sets x-token for Axios) */
      await authStore.fetchUser();
      router.push("/");
    } else {
      /**FAILURE: Not an Admin */
      await supabase.auth.signOut();
      localStorage.removeItem("x-token");
      throw new Error(
        "Access Denied: You do not have administrator privileges.",
      );
    }
  } catch (err) {
    console.error("Auth Confirmation Error:", err.message);
    error.value = err.message;

    /** Optional: Auto-redirect non-admins to the main site after 3 seconds */
    if (err.message.includes("Access Denied")) {
      setTimeout(() => {
        window.location.href = "https://google.com";
      }, 3000);
    }
  }
});
</script>

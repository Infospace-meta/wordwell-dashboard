<template>
  <div class="min-h-screen bg-slate-50 flex items-center justify-center p-6">
    <div
      class="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-200 p-10"
    >
      <!-- Logo / Title -->
      <div class="text-center mb-10">
        <div
          class="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-xl mb-4 shadow-lg"
        >
          <svg
            class="w-8 h-8 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>
        <h1 class="text-2xl font-bold text-slate-800">WordWell Admin</h1>
        <p class="text-slate-500 mt-2">Sign in to manage academic orders</p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
          <label class="block text-sm font-semibold text-slate-700 mb-2"
            >Admin Email</label
          >
          <input
            v-model="email"
            type="email"
            required
            placeholder="admin@wordwellwriters.com"
            class="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
            :disabled="loading"
          />
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl shadow-lg transition duration-200 disabled:bg-slate-400 flex items-center justify-center"
        >
          <svg
            v-if="loading"
            class="animate-spin h-5 w-5 mr-3 text-white"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          {{ loading ? "Sending Magic Link..." : "Send Access Link" }}
        </button>
      </form>

      <div class="mt-8 text-center">
        <a
          href="https://wordwellwriters.com"
          class="text-sm text-slate-400 hover:text-indigo-600 transition"
        >
          &larr; Back to main site
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { supabase } from "../../providers/supabase";

/**VARIABLES */
const email = ref("");
const loading = ref(false);

/**FUNCTIONS */
const handleLogin = async () => {
  try {
    loading.value = true;
    const { error } = await supabase.auth.signInWithOtp({
      email: email.value,
      options: {
        // Pointing to THIS repo's confirm route
        emailRedirectTo: window.location.origin + "/auth/confirm",
      },
    });

    if (error) throw error;
    alert("Access link sent! Please check your admin inbox.");
  } catch (err) {
    alert(err.message || "Failed to send login link");
  } finally {
    loading.value = false;
  }
};
</script>

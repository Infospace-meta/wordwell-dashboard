<template>
  <div
    class="min-h-screen bg-white flex flex-col justify-center items-center p-4 font-sans"
  >
    <!-- Main Card -->
    <div class="w-full max-w-md">
      <!-- STATE 1: LOGIN FORM -->
      <div
        v-if="!isEmailSent"
        class="border border-black/5 rounded-2xl p-8 "
      >
        <!-- Logo -->
        <div class="mb-10 flex justify-center items-center">
          <img
            src="../../assets/brand/InkWell-Writers-Logo.png"
            alt="wordwell Logo"
            class="w-54 h-auto"
          />
        </div>
        <!-- <h1 class="text-2xl text-gray-700 text-center my-3">Wordwell Admin</h1> -->
        <p class="text-gray-600 text-center mb-8">
          Sign in to admin dashboard
        </p>

        <div class="space-y-5">
          <div>
            <label
              class="block text-xs font-medium text-gray-500 mb-2 tracking-wider"
              >Email Address</label
            >
            <div class="relative">
              <input
                v-model="email"
                type="email"
                placeholder="name@email.com"
                @keyup.enter="handleLogin"
                class="w-full border border-black/10 rounded-xl px-4 py-3 text-gray-700 outline-none focus:ring-1 focus:ring-orange-300/40 transition-all"
              />
              <!-- Loader icon while checking as they type -->
              <div
                v-if="authStore.checkingEmail"
                class="absolute right-4 top-3.5"
              >
                <span class="loader-orange-small"></span>
              </div>
            </div>

            <p
              v-if="authStore.error"
              class="text-red-400 text-xs mt-2 ml-1 flex items-center gap-1"
            >
              <span class="material-symbols-outlined text-xs">Error :</span>
              {{ authStore.error }}
            </p>
          </div>

          <!-- ONLY SHOW BUTTON IF USER EXISTS -->
          <Transition name="fade">
            <button
              v-if="authStore.userExists && !authStore.error"
              @click="handleLogin"
              :disabled="authStore.loading"
              class="w-full bg-orange-500 text-white py-3 rounded-xl font-bold hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-transform active:scale-[0.98]"
            >
              <span v-if="authStore.loading" class="loader-white"></span>
              {{ authStore.loading ? "Sending..." : "Send Magic Link" }}
            </button>
          </Transition>
        </div>
      </div>

      <!-- STATE 2: EMAIL SENT SUCCESS -->
      <div
        v-else
        class="border border-black/5 rounded-2xl p-10 text-center shadow-sm"
      >
        <div class="flex justify-center mb-3">
          <div class="bg-orange-500/10 p-4 flex rounded-full">
            <span class="material-symbols-outlined text-orange-600 text-4xl"
              >mail</span
            >
          </div>
        </div>

        <h2 class="text-gray-800 text-lg font-medium mb-1">Check your inbox</h2>
        <p class="text-orange-600 font-bold text-lg mb-8">{{ email }}</p>

        <div class="space-y-6 text-sm">
          <p class="text-gray-600 leading-relaxed">
            We sent a password-free link to your inbox. Check your spam folder
            if it doesn't appear in 2 minutes.
          </p>

          <div class="pt-4 border-t border-gray-100">
            <p class="text-gray-500">
              Made a mistake?
              <button
                @click="isEmailSent = false"
                class="text-orange-600 hover:underline ml-1 cursor-pointer font-medium"
              >
                Try a different email
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <p class="pt-10 text-gray-400 text-xs tracking-widest">
      &copy; Wordwell Writers 2026 - All Rights Reserved
    </p>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useAuthStore } from "../../store";

/**VARIABLES */
const email = ref("");
const isEmailSent = ref(false);
const authStore = useAuthStore();

let debounceTimeout = null;

/**FUNCTIONS */
/**Watch the email input */
watch(email, (newValue) => {
  /**Clear the previous */
  clearTimeout(debounceTimeout);

  /**Reset states if email is empty */
  if (!newValue) {
    authStore.userExists = false;
    authStore.error = null;
    return;
  }

  /**Wait 600ms after the user stops typing to call the API */
  debounceTimeout = setTimeout(() => {
    authStore.checkUser(newValue);
  }, 600);
});

/**Function to login */
const handleLogin = async () => {
  const result = await authStore.loginWithMagicLink(email.value);
  if (result.success) isEmailSent.value = true;
};
</script>

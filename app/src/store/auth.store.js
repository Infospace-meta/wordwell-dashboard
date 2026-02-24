import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { supabase } from "../helpers/supabase";

export const useAuthStore = defineStore("auth", () => {
  /**VARIABLES */
  const user = ref(null);
  // const user = ref(useLocalStorage("user", null));
  const profile = ref(null);

  /**ACTIONS */
  /**Helper function to sync token */
  const syncToken = (session) => {
    /**Set access token to local storage */
    session
      ? localStorage.setItem("x-token", session.access_token)
      : localStorage.removeItem("x-token");
  };

  /**Function to fetch user */
  async function fetchUser() {
    /**Get session from supabase */
    const {
      data: { session },
    } = await supabase.auth.getSession();

    /**Set user */
    user.value = session?.user || null;

    /**sync token */
    syncToken(session);

    if (user.value) {
      /**Fetch the extra details from public.Profile table */
      const { data } = await supabase
        .from("Profile")
        .select("*")
        .eq("id", user.value.id)
        .maybeSingle();

      profile.value = data;
    }
  }

  /**Function to refresh session */
  async function refreshSession() {
    /**refresh session */
    const {
      data: { session },
      error,
    } = await supabase.auth.refreshSession();

    /**handle error */
    if (error) {
      console.error("Session refresh failed:", error.message);
      return { error };
    }

    /**Update local state */
    user.value = session?.user || null;
    syncToken(session); // Vital for Axios Interceptor!

    /**Update profile (in case role/metadata changed) */
    if (user.value) {
      const { data } = await supabase
        .from("Profile")
        .select("*")
        .eq("id", user.value.id)
        .maybeSingle();
      profile.value = data;
    }

    return { user: user.value, error: null };
  }

  /**Function to logout */
  async function logout() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error logging out:", error.message);
      return { error };
    }

    /**Reset local state */
    user.value = null;
    profile.value = null;
    return { error: null };
  }

  return {
    user,
    profile,
    fetchUser,
    refreshSession,
    logout,
    isLoggedIn: computed(() => !!user.value),
  };
});

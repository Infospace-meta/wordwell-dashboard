import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { supabase } from "../providers/supabase";
import api from "../providers/api/axios";

export const useAuthStore = defineStore("auth", () => {
  /**VARIABLES */
  const user = ref(null);
  // const user = ref(useLocalStorage("user", null));
  const profile = ref(null);
  const loading = ref(false);
  const apiLoading = ref(false);
  const error = ref(null);
  const apiError = ref(null);
  const userExists = ref(false);
  const checkingEmail = ref(false);

  /**ACTIONS */
  /**Helper function to consolidate local storage and state updates */
  const _updateAuthState = (session) => {
    const currentUser = session?.user || null;
    user.value = currentUser;

    /**Sync Token */
    if (session?.access_token) {
      localStorage.setItem("x-token", session.access_token);
    } else {
      localStorage.removeItem("x-token");
    }

    return currentUser;
  };

  /**Helper function to consolidates the API call logic */
  const _fetchProfileData = async (userId) => {
    if (!userId) return;

    apiLoading.value = true;
    apiError.value = null;

    try {
      /**Fetch the extra details from public.Profile table */
      const { data } = await supabase
        .from("Profile")
        .select("*")
        .eq("id", user.value.id)
        .maybeSingle();

        console.log(data);
      profile.value = data;      
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Failed to fetch user profile.";
      apiError.value = errorMessage;
      console.error("Error fetching profile:", err);
      throw new Error(errorMessage);
    } finally {
      apiLoading.value = false;
    }
  };

  /**Function to fetch user */
  async function fetchUser() {
    /**Get session from supabase */
    const {
      data: { session },
    } = await supabase.auth.getSession();

    /**Set user */
    const currentUser = _updateAuthState(session);

    /**Fetch user from API if session exists */
    if (currentUser) await _fetchProfileData(currentUser.id);
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

    /**Set user */
    const currentUser = _updateAuthState(session);

    /**Fetch user from API if session exists */
    if (currentUser) await _fetchProfileData(currentUser.id);

    return { user: currentUser, error: null };
  }

  /**Check if user exists in local db */
  async function checkUser(email) {
    if (!email || !email.includes("@")) return; // Basic validation

    checkingEmail.value = true;
    error.value = null;

    try {
      await api.get(`/users/check/${email.toLowerCase()}`);
      userExists.value = true;
      error.value = null;
    } catch (err) {
      userExists.value = false;
      if (err.response?.status === 404) {
        error.value = "User not registered. Please contact your administrator.";
      } else {
        error.value = "Unable to verify email.";
      }
    } finally {
      checkingEmail.value = false;
    }
  }

  /**Login with magic link */
  async function loginWithMagicLink(email) {
    loading.value = true;
    try {
      const { error: authError } = await supabase.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: window.location.origin + "/auth-confirm" },
      });
      if (authError) throw authError;
      return { success: true };
    } catch (err) {
      error.value = err.message;
      return { success: false };
    } finally {
      loading.value = false;
    }
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
    apiError,
    apiLoading,
    error,
    userExists,
    loading,
    fetchUser,
    refreshSession,
    checkUser,
    loginWithMagicLink,
    logout,
    isLoggedIn: computed(() => !!user.value),
  };
});


import router from "../router";
import { ref } from "vue";
import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";
import { post, get } from "../api/main";

export const useAuthStore = defineStore("auth", () => {
    const user = ref(useLocalStorage("user", null));
    const access_token = ref(useLocalStorage("x-token", null));
    const returnUrl = ref(null);
    const error = ref(null);
    // const isLoginModalOpen = ref(false);

    /**Method to Log in */
    async function login(credentials) {
        const response = await post("login", credentials)
            .then((response) => {
                console.log(response);
                user.value = response.data.user
                    ? JSON.stringify(response.data.user)
                    : null;

                /**capture the access token*/
                access_token.value = response.data ? response.data.token : null;

                // /**Close Login Modal */
                // isLoginModalOpen.value = false;
            })
            .catch((err) => {
                console.log(err);
                console.log(err.response);
                error.value = err.response ? err.response.data.message : err.message;
            });

        // redirect to previous url or default to home page
        router.push(returnUrl.value || "/");
    }

    /**Method to test API */
    async function test() {
        await get("shops")
            .then((response) => {
                console.log(response);
                // //Logout if forbidden
                // if(response.data.responseStatus === 403){
                //   logout();
                // }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    /**Method to sign out */
    async function logout() {
        user.value = null;
        access_token.value = null;

        /**Logout from api */
        await post("logout")
            .then((response) => { })
            .catch((err) => {
                console.log(err);
            });

        /**Open login modal */
        // isLoginModalOpen.value = true;
    }

    // return { user, returnUrl, isLoginModalOpen, error, test, login, logout };
    return { user, returnUrl, error, test, login, logout };
});
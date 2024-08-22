import { ref } from "vue";
import { findString } from "./../storage/common/splits";

const LOGPATH: boolean = false;

export default defineNuxtRouteMiddleware((to) => {
  if (process.client) {
    const pages = ref<string[]>(["/profilePanel/"]);

    const localStorageUserData = ref<string>("userData");

    if (findString(to.path, pages.value[0])) {
      const tokenFromLocalStorage = JSON.parse(
        localStorage.getItem(localStorageUserData.value) as string
      );

      if (!tokenFromLocalStorage) {
        if (LOGPATH) {
          console.log(
            `User tried to access ${to.path} without being logged in. Redirecting to home page.`
          );
        }

        return navigateTo("/");
      }
    }
  }
});

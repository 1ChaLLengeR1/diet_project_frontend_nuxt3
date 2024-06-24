import { ref } from "vue";
import { findString } from "./../storage/common/splits";

export default defineNuxtRouteMiddleware((to) => {
  if (process.client) {
    const pages = ref<string[]>(["/profilePanel/"]);

    const localStorageUserData = ref<string>("userData");

    const tokenFromLocalStorage = JSON.parse(
      localStorage.getItem(localStorageUserData.value) as string
    );

    if (findString(to.path, pages.value[0]) && !tokenFromLocalStorage) {
      return navigateTo("/");
    }
  }
});

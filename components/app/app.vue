<template>
  <main class="relative w-full flex-col">
    <LoadingSpinner
      v-if="spinnerStore.app.active"
      :info="spinnerStore.app.info"
    />
    <Alert />
    <MenuHeader v-if="!mobile" />
    <MobileSiderbar v-if="menuMobileStore.openMenu" />
    <div class="w-full min-h-[900px] flex">
      <MenuSidebar v-if="mobile" />
      <main class="sticky w-full">
        <NuxtPage />
      </main>
    </div>
    <FooterMain />
  </main>
</template>

<script lang="ts">
import { defineComponent, onMounted, onBeforeUnmount, ref } from "vue";
import _ from "lodash";

// stores
import { AuthStore } from "../../storage/auth/auth";
import { DictionaryStore } from "../../storage/dictionary/dictionary";
import { SpinnerStore } from "../../storage/spinners/spinners";
import { MenuMobileStore } from "../../storage/siderbarMenu/menuMobile";
import { ProjectStore } from "../../storage/project/project";
import { UsersStore } from "../../storage/user/user";

// components
import MenuSidebar from "../Menu/Siderbar/Sidebar.vue";
import MenuHeader from "../Menu/Header/Header.vue";
import LoadingSpinner from "../Spinners/spinner.vue";
import MobileSiderbar from "../Menu/MobileSiderbar/MobileSiderbar.vue";
import FooterMain from "../Footer/FooterMain.vue";
import Alert from "../Alert/Alert.vue";

export default defineComponent({
  components: {
    MenuSidebar,
    MenuHeader,
    LoadingSpinner,
    MobileSiderbar,
    FooterMain,
    Alert,
  },
  setup() {
    const authStore = AuthStore();
    const dictionaryStore = DictionaryStore();
    const spinnerStore = SpinnerStore();
    const menuMobileStore = MenuMobileStore();
    const projectStore = ProjectStore();
    const usersStore = UsersStore();

    const mobile = ref<boolean>(false);

    onMounted(async () => {
      spinnerStore.app.active = true;

      spinnerStore.app.info = "loadingSpinner.stores.userData";
      await authStore.populateDataUser();

      if (authStore.getUserDataForApi().sub !== "") {
        spinnerStore.app.info = "loadingSpinner.stores.dictionary";
        await authStore.authorizationUser();
      }

      spinnerStore.app.info = "loadingSpinner.stores.dictionary";
      await dictionaryStore.apiFetch();

      spinnerStore.app.info = "loadingSpinner.stores.users";
      await usersStore.apiFetch();

      if (authStore.getUserDataForApi().sub !== "") {
        spinnerStore.app.info = "loadingSpinner.stores.projects";
        await projectStore.apiFetch();
      }

      spinnerStore.app.info = "";
      spinnerStore.app.active = false;
    });

    const checkScreenWidth = _.throttle(() => {
      mobile.value = window.innerWidth >= 768 ? true : false;
    }, 200);

    const closeMobileMenu = _.throttle(() => {
      if (window.innerWidth >= 768) {
        menuMobileStore.openMenu = false;
      }
    }, 200);

    onMounted(() => {
      window.addEventListener("resize", checkScreenWidth);
      checkScreenWidth();

      window.addEventListener("resize", closeMobileMenu);
      closeMobileMenu();
    });

    onBeforeUnmount(() => {
      window.removeEventListener("resize", checkScreenWidth);
    });

    return { mobile, spinnerStore, menuMobileStore };
  },
});
</script>

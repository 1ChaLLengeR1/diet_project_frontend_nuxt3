<template>
  <main class="relative w-full flex-col">
    <LoadingSpinner
      v-if="spinnerStore.app.active"
      :info="spinnerStore.app.info"
    />
    <MenuHeader v-if="!mobile" />
    <MobileSiderbar v-if="menuMobileStore.openMenu" />
    <div class="w-full flex">
      <MenuSidebar v-if="mobile" />
      <main class="w-full">
        <NuxtPage />
      </main>
    </div>
    <FooterMain />
  </main>
</template>

<script lang="ts">
import { defineComponent, onMounted, onBeforeUnmount, ref } from "vue";
import { throttle } from "lodash";

// stores
import { AuthStore } from "./../../storage/auth/auth";
import { DictionaryStore } from "./../../storage/dictionary/dictionary";
import { SpinnerStore } from "./../../storage/spinners/spinners";
import { MenuMobileStore } from "./../../storage/siderbarMenu/menuMobile";

// components
import MenuSidebar from "./../Menu/Siderbar/Sidebar.vue";
import MenuHeader from "./../Menu/Header/Header.vue";
import LoadingSpinner from "./../Spinners/spinner.vue";
import MobileSiderbar from "./../Menu/MobileSiderbar/MobileSiderbar.vue";
import FooterMain from "../Footer/FooterMain.vue";

export default defineComponent({
  components: {
    MenuSidebar,
    MenuHeader,
    LoadingSpinner,
    MobileSiderbar,
    FooterMain,
  },
  setup() {
    const mobile = ref<boolean>(false);
    const authStore = AuthStore();
    const dictionaryStore = DictionaryStore();
    const spinnerStore = SpinnerStore();
    const menuMobileStore = MenuMobileStore();
    const spinnerInfo = ref<string>("");

    onMounted(async () => {
      spinnerStore.app.active = true;
      spinnerStore.app.info = "loadingSpinner.stores.userData";
      await authStore.populateDataUser();

      spinnerStore.app.active = true;
      spinnerStore.app.info = "loadingSpinner.stores.dictionary";
      await dictionaryStore.apiFetch();

      spinnerStore.app.active = false;
      spinnerStore.app.info = "";
    });

    const checkScreenWidth = throttle(() => {
      mobile.value = window.innerWidth >= 768 ? true : false;
    }, 200);

    const closeMobileMenu = throttle(() => {
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

    return { mobile, spinnerStore, spinnerInfo, menuMobileStore };
  },
});
</script>

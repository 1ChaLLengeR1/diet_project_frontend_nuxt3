<template>
  <main class="relative w-full flex-col">
    <LoadingSpinner v-if="spinnerStore.app" :info="spinnerInfo" />
    <MenuHeader v-if="!mobile" />
    <div class="w-full flex">
      <MenuSidebar v-if="mobile" />
      <main class="w-full">
        <NuxtPage />
      </main>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent, onMounted, onBeforeUnmount, ref } from "vue";
import { throttle } from "lodash";

// stores
import { AuthStore } from "./../../storage/auth/auth";
import { DictionaryStore } from "./../../storage/dictionary/dictionary";
import { SpinnerStore } from "./../../storage/spinners/spinners";

// components
import MenuSidebar from "./../Menu/Siderbar/Sidebar.vue";
import MenuHeader from "./../Menu/Header/Header.vue";
import LoadingSpinner from "./../Spinners/spinner.vue";

export default defineComponent({
  components: {
    MenuSidebar,
    MenuHeader,
    LoadingSpinner,
  },
  setup() {
    const mobile = ref<boolean>(false);
    const authStore = AuthStore();
    const dictionaryStore = DictionaryStore();
    const spinnerStore = SpinnerStore();
    const spinnerInfo = ref<string>("");

    onMounted(async () => {
      spinnerStore.app = true;

      spinnerInfo.value = "loadingSpinner.stores.userData";
      await authStore.populateDataUser();

      spinnerInfo.value = "loadingSpinner.stores.dictionary";
      await dictionaryStore.apiFetch();

      spinnerStore.app = false;
    });

    const checkScreenWidth = throttle(() => {
      mobile.value = window.innerWidth >= 768 ? true : false;
    }, 200);

    onMounted(() => {
      window.addEventListener("resize", checkScreenWidth);
      checkScreenWidth();
    });

    onBeforeUnmount(() => {
      window.removeEventListener("resize", checkScreenWidth);
    });

    return { mobile, spinnerStore, spinnerInfo };
  },
});
</script>

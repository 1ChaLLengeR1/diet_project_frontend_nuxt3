<template>
  <main class="w-full flex-col">
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

// components
import MenuSidebar from "./../Menu/Siderbar/Sidebar.vue";
import MenuHeader from "./../Menu/Header/Header.vue";

export default defineComponent({
  components: {
    MenuSidebar,
    MenuHeader,
  },
  setup() {
    const mobile = ref<boolean>(false);
    const authStore = AuthStore();
    const dictionaryStore = DictionaryStore();

    onMounted(async () => {
      await authStore.populateDataUser();
      await dictionaryStore.apiFetch();
    });

    const checkScreenWidth = throttle(() => {
      mobile.value = window.innerWidth >= 768 ? true : false;
    }, 200);

    onMounted(async () => {
      window.addEventListener("resize", checkScreenWidth);
      checkScreenWidth();
    });

    onBeforeUnmount(() => {
      window.removeEventListener("resize", checkScreenWidth);
    });

    return { mobile };
  },
});
</script>

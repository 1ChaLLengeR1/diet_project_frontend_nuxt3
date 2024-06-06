<template>
  <main class="w-full flex">
    <MenuSidebar />
    <main class="w-full">
      <NuxtPage />
    </main>
  </main>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import MenuSidebar from "./../Sidebars/MainMenu/Sidebar.vue";
import { AuthStore } from "./../../storage/auth/auth";

export default defineComponent({
  components: {
    MenuSidebar,
  },
  setup() {
    const authStore = AuthStore();

    onMounted(async () => {
      await authStore.populateDataUser();
    });

    return {};
  },
});
</script>

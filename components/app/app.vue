<template>
  <main class="w-full flex">
    <MenuSidebar />
    <main class="w-full">
      <NuxtPage />
    </main>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MenuSidebar from "./../Sidebars/MainMenu/Sidebar.vue";

export default defineComponent({
  components: {
    MenuSidebar,
  },
  setup() {
    return {};
  },
});
</script>

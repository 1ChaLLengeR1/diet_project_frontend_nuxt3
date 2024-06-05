<template>
  <v-app>
    <MenuSidebar />
    <!-- <main class="w-full flex justify-center">
        <NuxtPage />
      </main> -->
  </v-app>
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

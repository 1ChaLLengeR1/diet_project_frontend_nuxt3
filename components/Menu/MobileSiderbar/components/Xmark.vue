<template>
  <div class="w-full flex justify-end p-3">
    <v-icon
      icon="mdi-close-circle"
      size="x-large"
      class="cursor-pointer"
      @click="closeMenu"
    ></v-icon>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// stores
import { MenuMobileStore } from "./../../../../storage/siderbarMenu/menuMobile";

export default defineComponent({
  setup() {
    const menuMobileStore = MenuMobileStore();
    const closeMenu = () => {
      menuMobileStore.openMenu = false;
    };

    return { closeMenu };
  },
});
</script>

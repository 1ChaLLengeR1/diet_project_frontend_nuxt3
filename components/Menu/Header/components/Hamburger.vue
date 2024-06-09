<template>
  <div class="w-fit" @click="openMenu">
    <v-icon icon="mdi-menu" size="large" class="cursor-pointer"></v-icon>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// stores
import { MenuMobileStore } from "./../../../../storage/siderbarMenu/menuMobile";

export default defineComponent({
  setup() {
    const menuMobileStore = MenuMobileStore();
    const openMenu = () => {
      menuMobileStore.openMenu = true;
    };
    return { openMenu };
  },
});
</script>

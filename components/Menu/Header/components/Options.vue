<template>
  <div class="w-fit flex items-center gap-0 sm:gap-3">
    <Language />
    <HamburgerVue />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

//components
import Language from "./../../../Language/Language.vue";
import HamburgerVue from "./Hamburger.vue";

export default defineComponent({
  components: {
    Language,
    HamburgerVue,
  },
  setup() {
    return {};
  },
});
</script>

<style scoped></style>

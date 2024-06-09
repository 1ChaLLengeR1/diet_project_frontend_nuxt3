<template>
  <div class="fixed top-0 h-screen w-full z-20 backdrop-blur-sm bg-black/30">
    <div
      class="absolute top-0 right-0 z-20 w-[320px] sm:w-[380px] h-full flex flex-col gap-3 bg-white"
    >
      <Xmark />
      <MenuNav position="right" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

//components
import Xmark from "./components/Xmark.vue";
import MenuNav from "./../Siderbar/components/MenuNav.vue";

export default defineComponent({
  components: {
    Xmark,
    MenuNav,
  },
  setup() {
    return {};
  },
});
</script>

<style scoped></style>

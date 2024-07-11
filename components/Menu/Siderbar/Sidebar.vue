<template>
  <div class="relative min-w-[340px] max-w-[380px] h-screen">
    <div
      class="fixed top-0 left-0 min-w-[340px] h-full flex flex-col gap-3 border-r-2 border-black"
    >
      <Language />
      <SiderbarTitle />
      <MenuNav position="left" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Language from "./../../Language/Language.vue";
import SiderbarTitle from "./components/Title.vue";
import MenuNav from "./components/MenuNav.vue";

export default defineComponent({
  components: {
    Language,
    SiderbarTitle,
    MenuNav,
  },
  setup() {
    return {};
  },
});
</script>

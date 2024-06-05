<template>
  <div
    class="min-w-[340px] max-w-[380px] h-screen flex flex-col gap-3 border-r"
  >
    <Language />
    <SiderbarTitle />
    <MenuNav />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Language from "./components/Language.vue";
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

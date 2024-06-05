<template>
  <div
    class="min-w-[240px] max-w-[360px] h-screen flex flex-col gap-3 border-r"
  >
    <Language />
    <SiderbarTitle />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Language from "./components/Language.vue";
import SiderbarTitle from "./components/Title.vue";

export default defineComponent({
  components: {
    Language,
    SiderbarTitle,
  },
  setup() {
    return {};
  },
});
</script>

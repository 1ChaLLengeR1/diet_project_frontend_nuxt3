<template>
  <header
    class="sticky top-0 left-0 z-20 w-full p-[10px] flex justify-between border-b border-red-400 bg-white"
  >
    <HeaderTitle />
    <Options />
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";

//components
import HeaderTitle from "./components/Title.vue";
import Options from "./components/Options.vue";

export default defineComponent({
  components: {
    HeaderTitle,
    Options,
  },
  setup() {
    return {};
  },
});
</script>

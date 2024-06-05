<template>
  <div class="min-w-[240px] max-w-[360px] h-screen flex flex-col border-r">
    <Language />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Language from "./components/Language.vue";

export default defineComponent({
  components: {
    Language,
  },
  setup() {
    return {};
  },
});
</script>

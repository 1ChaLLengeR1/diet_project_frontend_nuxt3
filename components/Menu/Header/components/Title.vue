<template>
  <div class="w-full flex gap-3 items-center p-1">
    <img :src="logo" alt="logo" class="w-10" />
    <h1 class="text-sm font-titleSidebar">{{ $t("sidebar.projectTitle") }}</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import logo from "./../../../../public/images/training.webp";

export default defineComponent({
  setup() {
    return { logo };
  },
});
</script>

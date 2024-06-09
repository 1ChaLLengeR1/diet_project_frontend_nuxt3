<template>
  <div class="w-fit flex flex-col gap-3 items-center justify-center p-1 ml-3">
    <img :src="logo" alt="logo" class="w-52" />
    <h1 class="text-4xl font-titleSidebar">{{ $t("sidebar.projectTitle") }}</h1>
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

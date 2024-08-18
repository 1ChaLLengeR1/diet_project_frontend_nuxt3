<template>
  <div class="w-full flex flex-col gap-3 items-center justify-center p-1">
    <img :src="logo" alt="logo" class="w-52" />
    <h1 class="w-52 text-2xl font-titleSidebar">
      {{ $t("sidebar.projectTitle") }}
    </h1>
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

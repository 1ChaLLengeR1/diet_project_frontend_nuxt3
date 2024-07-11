<template>
  <p class="border-b-2 border-main p-1">
    <slot></slot>
  </p>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return {};
  },
});
</script>

<style scoped></style>

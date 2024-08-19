<template>
  <div class="w-full flex-col items-center gap-3">
    <p class="w-full flex justify-center">
      {{ $t("loadingSpinner.informationGlobal") }}
    </p>
    <v-progress-linear indeterminate></v-progress-linear>
  </div>
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

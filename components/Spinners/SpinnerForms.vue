<template>
  <div class="w-full flex-col items-center gap-3">
    <p>{{ $t("loadingSpinner.informationForm") }}</p>
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

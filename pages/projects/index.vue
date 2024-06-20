<template>
  <div class="w-full h-screen p-3">
    <SelectUsers />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// stores

// types

// components
import SelectUsers from "./../../components/Selects/SelectUsers.vue";

export default defineComponent({
  components: {
    SelectUsers,
  },
  setup() {
    return {};
  },
});
</script>

<style scoped></style>

<template>
  <div class="w-full h-100%">
    <HomePage />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// components
import HomePage from "./../components/HomePage/HomePage.vue";

export default defineComponent({
  components: {
    HomePage,
  },
  setup() {
    return {};
  },
});
</script>

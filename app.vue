<template>
  <ClientOnly>
    <App />
  </ClientOnly>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import App from "./components/app/app.vue";

export default defineComponent({
  components: {
    App,
  },
  setup() {
    return {};
  },
});
</script>

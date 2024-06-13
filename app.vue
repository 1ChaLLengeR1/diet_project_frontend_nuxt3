<template>
  <ClientOnly>
    <App />
  </ClientOnly>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import App from "./components/App/App.vue";

export default defineComponent({
  components: {
    App,
  },
  setup() {
    return {};
  },
});
</script>

<style>
:root {
  --button-create: #04aa6d;
  --bg-main: #ff7200;
}
</style>

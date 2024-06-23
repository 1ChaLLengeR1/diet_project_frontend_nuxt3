<template>
  <div>logout</div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";

// stores
import { AuthStore } from "./../storage/auth/auth";

export default defineComponent({
  setup() {
    const authStore = AuthStore();

    onMounted(async () => {
      await authStore.removeParamsAuth0();
    });

    return {};
  },
});
</script>

<template>
  <div
    role="alert"
    id="alertError"
    class="flex items-start md:items-center max-w-[600px] shadow-md bg-red-100 pr-2 pl-4 ring-1 ring-red-300 typography-text-sm md:typography-text-base py-1 rounded-md"
  >
    <p class="py-2 mr-2">{{ message }}</p>
    <button
      type="button"
      class="p-1.5 md:p-2 ml-2 rounded-md text-red-700 hover:bg-red-200 active:bg-red-300 hover:text-red-800 active:text-red-900 focus-visible:outline focus-visible:outline-offset"
      aria-label="Close error alert"
    >
      <v-icon
        icon="mdi-close-circle"
        size="x-large"
        color="red"
        class="cursor-pointer"
        @click="close(id)"
      ></v-icon>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// stores
import { AlertStore } from "./../../../storage/alert/alert";

export default defineComponent({
  props: {
    id: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  setup() {
    const storeAlert = AlertStore();

    const close = (id: string) => {
      storeAlert.closeAlert(id);
    };

    return { close };
  },
});
</script>

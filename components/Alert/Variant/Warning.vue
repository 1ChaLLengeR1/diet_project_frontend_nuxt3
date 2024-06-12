<template>
  <div
    role="alert"
    id="alertWarning"
    class="flex items-start bg-yellow-100 max-w-[600px] shadow-md pr-2 pl-4 ring-1 ring-yellow-200 typography-text-sm md:typography-text-base py-1 rounded-md"
  >
    <v-icon
      icon="mdi-alert"
      size="x-large"
      class="mt-2 mr-2 text-yellow-600 shrink-0"
    ></v-icon>
    <p class="py-2 mr-2">{{ message }}</p>
    <button
      type="button"
      class="p-1.5 md:p-2 ml-2 rounded-md text-red-700 hover:bg-red-200 active:bg-red-300 hover:text-red-800 active:text-red-900 focus-visible:outline focus-visible:outline-offset"
    >
      <v-icon
        icon="mdi-close-circle"
        size="x-large"
        color="yellow"
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

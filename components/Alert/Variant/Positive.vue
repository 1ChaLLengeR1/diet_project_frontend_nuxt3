<template>
  <div
    role="alert"
    id="alertPositive"
    class="flex items-start md:items-center max-w-[600px] shadow-md bg-green-100 pr-2 pl-4 ring-1 ring-green-200 typography-text-sm md:typography-text-base py-1 rounded-md"
  >
    <v-icon
      icon="mdi-check-circle"
      size="x-large"
      class="my-2 mr-2 text-green-700 shrink-0"
    ></v-icon>
    <p class="py-2 mr-2">{{ message }}</p>
    <button
      type="button"
      id="closeAlertPositive"
      class="p-1.5 md:p-2 ml-auto rounded-md text-green-700 hover:bg-green-200 active:bg-green-300 hover:text-green-800 active:text-green-900 focus-visible:outline focus-visible:outline-offset text-pos"
    >
      <v-icon
        icon="mdi-close-circle"
        size="x-large"
        color="green"
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

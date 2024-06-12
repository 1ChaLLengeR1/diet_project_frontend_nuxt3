<template>
  <div
    role="alert"
    id="alertError"
    class="flex items-start md:items-center max-w-[600px] shadow-md bg-negative-100 pr-2 pl-4 ring-1 ring-negative-300 typography-text-sm md:typography-text-base py-1 rounded-md"
  >
    <p class="py-2 mr-2">{{ message }}</p>
    <button
      type="button"
      class="p-1.5 md:p-2 ml-2 rounded-md text-negative-700 hover:bg-negative-200 active:bg-negative-300 hover:text-negative-800 active:text-negative-900 focus-visible:outline focus-visible:outline-offset"
      aria-label="Close error alert"
    >
      <SfIconClose class="hidden md:block" @click="close(id)" />
      <SfIconClose size="sm" class="block md:hidden" />
    </button>
  </div>
</template>
<script lang="ts" setup>
import { SfIconClose } from '@storefront-ui/vue';
import { AlertStore } from './../../../storage/alert/alert';

const storeAlert = AlertStore();

const props = defineProps({
  id: String,
  message: String,
});

const close = (id: string) => {
  storeAlert.closeAlert(id);
};
</script>

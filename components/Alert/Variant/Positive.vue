<template>
  <div
    role="alert"
    id="alertPositive"
    class="flex items-start md:items-center max-w-[600px] shadow-md bg-positive-100 pr-2 pl-4 ring-1 ring-positive-200 typography-text-sm md:typography-text-base py-1 rounded-md"
  >
    <SfIconCheckCircle class="my-2 mr-2 text-positive-700 shrink-0" />
    <p class="py-2 mr-2">{{ message }}</p>
    <button
      type="button"
      id="closeAlertPositive"
      class="p-1.5 md:p-2 ml-auto rounded-md text-positive-700 hover:bg-positive-200 active:bg-positive-300 hover:text-positive-800 active:text-positive-900 focus-visible:outline focus-visible:outline-offset"
      aria-label="Close positive alert"
    >
      <SfIconClose class="hidden md:block" @click="close(id)" />
      <SfIconClose size="sm" class="block md:hidden" />
    </button>
  </div>
</template>

<script lang="ts" setup>
import { SfIconCheckCircle, SfIconClose } from '@storefront-ui/vue';
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

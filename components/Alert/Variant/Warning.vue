<template>
  <div
    role="alert"
    id="alertWarning"
    class="flex items-start bg-warning-100 max-w-[600px] shadow-md pr-2 pl-4 ring-1 ring-warning-200 typography-text-sm md:typography-text-base py-1 rounded-md"
  >
    <SfIconWarning class="mt-2 mr-2 text-warning-700 shrink-0" />
    <p class="py-2 mr-2">{{ message }}</p>
    <button
      type="button"
      class="p-1.5 md:p-2 ml-2 rounded-md text-negative-700 hover:bg-negative-200 active:bg-negative-300 hover:text-negative-800 active:text-negative-900 focus-visible:outline focus-visible:outline-offset"
      aria-label="Close warning alert"
    >
      <SfIconClose class="hidden md:block" @click="close(id)" />
      <SfIconClose size="sm" class="block md:hidden" />
    </button>
  </div>
</template>

<script lang="ts" setup>
import { SfIconWarning, SfIconClose } from '@storefront-ui/vue';
import { AlertStore } from './../../../storage/alert/alert';

const props = defineProps({
  id: String,
  message: String,
});

const storeAlert = AlertStore();

const close = (id: string) => {
  storeAlert.closeAlert(id);
};
</script>

import { defineStore } from "pinia";
import { ref } from "vue";

export const SpinnerStore = defineStore("spinner", () => {
  const app = ref<boolean>(false);

  return { app };
});

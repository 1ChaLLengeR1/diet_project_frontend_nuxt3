// general
import { defineStore } from "pinia";
import { ref } from "vue";

// types
import type { LoadingSpinner } from "./../../data/types/spinners/types";

export const SpinnerStore = defineStore("spinner", () => {
  const app = ref<LoadingSpinner>({ active: false, info: "" });
  const projectPanel = ref<LoadingSpinner>({ active: false, info: "" });

  return { app, projectPanel };
});

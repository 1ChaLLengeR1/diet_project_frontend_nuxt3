import { defineStore } from "pinia";
import { ref } from "vue";

export const ColorsStore = defineStore("colors", () => {
  const main = ref<string>("#FF7200");

  return { main };
});

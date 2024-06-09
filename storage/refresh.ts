// general
import { defineStore } from "pinia";
import { ref } from "vue";

// stores
import { DictionaryStore } from "./dictionary/dictionary";
import { SpinnerStore } from "./spinners/spinners";

export const RefreshStore = defineStore("refresh", () => {
  const dictionaryStore = DictionaryStore();
  const spinnerStore = SpinnerStore();

  const refreshStores = async () => {
    spinnerStore.app.active = true;
    spinnerStore.app.info = "loadingSpinner.stores.dictionary";
    await dictionaryStore.refreshCollection();

    spinnerStore.app.active = false;
    spinnerStore.app.info = "";
  };

  return { refreshStores };
});

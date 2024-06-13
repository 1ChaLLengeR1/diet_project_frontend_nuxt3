// general
import { defineStore } from "pinia";
import { ref } from "vue";

// stores
import { DictionaryStore } from "./dictionary/dictionary";
import { SpinnerStore } from "./spinners/spinners";
import { ProjectStore } from "./project/project";

export const RefreshStore = defineStore("refresh", () => {
  const dictionaryStore = DictionaryStore();
  const spinnerStore = SpinnerStore();
  const projectStore = ProjectStore();

  const refreshStores = async () => {
    spinnerStore.app.active = true;
    spinnerStore.app.info = "loadingSpinner.stores.dictionary";
    await dictionaryStore.refreshCollection();

    spinnerStore.app.info = "loadingSpinner.stores.projects";
    await projectStore.refreschCollection();

    spinnerStore.app.active = false;
    spinnerStore.app.info = "";
  };

  return { refreshStores };
});

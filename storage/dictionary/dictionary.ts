import { defineStore } from "pinia";
import { ref } from "vue";

// types
import type {
  Dictionary,
  AppLanguage,
} from "./../../data/types/storage/dictionary/types";

import { collectionDictionary } from "./../../api/dictionary/fetch";

export const DictionaryStore = defineStore("dictionary", () => {
  const { setLocale } = useI18n();
  const refreshForms = ref<string>("");
  const localStorageAppLanguage = ref<string>("appLanguage");
  const appLanguage = ref<AppLanguage>({
    id: "e09bd685-aaf8-4d65-bcdd-aadca85670bc",
    key: "pl",
  });
  const collection = ref<Dictionary[]>([]);

  const apiFetch = async () => {
    if (collection.value.length > 0) {
      return;
    }

    const response = await collectionDictionary();
    if (response !== null && response.collection) {
      collection.value = response.collection;
    }
  };

  const changeLanguage = (key: string) => {
    const findLaunguage: Dictionary | undefined = collection.value.find(
      (launguage) => launguage.key === key
    );

    if (findLaunguage !== undefined) {
      localStorage.setItem(
        localStorageAppLanguage.value,
        JSON.stringify({
          id: findLaunguage.id,
          key: findLaunguage.key,
        })
      );

      appLanguage.value.id = findLaunguage.id;
      appLanguage.value.key = findLaunguage.key;

      setLocale(key);
    }
  };

  const defaultLanguage = () => {
    const dataLocalStorage: AppLanguage = JSON.parse(
      localStorage.getItem(localStorageAppLanguage.value) as string
    );

    if (dataLocalStorage !== null) {
      appLanguage.value.id = dataLocalStorage.id;
      appLanguage.value.key = dataLocalStorage.key;

      setLocale(appLanguage.value.key as string);
    }
  };
  defaultLanguage();

  const getAppLanguage = (): string => {
    return appLanguage.value.id;
  };

  const refreshCollection = async () => {
    refreshForms.value = Math.random().toString();
    collection.value = [];
    await apiFetch();
  };

  return {
    collection,
    refreshForms,
    apiFetch,
    getAppLanguage,
    changeLanguage,
    refreshCollection,
  };
});

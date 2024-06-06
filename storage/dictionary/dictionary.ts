import { defineStore } from "pinia";
import { ref } from "vue";

// types
import type {
  Dictionary,
  ResponseDictionary,
} from "./../../data/types/storage/dictionary/types";

import { collectionDictionary } from "./../../api/dictionary/fetch";

export const DictionaryStore = defineStore("dictionary", () => {
  const collection = ref<Dictionary[]>([]);

  const apiFetch = async () => {
    if (collection.value.length > 0) {
      return;
    }

    const response: ResponseDictionary | null = await collectionDictionary();
    if (response === null) {
      return;
    }

    response.collection?.forEach((item) => {
      collection.value.push(item);
    });
  };

  return { collection, apiFetch };
});

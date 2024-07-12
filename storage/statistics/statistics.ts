// general
import { defineStore } from "pinia";
import { ref } from "vue";

// types
import type { ItemStatistics } from "./../../data/types/storage/statistics/types";

// apis
import { collectionStatistics } from "./../../api/statistics/fetch";

export const StatisticsStore = defineStore("statistics", () => {
  const collection = ref<ItemStatistics[]>([]);

  const apiFetch = async (projectId: string) => {
    if (collection.value.length > 0) {
      return;
    }

    const response = await collectionStatistics(projectId);
    if (response !== null && response.collection) {
      collection.value = response.collection;
    }
  };

  return { collection, apiFetch };
});

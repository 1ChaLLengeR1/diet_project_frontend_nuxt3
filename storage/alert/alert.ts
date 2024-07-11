import { defineStore } from "pinia";
import { ref } from "vue";
import type { ItemCollection } from "../../data/types/storage/alert/types";

export const AlertStore = defineStore("alert", () => {
  type Timeout = ReturnType<typeof setTimeout>;
  const collection = ref<ItemCollection[]>([]);
  const timer = ref<Timeout | null>(null);

  const removeOldest = () => {
    if (collection.value.length === 0) {
      return;
    }
    const oldestDate = new Date(
      Math.min(...collection.value.map((item) => new Date(item.date).getTime()))
    );
    const indexToRemove = collection.value.findIndex(
      (item) => new Date(item.date).getTime() === oldestDate.getTime()
    );
    if (indexToRemove !== -1) {
      collection.value.splice(indexToRemove, 1);
      if (collection.value.length > 0) {
        setTimeout(removeOldest, 5000);
      }
    }
  };

  const addToCollection = (message: string, type: string) => {
    collection.value.push({
      id: Math.random().toString(),
      message: message,
      type: type,
      date: new Date().toString(),
    });

    if (collection.value.length > 0) {
      timer.value = setTimeout(removeOldest, 5000);
    }
  };

  const closeAlert = (id: string) => {
    const indexToRemove = collection.value.findIndex((item) => item.id === id);
    collection.value.splice(indexToRemove, 1);
    clearTimeout(timer.value as Timeout);
  };

  return {
    addToCollection,
    collection,
    closeAlert,
  };
});

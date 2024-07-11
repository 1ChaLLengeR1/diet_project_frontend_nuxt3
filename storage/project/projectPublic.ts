// general
import { defineStore } from "pinia";
import { ref } from "vue";

// types
import type {
  Collection,
  BodyCollectionPublic,
} from "./../../data/types/storage/project/types";
import type { Pagination } from "./../../data/types/storage/types";

// api
import { collectionPublic } from "./../../api/project/fetch";

// stores
import { DictionaryStore } from "./../dictionary/dictionary";

export const ProjecPublictStore = defineStore("projectPublic", () => {
  const dictionaryStore = DictionaryStore();

  const userId = ref<string>("");
  const collection = ref<Collection[]>([]);
  const pagination = ref<Pagination>({
    nextPage: 0,
    previousPage: 0,
    currentPage: 0,
    totalPages: 0,
    twoAfter: 0,
    twoBelow: 0,
    offset: 0,
  });

  const apiFetch = async (
    restart: boolean,
    userId: string,
    page: string | number = "1"
  ) => {
    if (restart === true) {
      collection.value = [];
    }

    if (collection.value.length > 0) {
      return;
    }

    const body: BodyCollectionPublic = {
      id: userId,
      idLanguage: dictionaryStore.getAppLanguage(),
      page: page.toString(),
    };

    const response = await collectionPublic(body);
    if (response !== null && response.collection) {
      collection.value = response?.collection;
      pagination.value = response?.pagination!;
    }
  };

  const loadPagePagination = async (userId: string) => {
    await apiFetch(true, userId, pagination.value.currentPage);
  };

  const refreshCollection = async () => {
    if (userId.value !== "") {
      await apiFetch(true, userId.value, "1");
    }
  };

  return {
    userId,
    collection,
    pagination,
    apiFetch,
    loadPagePagination,
    refreshCollection,
  };
});

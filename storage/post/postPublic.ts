// general
import { defineStore } from "pinia";
import { ref } from "vue";

// types
import type {
  BodyCollectionPublicPost,
  CollectionPost,
  CollectionOnePost,
} from "./../../data/types/storage/post/types";
import type { Pagination } from "./../../data/types/storage/types";

// stores
import { DictionaryStore } from "./../dictionary/dictionary";
import { AuthStore } from "./../../storage/auth/auth";

// apis
import {
  collectionPublicPost,
  collectionOnePublic,
} from "./../../api/post/fetch";

export const PostPublicStore = defineStore("postPublic", () => {
  const dictionaryStore = DictionaryStore();
  const authStore = AuthStore();
  const collection = ref<CollectionPost[]>([]);
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
    projectId: string = "",
    userId: string,
    page: string = "1"
  ) => {
    if (restart === true) {
      collection.value = [];
    }

    if (collection.value.length > 0) {
      return;
    }

    const body: BodyCollectionPublicPost = {
      userId: userId!,
      projectId: projectId,
      idLanguage: dictionaryStore.getAppLanguage(),
      page: page,
    };

    const response = await collectionPublicPost(body);
    if (response !== null && response.collection) {
      collection.value = response?.collection;
      pagination.value = response?.pagination!;
    }
  };

  const apiFetchOne = async (id: string): Promise<CollectionOnePost | null> => {
    const body: { id: string } = {
      id: id,
    };

    const response = await collectionOnePublic(body);
    if (response !== null && response.collection) {
      return {
        collection: response?.collection,
        collectionTraining: response?.collectionTraining!,
      };
    }

    return null;
  };

  const loadPagePagination = async (userId: string, projectId: string) => {
    await apiFetch(
      true,
      projectId,
      userId,
      pagination.value.currentPage.toString()
    );
  };

  return { collection, pagination, apiFetch, apiFetchOne, loadPagePagination };
});

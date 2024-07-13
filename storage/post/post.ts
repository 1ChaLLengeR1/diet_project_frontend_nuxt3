// general
import { defineStore } from "pinia";
import { ref } from "vue";

// types
import type {
  CollectionPost,
  CreatePost,
  CollectionOnePost,
  ChnagePost,
  BodyCollectionPublicPost,
} from "./../../data/types/storage/post/types";
import type { Pagination } from "./../../data/types/storage/types";
import type { CreateFile } from "./../../data/types/storage/file/types";
import type { FilesAdd } from "./../../data/types/storage/file/types";

// stores
import { AlertStore } from "./../alert/alert";
import { FileStore } from "./../file/file";
import { StatisticsStore } from "./../statistics/statistics";

// apis
import { collectionPost, collectionOnePost } from "./../../api/post/fetch";
import { createPost } from "./../../api/post/post";
import { deletePost } from "./../../api/post/delete";
import { changePost } from "./../../api/post/chnage";

export const PostStore = defineStore("post", () => {
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

  const { $i18n } = useNuxtApp();
  const alertStore = AlertStore();
  const fileStore = FileStore();
  const statisticsStore = StatisticsStore();

  const apiFetch = async (
    reset: boolean = false,
    page: number = 1,
    projectId: string
  ) => {
    if (reset === true) {
      collection.value = [];
    }
    if (collection.value.length > 0) {
      return;
    }

    const body: { id: string } = { id: projectId };
    const response = await collectionPost(page, body);
    if (response !== null && response?.collection) {
      collection.value = response?.collection;
      pagination.value = response?.pagination!;
    }
  };

  const apiFetchOne = async (id: string): Promise<CollectionOnePost | null> => {
    const response = await collectionOnePost(id);
    if (response !== null && response.collection) {
      return {
        collection: response.collection[0],
        collectionTraining: response?.collectionTraining!,
      };
    }

    return null;
  };

  const loadPagePagination = async (projectId: string) => {
    await apiFetch(true, pagination.value.currentPage, projectId);
  };

  const createPostF = async (
    projectId: string,
    body: CreatePost,
    files: { name: string; file: File }[]
  ) => {
    const response = await createPost(projectId, body);

    if (response !== null && response.collection) {
      alertStore.addToCollection(
        $i18n.t("alert.message.positive.post.addPost"),
        "positive"
      );

      await apiFetch(true, 1, response.collection[0].projectId);
      const arrayImages: CreateFile[] = [];

      files.forEach((image) => {
        if (response.collection && image.file !== null) {
          const objectFile: CreateFile = {
            projectId: response?.collection[0].id,
            folder: `Day_${response?.collection[0].day}_${Math.random().toFixed(
              4
            )}`,
            name: image.name,
            file: image.file,
          };
          arrayImages.push(objectFile);
        }
      });

      if (arrayImages.length === 0) {
        return;
      }
      const responseFile = await fileStore.createFile(arrayImages);
      if (responseFile !== null && responseFile.length > 0) {
        alertStore.addToCollection(
          $i18n.t("alert.message.positive.file.createFile"),
          "positive"
        );
      } else {
        alertStore.addToCollection(
          $i18n.t("alert.message.error.file.createFile"),
          "error"
        );
      }
      return;
    }
    alertStore.addToCollection(
      $i18n.t("alert.message.error.post.addPost"),
      "error"
    );
  };

  const changePostF = async (
    postId: string,
    bodyChangePost: ChnagePost,
    files: FilesAdd[]
  ) => {
    const response = await changePost(postId, bodyChangePost);
    if (response !== null) {
      alertStore.addToCollection(
        $i18n.t("alert.message.positive.post.changePost"),
        "positive"
      );

      if (files.length === 0) {
        return;
      }

      const arrayImages: CreateFile[] = [];
      files.forEach((image) => {
        if (response.collection && image.file !== null) {
          const objectFile: CreateFile = {
            projectId: postId,
            folder: image?.folder!,
            name: image?.name!,
            file: image.file!,
          };
          arrayImages.push(objectFile);
        }
      });
      const responseFile = await fileStore.createFile(arrayImages);
      if (responseFile !== null && responseFile.length > 0) {
        alertStore.addToCollection(
          $i18n.t("alert.message.positive.file.createFile"),
          "positive"
        );
      } else {
        alertStore.addToCollection(
          $i18n.t("alert.message.error.file.createFile"),
          "error"
        );
      }
      return;
    }
    alertStore.addToCollection(
      $i18n.t("alert.message.error.post.changePost"),
      "error"
    );
  };

  const deletePostF = async (postId: string) => {
    const response = await deletePost(postId);
    if (response !== null && response.collection) {
      alertStore.addToCollection(
        $i18n.t("alert.message.positive.post.deletePost"),
        "positive"
      );

      await fileStore.deleteAllFileF({
        ids: [postId],
      });
      await apiFetch(true, 1, response.collection[0].projectId);
      statisticsStore.collection = [];
      return;
    }

    alertStore.addToCollection(
      $i18n.t("alert.message.error.file.deleteFile"),
      "error"
    );
  };

  return {
    collection,
    pagination,
    apiFetch,
    apiFetchOne,
    createPostF,
    deletePostF,
    loadPagePagination,
    changePostF,
  };
});

// general
import { defineStore } from "pinia";
import { ref } from "vue";

// types
import type {
  CreateFile,
  ItemFile,
  CollectionIds,
} from "./../../data/types/storage/file/types";

import type { ResponseFile } from "./../../data/types/api/file/types";

// apis
import { uploadFile } from "./../../api/file/post";
import { deleteAllFile, deleteImage } from "./../../api/file/delete";
import {
  collectionFileMultiple,
  collectionOne,
  downloadZip,
} from "./../../api/file/collection";

// stores
import { AlertStore } from "./../alert/alert";

export const FileStore = defineStore("file", () => {
  const { $i18n } = useNuxtApp();
  const alertStore = AlertStore();
  const collectionMultiple = ref<ItemFile[]>([]);

  const apiGetMultiple = async (ids: CollectionIds) => {
    if (collectionMultiple.value === null) {
      return;
    }

    if (collectionMultiple.value.length > 0) {
      return;
    }

    if (ids.ids.length === 0) {
      return;
    }

    const response = await collectionFileMultiple(ids);
    if (response === null) {
      return;
    }

    collectionMultiple.value = response?.collection!;
  };

  const apiFetchOne = async (id: string): Promise<ItemFile[] | null> => {
    const response: ResponseFile | null = await collectionOne(id);
    if (response !== null && response.collection) {
      return response.collection;
    }

    return null;
  };

  const findImage = (id: string): string | null => {
    if (collectionMultiple.value === null) {
      return null;
    }
    const findImage = collectionMultiple.value.find(
      (item) => item.projectId === id
    );

    if (findImage !== undefined || findImage !== null) {
      return findImage?.url!;
    }
    return null;
  };

  const deleteImageF = async (id: string) => {
    const response = await deleteImage(id);
    if (response !== null) {
      alertStore.addToCollection(
        $i18n.t("alert.message.positive.file.deleteFile"),
        "positive"
      );
      return;
    }
    alertStore.addToCollection(
      $i18n.t("alert.message.error.file.deleteFile"),
      "error"
    );
  };

  const createFile = async (
    files: CreateFile[]
  ): Promise<ItemFile[] | null> => {
    const formData = new FormData();

    formData.append(`projectId`, files[0].projectId);
    formData.append(`folder`, files[0].folder);

    for (let i = 0; i < files.length; i++) {
      formData.append(`file[${i}]`, files[i].file);
      formData.append(`name[${i}]`, files[i].name);
    }

    if (Array.from(formData.keys()).length === 0) {
      return null;
    }

    const response = await uploadFile(formData);
    if (response !== null) {
      collectionMultiple.value = [];
      return response?.collection!;
    }
    return null;
  };

  const deleteAllFileF = async (ids: {
    ids: string[];
  }): Promise<ItemFile[] | null> => {
    const response = await deleteAllFile(ids);
    if (response !== null) {
      return response?.collection!;
    }
    return null;
  };

  const downoladProject = async (projectId: string) => {
    const response = await downloadZip(projectId);
    if (response === true) {
      alertStore.addToCollection(
        $i18n.t("alert.message.positive.file.download"),
        "positive"
      );
      return;
    }
    alertStore.addToCollection(
      $i18n.t("alert.message.error.file.download"),
      "error"
    );
  };

  return {
    collectionMultiple,
    findImage,
    createFile,
    deleteAllFileF,
    apiGetMultiple,
    apiFetchOne,
    deleteImageF,
    downoladProject,
  };
});

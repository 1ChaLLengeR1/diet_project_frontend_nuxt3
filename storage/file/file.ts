// general
import { defineStore } from "pinia";
import { ref } from "vue";

// types
import type {
  CreateFile,
  ItemFile,
  CollectionIds,
} from "./../../data/types/storage/file/types";

// apis
import { uploadFile } from "./../../api/file/post";
import { deleteAllFile } from "./../../api/file/delete";
import { collectionFileMultiple } from "./../../api/file/collection";

export const FileStore = defineStore("file", () => {
  const collectionMultiple = ref<ItemFile[]>([]);

  const apiGetMultiple = async (ids: CollectionIds) => {
    if (collectionMultiple.value.length > 0) {
      return;
    }

    const response = await collectionFileMultiple(ids);
    if (response === null) {
      return;
    }

    collectionMultiple.value = response?.collection!;
  };

  const findImage = (id: string): string | null => {
    const findImage = collectionMultiple.value.find(
      (item) => item.projectId === id
    );
    if (findImage !== undefined) {
      return findImage.url;
    }
    return null;
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

  return { findImage, createFile, deleteAllFileF, apiGetMultiple };
});

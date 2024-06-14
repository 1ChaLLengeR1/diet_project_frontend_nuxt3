// general
import { defineStore } from "pinia";
import { ref } from "vue";

// types
import type {
  CreateFile,
  ItemFile,
} from "./../../data/types/storage/file/types";

// apis
import { uploadFile } from "./../../api/file/post";
import { deleteAllFile } from "./../../api/file/delete";

export const FileStore = defineStore("file", () => {
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

  return { createFile, deleteAllFileF };
});

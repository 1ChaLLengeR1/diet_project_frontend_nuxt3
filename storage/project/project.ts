// general
import { defineStore } from "pinia";
import { ref } from "vue";

// types
import type {
  Collection,
  FormProject,
  CreateProject,
} from "./../../data/types/storage/project/types";

import type { ResponseProject } from "./../../data/types/api/project/types";
import type { Pagination } from "./../../data/types/storage/types";

import type {
  CreateFile,
  DeleteAll,
} from "./../../data/types/storage/file/types";

// apis
import {
  collectionProject,
  collectionOne,
  collectionProjectAll,
} from "./../../api/project/fetch";
import { createProject } from "./../../api/project/post";
import { deleteProject } from "./../../api/project/delete";
import { changeProeject } from "./../../api/project/change";

// stores
import { AlertStore } from "./../alert/alert";
import { FileStore } from "./../file/file";
import { PostStore } from "./../post/post";
import { PostPublicStore } from "./../post/postPublic";
import { AuthStore } from "./../auth/auth";

export const ProjectStore = defineStore("project", () => {
  const { $i18n } = useNuxtApp();
  const alertStore = AlertStore();
  const fileStore = FileStore();
  const authStore = AuthStore();
  const postStore = PostStore();
  const postPublicStore = PostPublicStore();

  const collection = ref<Collection[]>([]);
  const collectionAll = ref<Collection[]>([]);
  const pagination = ref<Pagination>({
    nextPage: 0,
    previousPage: 0,
    currentPage: 0,
    totalPages: 0,
    twoAfter: 0,
    twoBelow: 0,
    offset: 0,
  });

  const apiFetch = async (reset: boolean = false, page: number = 1) => {
    if (reset === true) {
      collection.value = [];
    }

    if (collection.value.length > 0) {
      return;
    }

    const response = await collectionProject(page);
    if (response !== null && response?.collection) {
      collection.value = response?.collection;
      pagination.value = response?.pagination!;
    }
  };

  const apiFetchAll = async (reset: boolean = false) => {
    if (reset === true) {
      collectionAll.value = [];
    }

    if (collectionAll.value.length > 0) {
      return;
    }

    const response = await collectionProjectAll();
    if (response !== null && response?.collection) {
      collectionAll.value = response?.collection;
    }
  };

  const apiFetchOne = async (id: string): Promise<Collection | null> => {
    const response: ResponseProject | null = await collectionOne(id);

    if (response !== null && response.collection) {
      return response.collection[0];
    }

    return null;
  };

  const createProjectF = async (body: FormProject) => {
    const createProjectBody: CreateProject = {
      title: body.title,
      description: body.description,
    };

    const response = await createProject(createProjectBody);

    if (response !== null && response.collection) {
      alertStore.addToCollection(
        $i18n.t("alert.message.positive.project.addProject"),
        "positive"
      );

      const objectFile: CreateFile = {
        projectId: response?.collection[0].id,
        folder: `${response?.collection[0].title}_${Math.random().toFixed(4)}`,
        name: response?.collection[0].title,
        file: body.file,
      };

      if (!body.file) {
        return;
      }

      const responseFile = await fileStore.createFile([objectFile]);
      if (responseFile !== null && responseFile.length > 0) {
        alertStore.addToCollection(
          $i18n.t("alert.message.positive.file.createFile"),
          "positive"
        );
      }
      return;
    }

    alertStore.addToCollection(
      $i18n.t("alert.message.error.project.addProject"),
      "error"
    );
  };

  const changeProjectF = async (id: string, body: FormProject) => {
    let folder: string;
    const changeProject: { title: string; description: string } = {
      title: body.title,
      description: body.description,
    };

    const responseProject = await changeProeject(id, changeProject);
    if (responseProject !== null && responseProject.collection) {
      alertStore.addToCollection(
        $i18n.t("alert.message.positive.project.changeProject"),
        "positive"
      );

      if (body.file === null || body.file! instanceof File === false) {
        return;
      }

      folder = responseProject?.collection[0].title;
      if (body.fileFolder !== undefined) {
        folder = body.fileFolder;
      }

      const objectFile: CreateFile = {
        projectId: responseProject?.collection[0].id,
        folder: folder,
        name: responseProject?.collection[0].title,
        file: body.file,
      };

      const responseFile = await fileStore.createFile([objectFile]);
      if (responseFile !== null && responseFile.length > 0) {
        alertStore.addToCollection(
          $i18n.t("alert.message.positive.file.createFile"),
          "positive"
        );
      } else {
        alertStore.addToCollection(
          $i18n.t("alert.message.positive.file.createFile"),
          "error"
        );
      }

      return;
    }
    alertStore.addToCollection(
      $i18n.t("alert.message.error.project.changeProject"),
      "error"
    );
  };

  const deleteProjectF = async (id: string) => {
    const response = await deleteProject(id);
    if (
      response !== null &&
      response.collection &&
      response.collection.length > 0
    ) {
      alertStore.addToCollection(
        $i18n.t("alert.message.positive.project.deleteProject"),
        "positive"
      );

      const ids: DeleteAll = {
        ids: response.collectionRemoveId!,
      };

      const responseDeleteFileAll = await fileStore.deleteAllFileF(ids);

      if (responseDeleteFileAll !== null && responseDeleteFileAll.length > 0) {
        alertStore.addToCollection(
          $i18n.t("alert.message.positive.file.deleteAllFile"),
          "positive"
        );
      } else {
        $i18n.t("alert.message.error.file.deleteAllFile"), "error";
      }

      postStore.collection = [];
      postPublicStore.collection = [];
      return;
    }

    alertStore.addToCollection(
      $i18n.t("alert.message.error.project.deleteProject"),
      "error"
    );
  };

  const loadPagePagination = async () => {
    await apiFetch(true, pagination.value.currentPage);
  };

  const refreschCollection = async () => {
    if (authStore.getTokenDataForApi() !== "") {
      await apiFetch(true);
    }
  };

  return {
    pagination,
    collection,
    collectionAll,
    apiFetch,
    apiFetchAll,
    createProjectF,
    deleteProjectF,
    refreschCollection,
    apiFetchOne,
    changeProjectF,
    loadPagePagination,
  };
});

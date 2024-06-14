// general
import { defineStore } from "pinia";
import { ref } from "vue";

// types
import type {
  Collection,
  FormProject,
  CreateProject,
} from "./../../data/types/storage/project/types";

import type {
  CreateFile,
  DeleteAll,
} from "./../../data/types/storage/file/types";

// apis
import { collectionProject } from "./../../api/project/fetch";
import { createProject } from "./../../api/project/post";
import { deleteProject } from "./../../api/project/delete";

// stores
import { AlertStore } from "./../alert/alert";
import { FileStore } from "./../file/file";

export const ProjectStore = defineStore("project", () => {
  const { $i18n } = useNuxtApp();
  const alertStore = AlertStore();
  const fileStore = FileStore();
  const collection = ref<Collection[]>([]);

  const apiFetch = async (reset: boolean = false) => {
    if (reset === true) {
      collection.value = [];
    }

    if (collection.value.length > 0) {
      return;
    }

    const response = await collectionProject(1, true);
    if (response !== null && response?.collection) {
      collection.value = response?.collection;
    }
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
        folder: response?.collection[0].title,
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
      } else {
        alertStore.addToCollection(
          $i18n.t("alert.message.positive.file.createFile"),
          "error"
        );
      }

      return;
    }

    alertStore.addToCollection(
      $i18n.t("alert.message.error.project.addProject"),
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

      const findId = collection.value.findIndex(
        (item) => item.id === response.collection[0].id
      );

      if (findId !== -1) {
        collection.value.splice(findId, 1);
      }

      if (response.collectionRemoveId!.length === 0) {
        return;
      }

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

      return;
    }

    alertStore.addToCollection(
      $i18n.t("alert.message.error.project.deleteProject"),
      "error"
    );
  };

  const refreschCollection = async () => {
    await apiFetch(true);
  };

  return {
    collection,
    apiFetch,
    createProjectF,
    deleteProjectF,
    refreschCollection,
  };
});

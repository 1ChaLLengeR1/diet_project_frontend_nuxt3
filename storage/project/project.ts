// general
import { defineStore } from "pinia";
import { ref } from "vue";

// types
import type {
  Collection,
  FormProject,
  CreateProject,
} from "./../../data/types/storage/project/types";

// apis
import { collectionProject } from "./../../api/project/fetch";
import { createProject } from "./../../api/project/post";

// stores
import { AlertStore } from "./../alert/alert";

export const ProjectStore = defineStore("project", () => {
  const { $i18n } = useNuxtApp();
  const alertStore = AlertStore();
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

    if (response !== null) {
      alertStore.addToCollection(
        $i18n.t("alert.message.positive.project.addProject"),
        "positive"
      );
      return;
    }

    alertStore.addToCollection(
      $i18n.t("alert.message.error.project.addProject"),
      "error"
    );
  };

  return { collection, createProjectF, apiFetch };
});

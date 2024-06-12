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

export const ProjectStore = defineStore("project", () => {
  const collection = ref<Collection[]>([]);

  const createProjectF = async (body: FormProject) => {
    const createProjectBody: CreateProject = {
      title: body.title,
      description: body.description,
    };
    const response = await createProject(createProjectBody);
    if (response === null) {
      return;
    }
    console.log(response);
  };

  return { collection, createProjectF };
});

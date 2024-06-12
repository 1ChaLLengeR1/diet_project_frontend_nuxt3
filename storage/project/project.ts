// general
import { defineStore } from "pinia";
import { ref } from "vue";

// types
import type { Collection } from "./../../data/types/storage/project/types";

export const ProjectStore = defineStore("project", () => {
  const collection = ref<Collection[]>([]);

  const createProject = async () => {};

  return { collection, createProject };
});

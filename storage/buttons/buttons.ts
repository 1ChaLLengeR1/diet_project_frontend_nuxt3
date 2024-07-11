// general
import { defineStore } from "pinia";
import { ref } from "vue";

// types
import type { ItemFilterPost } from "./../../data/types/storage/project/types";
import type { ItemFilter } from "./../../data/types/storage/user/types";

export const ButtonsStore = defineStore("buttons", () => {
  const selectProject = ref<ItemFilterPost>({
    id: null,
    title: null,
  });

  const selectUser = ref<ItemFilter>({
    id: null,
    fullName: null,
  });

  const saveDataSelectProject = (id: string, title: string) => {
    selectProject.value.id = id;
    selectProject.value.title = title;
  };

  const saveDataSelectUser = (id: string, fullName: string) => {
    selectUser.value.id = id;
    selectUser.value.fullName = fullName;
  };

  return {
    selectProject,
    selectUser,
    saveDataSelectProject,
    saveDataSelectUser,
  };
});

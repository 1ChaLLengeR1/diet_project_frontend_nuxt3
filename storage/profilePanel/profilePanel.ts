// general vue
import { defineStore } from "pinia";
import { ref } from "vue";
import { paths } from "./../../utils/paths";

// types
import type { Tabs } from "./../../data/types/storage/profilePanel/types";

// helpers
import { splitString } from "./../common/splits";

export const ProfilePanelStore = defineStore("profilePanel", () => {
  const localStorageProfilePanelTab = ref<string>("panelTab");
  const createProjectTab = ref<string>("createProject");
  const createPostTab = ref<string>("createPost");

  const tabs = ref<Tabs[]>([
    {
      value: "user",
      path: `${paths.profilePanelUser}`,
      name: "profilePanel.tabs.user",
      active: false,
    },
    {
      value: "projects",
      path: `${paths.profilePanelProject}`,
      name: "profilePanel.tabs.project",
      active: false,
    },
    {
      value: "posts",
      path: `${paths.profilePanelPosts}`,
      name: "profilePanel.tabs.post",
      active: false,
    },
  ]);

  const tabsCreate = ref<Tabs[]>([
    {
      value: createProjectTab.value,
      path: `${paths.profilePanelProjectCreate}`,
      name: "profilePanel.tabs.create_project",
      active: false,
    },
    {
      value: createPostTab.value,
      path: `${paths.profilePanelPostCreate}`,
      name: "profilePanel.tabs.create_post",
      active: false,
    },
  ]);

  const saveTab = (tab: string) => {
    localStorage.setItem(localStorageProfilePanelTab.value, tab);
  };

  const activeTab = (): string | null => {
    const tab = localStorage.getItem(localStorageProfilePanelTab.value);
    if (tab) {
      return tab;
    }
    return null;
  };

  const filterActiveCreateTabs = (page: string): Tabs[] => {
    let paths: string[] = [];
    paths = splitString(page, "/");

    if (paths[2] === "projects") {
      return tabsCreate.value.filter(
        (tab) => tab.value !== createPostTab.value
      );
    } else if (paths[2] === "posts") {
      return tabsCreate.value.filter(
        (tab) => tab.value !== createProjectTab.value
      );
    }
    return [];
  };

  return { tabs, tabsCreate, saveTab, activeTab, filterActiveCreateTabs };
});

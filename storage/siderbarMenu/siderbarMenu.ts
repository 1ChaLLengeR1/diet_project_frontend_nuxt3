// general vue
import { defineStore } from "pinia";
import { ref } from "vue";
import { paths } from "./../../utils/paths";

//types
import type { siderBarMenu } from "./../../data/types/storage/siderbarMenu/types";

//stores
import { AuthStore } from "./../auth/auth";

export const SiderbarMenu = defineStore("siderbarMenu", () => {
  const authStore = AuthStore();
  const localStorageActiveLink = ref<string>("activeLink");

  const menuList = ref<siderBarMenu[]>([
    {
      name: "sidebar.siderbarMenu.home",
      type: "link",
      path: `${paths.home}`,
      active: true,
    },
    {
      name: "sidebar.siderbarMenu.projects",
      type: "link",
      path: `${paths.projects}`,
      active: false,
    },
    {
      name: "sidebar.siderbarMenu.adminPanel",
      type: "panel",
      path: `${paths.profilePanelUser}`,
      active: false,
    },
    {
      name: "sidebar.siderbarMenu.login",
      type: "login",
      path: "",
      active: false,
    },
  ]);

  const filterLinks = () => {
    if (authStore.paramsAuth0?.nickname === "") {
      return menuList.value.filter((item) => item.type !== "panel");
    }
    return menuList.value;
  };

  const activeLink = (name: string) => {
    menuList.value.forEach((el) => {
      el.active = false;
    });

    const findLink = menuList.value.find((item) => item.name === name);
    if (findLink !== undefined) {
      findLink.active = true;
      localStorage.setItem(localStorageActiveLink.value, findLink.name);
    }
  };

  const changeButtonLogin = (name: string) => {
    if (name === "sidebar.siderbarMenu.login") {
      if (authStore.paramsAuth0?.nickname !== "") {
        return "sidebar.siderbarMenu.logout";
      }
    }
    return name;
  };

  const loadActivelink = () => {
    const loadLink = localStorage.getItem(
      localStorageActiveLink.value
    ) as string;
    if (loadLink !== null) {
      activeLink(loadLink);
    }
  };
  loadActivelink();

  return { menuList, activeLink, changeButtonLogin, filterLinks };
});

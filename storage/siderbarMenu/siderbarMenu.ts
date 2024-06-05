import { defineStore } from "pinia";
import { ref } from "vue";
import type { siderBarMenu } from "./../../data/types/storage/siderbarMenu/types";
import { paths } from "./../../utils/paths";

export const SiderbarMenu = defineStore("siderbarMenu", () => {
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
      name: "sidebar.siderbarMenu.login",
      type: "login",
      path: "",
      active: false,
    },
  ]);

  const activeLink = (name: string) => {
    menuList.value.forEach((el) => {
      el.active = false;
    });

    const findLink = menuList.value.find((item) => item.name === name);
    if (findLink !== undefined) {
      findLink.active = true;
    }
  };

  return { menuList, activeLink };
});

// general vue
import { defineStore } from "pinia";
import { ref } from "vue";

export const MenuMobileStore = defineStore("menuMobile", () => {
  const openMenu = ref<boolean>(false);

  return { openMenu };
});

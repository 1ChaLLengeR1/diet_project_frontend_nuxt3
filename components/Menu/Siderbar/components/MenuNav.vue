<template>
  <header class="w-full mt-24">
    <ul class="w-full flex flex-col gap-3 px-7">
      <ItemMenu
        v-for="(item, index) in siderbarMenuStore.menuList"
        :key="index"
        :name="item.name"
        :type="item.type"
        :path="item.path"
        :active="item.active"
      />
    </ul>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ItemMenu from "./ItemMenu.vue";

import { SiderbarMenu } from "./../../../../storage/siderbarMenu/siderbarMenu";

export default defineComponent({
  components: {
    ItemMenu,
  },
  setup() {
    const siderbarMenuStore = SiderbarMenu();

    return { siderbarMenuStore };
  },
});
</script>

<style scoped></style>

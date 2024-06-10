<template>
  <header class="w-full mt-24">
    <ul
      id="menuNavSiderbar"
      class="w-full flex flex-col gap-3 px-7"
      :class="[
        { 'items-end': position === 'right' },
        { 'items-start': position === 'left' },
      ]"
    >
      <ItemMenu
        v-for="(item, index) in siderbarMenuStore.filterLinks()"
        :key="index"
        :name="item.name"
        :type="item.type"
        :path="item.path"
        :active="item.active"
        :position="position"
      />
    </ul>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ItemMenu from "./ItemMenu.vue";

import { SiderbarMenu } from "./../../../../storage/siderbarMenu/siderbarMenu";

export default defineComponent({
  props: {
    position: {
      type: String,
      requierd: false,
      default: "left",
    },
  },
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

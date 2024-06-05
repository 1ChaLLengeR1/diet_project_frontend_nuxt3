<template>
  <div class="w-full flex justify-start p-3">
    <v-menu transition="scale-transition">
      <template v-slot:activator="{ props }">
        <v-btn prepend-icon="mdi-web" :color="colorsStore.main" v-bind="props">
          {{ $t("sidebar.language.title") }}
        </v-btn>
      </template>

      <v-list>
        <v-list-item v-for="(item, i) in items" :key="i">
          <v-list-item-title class="cursor-pointer">{{
            item.title
          }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ColorsStore } from "./../../../../storage/colors/colors";

export default defineComponent({
  setup() {
    const colorsStore = ColorsStore();

    const items = [
      { title: "Click Me" },
      { title: "Click Me" },
      { title: "Click Me" },
      { title: "Click Me 2" },
    ];
    return { items, colorsStore };
  },
});
</script>

<style scoped></style>

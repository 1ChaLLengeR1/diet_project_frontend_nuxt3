<template>
  <div class="w-full flex justify-start p-3">
    <v-menu transition="scale-transition">
      <template v-slot:activator="{ props }">
        <v-btn
          prepend-icon="mdi-web"
          :color="colorsStore.main"
          :style="smallLanguage"
          v-bind="props"
        >
          {{ $t("sidebar.language.title") }}
        </v-btn>
      </template>

      <v-list>
        <v-list-item
          v-for="(item, index) in dictionaryStore.collection"
          :key="index"
        >
          <v-list-item-title class="cursor-pointer">{{
            item.key
          }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUnmount } from "vue";
import { throttle } from "lodash";

// stores
import { ColorsStore } from "./../../../../storage/colors/colors";
import { DictionaryStore } from "./../../../../storage/dictionary/dictionary";

export default defineComponent({
  setup() {
    const colorsStore = ColorsStore();
    const dictionaryStore = DictionaryStore();
    const smallLanguage = ref<string | null>("");

    const checkScreenWidth = throttle(() => {
      smallLanguage.value = window.innerWidth >= 380 ? null : "font-size: 10px";
    }, 200);

    onMounted(() => {
      window.addEventListener("resize", checkScreenWidth);
      checkScreenWidth();
    });

    onBeforeUnmount(() => {
      window.removeEventListener("resize", checkScreenWidth);
    });

    return { colorsStore, smallLanguage, dictionaryStore };
  },
});
</script>

<style scoped></style>

<template>
  <div id="dropDownLanguage" class="w-full flex justify-end p-3">
    <v-menu transition="scale-transition">
      <template v-slot:activator="{ props }">
        <v-btn
          id="dropDownButton"
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
          id="dropDownItem"
          v-for="(item, index) in dictionaryStore.collection"
          :key="index"
        >
          <v-list-item-title
            @click="changeLanguage(item.key)"
            class="cursor-pointer"
            >{{
              $t("language.dictionaryFormat", {
                translation: item.translation,
                key: item.key,
              })
            }}</v-list-item-title
          >
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUnmount } from "vue";
import _ from "lodash";

// stores
import { ColorsStore } from "./../../storage/colors/colors";
import { DictionaryStore } from "./../../storage/dictionary/dictionary";
import { RefreshStore } from "./../../storage/refresh";

export default defineComponent({
  setup() {
    const colorsStore = ColorsStore();
    const dictionaryStore = DictionaryStore();
    const refreshStore = RefreshStore();
    const smallLanguage = ref<string | null>("");

    const checkScreenWidth = _.throttle(() => {
      smallLanguage.value = window.innerWidth >= 380 ? null : "font-size: 10px";
    }, 200);

    onMounted(() => {
      window.addEventListener("resize", checkScreenWidth);
      checkScreenWidth();
    });

    onBeforeUnmount(() => {
      window.removeEventListener("resize", checkScreenWidth);
    });

    const changeLanguage = async (key: string) => {
      dictionaryStore.changeLanguage(key);
      await refreshStore.refreshStores();
    };

    return { colorsStore, smallLanguage, dictionaryStore, changeLanguage };
  },
});
</script>

<style scoped></style>

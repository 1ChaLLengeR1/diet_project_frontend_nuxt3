<template>
  <div class="w-full flex justify-center">What are you doing here?</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRoute } from "vue-router";

// stores
import { DictionaryStore } from "./../storage/dictionary/dictionary";

export default defineComponent({
  setup() {
    const { $i18n } = useNuxtApp();
    const route = useRoute();

    const dictionaryStore = DictionaryStore();

    const loadLangs = async (data: string) => {
      if (dictionaryStore.collection.length === 0) {
        await dictionaryStore.apiFetch();
      }

      localStorage.removeItem("lang");
      const collectionLangs: string[] = [];
      if (data !== undefined) {
        const lang = JSON.parse(data);
        for (const item of lang.lang) {
          collectionLangs.push($i18n.t(`${item}`));
        }
        localStorage.setItem("lang", JSON.stringify(collectionLangs));
      }
    };

    const runActions = async () => {
      switch (route.query.action) {
        case "loadLangs": {
          await loadLangs(route.query.data as string);
          break;
        }
      }
    };

    runActions();

    return { loadLangs };
  },
});
</script>

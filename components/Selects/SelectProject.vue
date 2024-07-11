<template>
  <div class="w-full">
    <v-select
      id="selectUser"
      :label="loadSelectTitle"
      v-model="search"
      clearable
      :items="
        projectStore.collection.map((item) => ({
          id: item.id,
          title: item.title,
        }))
      "
      item-title="title"
      return-object
    ></v-select>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch, computed } from "vue";

// stores
import { ProjectStore } from "../../storage/project/project";
import { ButtonsStore } from "./../../storage/buttons/buttons";

// types
import type { ItemFilterPost } from "./../../data/types/storage/project/types";

export default defineComponent({
  emits: ["search-project-id"],
  setup(_, ctx) {
    const { $i18n } = useNuxtApp();
    const projectStore = ProjectStore();
    const buttonsStore = ButtonsStore();

    const search = ref<ItemFilterPost | null>({
      id: null,
      title: null,
    });

    onMounted(async () => {
      if (
        buttonsStore.selectProject.id === null ||
        buttonsStore.selectProject.id === undefined
      ) {
        search.value = null;
      }

      if (buttonsStore.selectProject.id !== null && search.value !== null) {
        search.value.id = buttonsStore.selectProject.id;
        search.value.title = buttonsStore.selectProject.title;
      }

      await projectStore.apiFetch();
    });

    watch(search, () => {
      buttonsStore.saveDataSelectProject(
        search.value?.id!,
        search.value?.title!
      );
      ctx.emit("search-project-id", search.value?.id!);
    });

    const loadSelectTitle = computed(() => {
      return $i18n.t("selects.select.project");
    });

    return { projectStore, loadSelectTitle, search };
  },
});
</script>

<style scoped></style>

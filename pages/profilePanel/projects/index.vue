<template>
  <div class="w-full flex flex-col gap-3 p-3">
    <ProfileTab />
    <ul id="listProject" class="w-full flex justify-center flex-wrap gap-3">
      <div v-if="activeList"></div>
      <CardProject
        v-else
        v-for="(item, index) in projectStore.collection"
        :key="index"
        :id="item.id"
        :title="item.title"
        :description="item.description"
        :img="fileStore.findImage(item.id)"
        :updateUp="item.updateUp"
      />
    </ul>
    <v-pagination
      v-if="
        projectStore.pagination.totalPages > 1 &&
        projectStore.collection.length > 0
      "
      v-model="projectStore.pagination.currentPage"
      @click="changePage"
      :length="projectStore.pagination.totalPages"
      next-icon="mdi-menu-right"
      prev-icon="mdi-menu-left"
    ></v-pagination>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

// stores
import { ProjectStore } from "./../../../storage/project/project";
import { FileStore } from "./../../../storage/file/file";

// components
import ProfileTab from "./../../../components/Tabs/ProfilePanel/Profile.vue";
import CardProject from "./../../../components/Cards/ProfileProject/Card.vue";

// helpers
import { findIds } from "./../../../storage/common/finds";

export default defineComponent({
  components: {
    ProfileTab,
    CardProject,
  },
  setup() {
    const projectStore = ProjectStore();
    const fileStore = FileStore();
    const activeList = ref<boolean>(false);

    const changePage = async () => {
      await projectStore.loadPagePagination();
    };

    const runActions = async () => {
      activeList.value = true;

      await projectStore.apiFetch();
      const collectionIds: string[] = findIds(projectStore.collection);
      await fileStore.apiGetMultiple({ ids: collectionIds });

      activeList.value = false;
    };

    setTimeout(async () => {
      activeList.value = true;
      await runActions();
      activeList.value = false;
    }, 1000);

    return { projectStore, fileStore, activeList, changePage };
  },
});
</script>

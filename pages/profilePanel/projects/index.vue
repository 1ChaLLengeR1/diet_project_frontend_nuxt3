<template>
  <div class="w-full flex flex-col gap-3 p-3">
    <ProfileTab />
    <ul class="w-full flex justify-center flex-wrap gap-3">
      <LoadingSpinner v-if="spinnerStore.projectPanel.active" />
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
import { defineComponent, onMounted, ref } from "vue";

// stores
import { ProjectStore } from "./../../../storage/project/project";
import { FileStore } from "./../../../storage/file/file";
import { SpinnerStore } from "./../../../storage/spinners/spinners";

// components
import ProfileTab from "./../../../components/Tabs/ProfilePanel/Profile.vue";
import CardProject from "./../../../components/Cards/ProfileProject/Card.vue";
import LoadingSpinner from "./../../../components/Spinners/spinner.vue";

// helpers
import { findIds } from "./../../../storage/common/finds";

export default defineComponent({
  components: {
    ProfileTab,
    CardProject,
    LoadingSpinner,
  },
  setup() {
    const projectStore = ProjectStore();
    const fileStore = FileStore();
    const spinnerStore = SpinnerStore();

    const changePage = async () => {
      await projectStore.loadPagePagination();
    };

    onMounted(async () => {
      spinnerStore.projectPanel.active = true;
      spinnerStore.app.info = "loadingSpinner.stores.fileMultipleProject";

      await projectStore.apiFetch();
      const collectionIds: string[] = findIds(projectStore.collection);
      await fileStore.apiGetMultiple({ ids: collectionIds });

      spinnerStore.app.info = "";
      spinnerStore.projectPanel.active = false;
    });

    return { projectStore, fileStore, spinnerStore, changePage };
  },
});
</script>

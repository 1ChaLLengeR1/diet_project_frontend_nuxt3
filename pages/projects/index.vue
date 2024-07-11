<template>
  <div class="w-full h-full flex flex-col gap-3 p-3">
    <SelectUsers @search-user-id="searchUser" />
    <ul id="listProject" class="w-full flex justify-center flex-wrap gap-3">
      <CardProject
        v-for="(item, index) in projecPublictStore.collection"
        :key="index"
        :id="item.id"
        :userId="item.userId"
        :title="item.title"
        :description="item.description"
        :img="fileStore.findImage(item.id)"
        :updateUp="item.updateUp"
      />
    </ul>
    <v-pagination
      v-if="
        projecPublictStore.pagination.totalPages > 1 &&
        projecPublictStore.collection.length > 0
      "
      v-model="projecPublictStore.pagination.currentPage"
      @click="changePage"
      :length="projecPublictStore.pagination.totalPages"
      next-icon="mdi-menu-right"
      prev-icon="mdi-menu-left"
    ></v-pagination>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

// stores
import { ProjecPublictStore } from "./../../storage/project/projectPublic";
import { FileStore } from "./../../storage/file/file";

// types

// components
import SelectUsers from "./../../components/Selects/SelectUsers.vue";
import CardProject from "./../../components/Cards/Project/Card.vue";

// helpers
import { findIds } from "./../../storage/common/finds";

export default defineComponent({
  components: {
    SelectUsers,
    CardProject,
  },
  setup() {
    const projecPublictStore = ProjecPublictStore();
    const fileStore = FileStore();

    const loadProjects = async (userId: string, page: string) => {
      projecPublictStore.userId = userId;
      await projecPublictStore.apiFetch(false, userId, page);
      const collectionIds: string[] = findIds(projecPublictStore.collection);
      await fileStore.apiGetMultiple({ ids: collectionIds });
    };

    const changePage = async () => {
      await projecPublictStore.loadPagePagination(projecPublictStore.userId);
    };

    const searchUser = async (id: string | undefined) => {
      if (id === undefined) {
        projecPublictStore.collection = [];
        return;
      }

      if (id !== undefined && id !== "") {
        await loadProjects(id, "1");
      }
    };

    return { projecPublictStore, fileStore, searchUser, changePage };
  },
});
</script>

<style scoped></style>

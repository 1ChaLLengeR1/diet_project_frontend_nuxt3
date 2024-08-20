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
import { defineComponent, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

// stores
import { ProjectStore } from "./../../../storage/project/project";
import { FileStore } from "./../../../storage/file/file";
import { AuthStore } from "./../../../storage/auth/auth";

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
    const route = useRoute();
    const router = useRouter();

    const projectStore = ProjectStore();
    const fileStore = FileStore();
    const authStore = AuthStore();

    const activeList = ref<boolean>(false);
    const page = ref<string>((route.query.page as string) || "1");

    const changePage = async () => {
      router.replace({
        query: {
          page: projectStore.pagination.currentPage,
        },
      });
      await projectStore.loadPagePagination();
    };

    const loadDatas = async () => {
      activeList.value = true;

      router.replace({
        query: {
          page: page.value,
        },
      });

      await projectStore.apiFetch();
      const collectionIds: string[] = findIds(projectStore.collection);
      await fileStore.apiGetMultiple({ ids: collectionIds });

      activeList.value = false;
    };

    const runActions = async () => {
      await loadDatas();
    };

    runActions();

    watch(authStore, async () => {
      await runActions();
    });

    return { projectStore, fileStore, activeList, changePage };
  },
});
</script>

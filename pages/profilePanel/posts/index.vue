<template>
  <div class="w-full h-full flex flex-col gap-3 p-3">
    <ProfileTab />
    <div class="w-full flex justify-end sm:justify-center">
      <div class="w-full sm:w-[400px]">
        <SelectProject @search-project-id="searchProjectId" />
      </div>
    </div>
    <ListPost
      v-if="postStore.collection.length > 0"
      :posts="postStore.collection"
    />
    <v-pagination
      v-if="
        postStore.pagination.totalPages > 1 && postStore.collection.length > 0
      "
      v-model="postStore.pagination.currentPage"
      @click="changePage"
      :length="postStore.pagination.totalPages"
      next-icon="mdi-menu-right"
      prev-icon="mdi-menu-left"
    ></v-pagination>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

// components
import ProfileTab from "./../../../components/Tabs/ProfilePanel/Profile.vue";
import ListPost from "./../../../components/Lists/ProfilePanel/PostList.vue";
import SelectProject from "./../../../components/Selects/SelectProject.vue";

// stores
import { PostStore } from "./../../../storage/post/post";

export default defineComponent({
  components: {
    ProfileTab,
    ListPost,
    SelectProject,
  },
  setup() {
    const postStore = PostStore();
    const projectId = ref<string>("");

    const searchProjectId = async (id: string) => {
      if (id !== undefined) {
        projectId.value = id;
        await postStore.apiFetch(true, 1, id);
      } else {
        postStore.collection = [];
      }
    };

    const changePage = async () => {
      await postStore.loadPagePagination(projectId.value);
    };

    return { postStore, searchProjectId, changePage };
  },
});
</script>

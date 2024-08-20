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
import { useRoute, useRouter } from "vue-router";

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
    const route = useRoute();
    const router = useRouter();
    const postStore = PostStore();
    const projectId = ref<string>("");
    const page = ref<string>((route.query.page as string) || "1");

    const searchProjectId = async (id: string) => {
      if (id !== undefined) {
        projectId.value = id;
        router.replace({ query: { page: page.value } });
        await postStore.apiFetch(true, parseInt(page.value), id);
      } else {
        page.value = "1";
        router.replace({ query: undefined });
        postStore.collection = [];
      }
    };

    const changePage = async () => {
      router.replace({
        query: {
          page: postStore.pagination.currentPage,
        },
      });
      await postStore.loadPagePagination(projectId.value);
    };

    return { postStore, searchProjectId, changePage };
  },
});
</script>

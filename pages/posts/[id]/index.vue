<template>
  <div class="w-full h-full flex flex-col gap-3 p-3">
    <ListPostPublic :posts="postPublicStore.collection" />
    <v-pagination
      v-if="
        postPublicStore.pagination.totalPages > 1 &&
        postPublicStore.collection.length > 0
      "
      v-model="postPublicStore.pagination.currentPage"
      @click="changePage"
      :length="postPublicStore.pagination.totalPages"
      next-icon="mdi-menu-right"
      prev-icon="mdi-menu-left"
    ></v-pagination>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

// stores
import { PostPublicStore } from "./../../../storage/post/postPublic";

// components
import ListPostPublic from "./../../../components/Lists/Post/List.vue";
export default defineComponent({
  components: {
    ListPostPublic,
  },
  setup() {
    const postPublicStore = PostPublicStore();
    const route = useRoute();
    const router = useRouter();
    const projectId = ref<string>(route.params.id as string);
    const userId = ref<string>((route.query.userId as string) || "");
    const page = ref<string>((route.query.page as string) || "1");

    const loadDataPost = async () => {
      await postPublicStore.apiFetch(
        true,
        projectId.value,
        userId.value,
        page.value
      );
    };

    onMounted(async () => {
      router.replace({ query: { userId: userId.value, page: page.value } });
      postPublicStore.pagination.currentPage = parseInt(page.value);
      await loadDataPost();
    });

    const changePage = async () => {
      router.replace({
        query: {
          userId: userId.value,
          page: postPublicStore.pagination.currentPage,
        },
      });
      postPublicStore.loadPagePagination(userId.value, projectId.value);
    };

    return { postPublicStore, changePage };
  },
});
</script>

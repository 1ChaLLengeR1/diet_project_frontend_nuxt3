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
import { defineComponent, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { paths } from "./../../../utils/paths";

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

    const loadDataPost = async () => {
      await postPublicStore.apiFetch(false, route.params.id as string);
    };

    onMounted(async () => {
      await loadDataPost();
    });

    const changePage = async () => {};

    return { postPublicStore, changePage };
  },
});
</script>

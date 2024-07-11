<template>
  <v-card class="w-full">
    <v-list density="compact">
      <v-list-subheader>{{
        $t("lists.profilePanel.posts.days")
      }}</v-list-subheader>

      <v-list-item
        id="listProject"
        v-for="(post, index) in posts"
        :key="index"
        class="flex gap-3 cursor-auto hover:bg-gray-100"
      >
        <v-list-item-title>
          <div
            id="itemListPost"
            class="w-full flex justify-between items-center"
          >
            <p id="titlePost">
              {{ $t("lists.profilePanel.posts.day", { day: post.day }) }}
            </p>
            <div class="w-fit flex lg:flex-row flex-col gap-3">
              <v-btn id="changePost" @click="changePost(post.id)" color="blue">
                {{
                  $t("profilePanel.projectPanel.lists.posts.button.change")
                }}</v-btn
              >
              <ConfirmButton
                id="confirmButtonPostCard"
                text="tabs.confirmButton.post.text"
                title="tabs.confirmButton.post.title"
                openDialog="tabs.confirmButton.post.openDialog"
                confirmd="tabs.confirmButton.post.deleteButton"
                :nameValue="
                  $t('lists.profilePanel.posts.day', { day: post.day })
                "
                @delete-handler="deletePost(true, post.id)"
              />
            </div>
          </div>
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { paths } from "./../../../utils/paths";

// types
import type { CollectionPost } from "./../../../data/types/storage/post/types";

// components
import ConfirmButton from "./../../../components/Button/ConfirmButton.vue";

// stores
import { PostStore } from "./../../../storage/post/post";

export default defineComponent({
  props: {
    posts: {
      type: Array<CollectionPost>,
      required: true,
    },
  },
  components: {
    ConfirmButton,
  },
  setup() {
    const postStore = PostStore();
    const router = useRouter();

    const deletePost = async (confirmd: boolean, postId: string) => {
      if (confirmd) {
        await postStore.deletePostF(postId);
      }
    };

    const changePost = async (projectId: string) => {
      router.push({ path: `${paths.profilePanelPostChange}/${projectId}` });
    };

    return { deletePost, changePost };
  },
});
</script>

<style scoped></style>

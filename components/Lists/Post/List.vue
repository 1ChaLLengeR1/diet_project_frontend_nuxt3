<template>
  <v-card class="w-full">
    <v-list density="compact">
      <v-list-subheader>{{
        $t("lists.profilePanel.posts.days")
      }}</v-list-subheader>

      <v-list-item
        v-for="(post, index) in posts"
        :key="index"
        class="flex gap-3 cursor-auto hover:bg-gray-100"
      >
        <v-list-item-title>
          <div
            id="itemListPost"
            class="w-full flex justify-between items-center p-1"
          >
            <p>{{ $t("lists.profilePanel.posts.day", { day: post.day }) }}</p>
            <v-btn
              id="buttonSeePost"
              class="text-white"
              :color="colorsStore.main"
              @click="goTo(post.id)"
            >
              {{ $t("lists.posts.buttons.seePost") }}
            </v-btn>
          </div>
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter, useRoute } from "vue-router";

// types
import type { CollectionPost } from "./../../../data/types/storage/post/types";

// stores
import { ColorsStore } from "./../../../storage/colors/colors";

export default defineComponent({
  props: {
    posts: {
      type: Array<CollectionPost>,
      required: true,
    },
  },
  setup() {
    const router = useRouter();
    const route = useRoute();

    const colorsStore = ColorsStore();

    const goTo = (postId: string) => {
      router.push({ path: `${route.path}/post/${postId}` });
    };

    return { goTo, colorsStore };
  },
});
</script>

<style scoped></style>

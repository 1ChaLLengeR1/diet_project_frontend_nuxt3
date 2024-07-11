<template>
  <div class="w-full h-full flex p-3">
    <div v-if="!spinner" class="w-full flex flex-col gap-3">
      <div v-if="postOne.collection.length > 0" class="w-full flex gap-3">
        <ItemList id="day">
          {{
            $t("lists.profilePanel.posts.day", {
              day: postOne.collection[0].day,
            })
          }}
        </ItemList>
        <ItemList id="weight">
          {{
            $t("lists.profilePanel.posts.weight", {
              weight: postOne.collection[0].weight,
            })
          }}
        </ItemList>
        <ItemList id="kcal">
          {{
            $t("lists.profilePanel.posts.kcal", {
              kcal: postOne.collection[0].kcal,
            })
          }}
        </ItemList>
      </div>
      <v-card
        v-if="
          postOne.collectionTraining !== null &&
          postOne.collectionTraining.length > 0
        "
        class="w-full"
      >
        <v-list density="compact">
          <v-list-subheader>{{
            $t("lists.profilePanel.posts.training")
          }}</v-list-subheader>

          <v-list-item
            v-for="(training, index) in postOne.collectionTraining"
            :key="index"
            class="flex gap-3 cursor-auto hover:bg-gray-100"
          >
            <v-list-item-title>
              <div
                class="w-full flex flex-wrap justify-between items-center p-1"
              >
                <ItemList id="typeTraining">
                  {{
                    $t("lists.profilePanel.posts.typeTraining", {
                      typeTraining: findTypeTraining(training.type),
                    })
                  }}
                </ItemList>
                <ItemList id="timeTraining">
                  {{
                    $t("lists.profilePanel.posts.timeTraining", {
                      timeTraining: formatTime(training.time),
                    })
                  }}
                </ItemList>
                <ItemList id="kcalTraining">
                  {{
                    $t("lists.profilePanel.posts.kcalTraining", {
                      kcalTraining: training.kcal,
                    })
                  }}
                </ItemList>
              </div>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card>
      <v-carousel
        v-if="files.length > 0"
        cycle
        hide-delimiter-background
        :continuous="false"
        :show-arrows="false"
        class="rounded-lg"
      >
        <v-carousel-item
          v-for="(image, index) in files"
          :key="index"
          :src="image"
          height="100%"
          class="bg-orange-300"
        ></v-carousel-item>
      </v-carousel>
      <div v-if="postOne.collection.length > 0" class="w-full flex justify-end">
        <v-btn class="w-fit" @click="goTo">
          {{ $t("lists.posts.buttons.posts") }}
        </v-btn>
      </div>
    </div>
    <SpinnerGlobal v-else />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

// stores
import { PostPublicStore } from "./../../../../../storage/post/postPublic";
import { FileStore } from "./../../../../../storage/file/file";

// components
import ItemList from "./../../../../../components/Lists/Post/ItemList.vue";
import SpinnerGlobal from "./../../../../../components/Spinners/SpinnerGlobal.vue";

// types
import type { CollectionOnePost } from "./../../../../../data/types/storage/post/types";

// helpers
import { formatTime } from "./../../../../../storage/common/formaters";
import { findTypeTraining } from "./../../../../../storage/common/finds";

export default defineComponent({
  components: {
    ItemList,
    SpinnerGlobal,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const fileStore = FileStore();
    const postPublicStore = PostPublicStore();

    const files = ref<string[]>([]);
    const postOne = ref<CollectionOnePost>({
      collection: [],
      collectionTraining: [],
    });
    const id = ref<string>(route.params.id1 as string);
    const spinner = ref<boolean>(false);

    const loadPotoData = async () => {
      spinner.value = true;
      const post = await postPublicStore.apiFetchOne(id.value);
      if (post?.collection) {
        postOne.value = post;
      }

      fileStore.collectionMultiple = [];
      await fileStore.apiGetMultiple({ ids: [id.value] });

      if (
        fileStore.collectionMultiple &&
        fileStore.collectionMultiple.length > 0
      ) {
        fileStore.collectionMultiple.forEach((image) => {
          files.value.push(image.url);
        });
      }
      spinner.value = false;
    };

    onMounted(async () => {
      setTimeout(async () => {
        await loadPotoData();
      }, 500);
    });

    const goTo = () => {
      router.go(-1);
    };

    return { files, postOne, spinner, formatTime, findTypeTraining, goTo };
  },
});
</script>

<style scoped></style>

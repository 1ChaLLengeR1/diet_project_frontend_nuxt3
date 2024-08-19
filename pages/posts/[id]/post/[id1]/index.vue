<template>
  <div class="w-full h-full flex p-3">
    <div v-if="!spinner" class="w-full flex flex-col gap-3">
      <InformationDay
        v-if="postOne.collection.length > 0"
        :day="postOne.collection[0].day"
        :weight="postOne.collection[0].weight"
        :kcal="postOne.collection[0].kcal"
      />
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
            class="flex hover:bg-gray-100"
          >
            <v-list-item-title>
              <div
                class="w-full flex flex-wrap justify-between items-center gap-1 p-1 bg-main"
              >
                <ItemInformation
                  color="white"
                  :width="widthItemInformation"
                  :colorText="colorsStore.main"
                >
                  {{
                    $t("lists.profilePanel.posts.typeTraining", {
                      typeTraining: findTypeTraining(training.type),
                    })
                  }}
                </ItemInformation>
                <ItemInformation
                  color="white"
                  :width="widthItemInformation"
                  :colorText="colorsStore.main"
                >
                  {{
                    $t("lists.profilePanel.posts.timeTraining", {
                      timeTraining: formatTime(training.time),
                    })
                  }}
                </ItemInformation>
                <ItemInformation
                  color="white"
                  :width="widthItemInformation"
                  :colorText="colorsStore.main"
                >
                  {{
                    $t("lists.profilePanel.posts.kcalTraining", {
                      kcalTraining: training.kcal,
                    })
                  }}
                </ItemInformation>
              </div>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card>
      <v-card class="w-full">
        <v-list>
          <v-list-subheader>{{
            $t("lists.profilePanel.posts.images")
          }}</v-list-subheader>
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
              width="100%"
            ></v-carousel-item>
          </v-carousel>
        </v-list>
      </v-card>

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
import { defineComponent, ref, onMounted, onBeforeUnmount } from "vue";
import { useRoute, useRouter } from "vue-router";
import _ from "lodash";

// stores
import { PostPublicStore } from "./../../../../../storage/post/postPublic";
import { FileStore } from "./../../../../../storage/file/file";
import { ColorsStore } from "./../../../../../storage/colors/colors";

// components
import SpinnerGlobal from "./../../../../../components/Spinners/SpinnerGlobal.vue";
import InformationDay from "./../../../../../components/Lists/Post/InformationDay.vue";
import ItemInformation from "./../../../../../components/Lists/Post/ItemInformation.vue";

// types
import type { CollectionOnePost } from "./../../../../../data/types/storage/post/types";

// helpers
import { formatTime } from "./../../../../../storage/common/formaters";
import { findTypeTraining } from "./../../../../../storage/common/finds";

export default defineComponent({
  components: {
    SpinnerGlobal,
    InformationDay,
    ItemInformation,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const fileStore = FileStore();
    const postPublicStore = PostPublicStore();
    const colorsStore = ColorsStore();

    const files = ref<string[]>([]);
    const postOne = ref<CollectionOnePost>({
      collection: [],
      collectionTraining: [],
    });
    const id = ref<string>(route.params.id1 as string);
    const spinner = ref<boolean>(false);
    const widthItemInformation = ref<string>("320px");

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

    const checkScreenWidth = _.throttle(() => {
      widthItemInformation.value = window.innerWidth >= 1280 ? "320px" : "100%";
      console.log(widthItemInformation.value);
    }, 200);

    onMounted(async () => {
      window.addEventListener("resize", checkScreenWidth);
      checkScreenWidth();

      setTimeout(async () => {
        await loadPotoData();
      }, 500);
    });

    onBeforeUnmount(() => {
      window.removeEventListener("resize", checkScreenWidth);
    });

    const goTo = () => {
      router.go(-1);
    };

    return {
      files,
      postOne,
      spinner,
      colorsStore,
      widthItemInformation,
      formatTime,
      findTypeTraining,
      goTo,
    };
  },
});
</script>

<style scoped></style>

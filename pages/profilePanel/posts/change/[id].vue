<template>
  <div class="w-full flex flex-col gap-3 p-3">
    <ProfileTab />
    <EditPost
      v-if="loadDatas"
      :day="dataFrom.day"
      :weight="dataFrom.weight"
      :kcal="dataFrom.kcal"
      :selectProject="dataFrom.selectProject"
      :collectionTraining="dataFrom.collectionTraining"
      :filesUrl="filesUrl"
      @handler-form="handlerForm"
      @handler-remove-file="handlerRemoveFile"
    />
    <LoadingSpinnerForm v-else />
  </div>
</template>

<script lang="ts">
import { defineComponent, watch, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { paths } from "./../../../../utils/paths";

// components
import ProfileTab from "./../../../../components/Tabs/ProfilePanel/Profile.vue";
import AutoGenerateFrom from "./../../../../components/Forms/AutoGenerate.vue";
import EditPost from "./../../../../components/Forms/profilePanel/post/EditPost.vue";
import LoadingSpinnerForm from "./../../../../components/Spinners/SpinnerForms.vue";

// stores
import { PostStore } from "./../../../../storage/post/post";
import { FileStore } from "./../../../../storage/file/file";

// schema json form
import change_post from "./../../../../__forms__/posts/change_post.json";

// types
import type {
  ChnagePost,
  collectionTraining,
} from "./../../../../data/types/storage/post/types";

import type { FilesAdd } from "./../../../../data/types/storage/file/types";
import type { training } from "./../../../../data/types/storage/training/types";

// helpers
import { formatTime } from "./../../../../storage/common/formaters";

export default defineComponent({
  components: {
    ProfileTab,
    AutoGenerateFrom,
    EditPost,
    LoadingSpinnerForm,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const fileStore = FileStore();
    const postStore = PostStore();

    const loadDatas = ref<boolean>(false);
    const id = ref<string>(route.params.id as string);

    const dataFrom = ref<ChnagePost>({
      selectProject: "",
      day: 0,
      kcal: 0,
      weight: 0,
      collectionTraining: [],
    });
    const filesUrl = ref<
      {
        id: string;
        name: string;
        url: string;
        folder: string;
      }[]
    >([]);

    const runActions = async () => {
      loadDatas.value = false;

      const post = await postStore.apiFetchOne(id.value);
      const file = await fileStore.apiFetchOne(id.value);

      if (file !== null && file.length > 0) {
        file.forEach((image) => {
          filesUrl.value.push({
            id: image.id,
            name: image.name,
            url: image.url,
            folder: image.folder,
          });
        });
      }

      if (post !== null && post.collection) {
        dataFrom.value.day = parseInt(post.collection.day.toString(), 10);
        dataFrom.value.kcal = parseInt(post.collection.kcal.toString(), 10);
        dataFrom.value.weight = parseFloat(post.collection.weight.toString());
        dataFrom.value.selectProject = post.collection.projectId;
        if (post.collectionTraining) {
          dataFrom.value.collectionTraining = post.collectionTraining.map(
            (item) => ({
              ...item,
              time: formatTime(item.time),
            })
          );
        }
      }
      loadDatas.value = true;
    };

    const handlerForm = async (dataForm: any) => {
      const changePost: ChnagePost = {
        day: parseInt(dataForm.day),
        kcal: parseInt(dataForm.kcal),
        weight: parseFloat(dataForm.weight),
        selectProject: dataForm.selectProject,
        collectionTraining: [],
        collectionTrainingChange: [],
        removeIds: [],
      };
      const collectionTraining: collectionTraining[] | undefined =
        dataFrom.value.collectionTraining;
      const files: FilesAdd[] = [];

      // added new training
      if (dataForm.collectionTraining.length > 0) {
        dataForm.collectionTraining.forEach((item: training) => {
          if (item.id) {
            changePost.collectionTrainingChange?.push({
              ...item,
              kcal: parseInt(item.kcal.toString(), 10),
            });
          } else if (item.type && item.time && item.kcal) {
            changePost.collectionTraining?.push({
              ...item,
              kcal: parseInt(item.kcal.toString(), 10),
            });
          }
        });
      }

      // mechanics to filter removeTraining
      const removedIds = (collectionTraining ?? [])
        .map((originalItem) => originalItem.id)
        .filter(
          (id): id is string =>
            !dataForm.collectionTraining.some(
              (updatedItem: collectionTraining) => updatedItem.id === id
            )
        );

      changePost.removeIds = removedIds;

      // mechanics of added photos
      for (const key in dataForm) {
        if (dataForm[key] instanceof File === true) {
          let folder: string = `Day_${dataForm.day}`;
          for (const image of filesUrl.value) {
            folder = image.folder;
          }

          files.push({
            file: dataForm[key],
            name: key,
            folder: folder,
          });
        }
      }

      await postStore.changePostF(id.value, changePost, files);
      await postStore.apiFetch(true, 1, changePost.selectProject);
      setTimeout(() => {
        router.push({ path: paths.profilePanelPosts });
      }, 1000);
    };

    const handlerRemoveFile = async (url: string) => {
      const fileId = filesUrl.value.find((item) => item.url === url);
      if (fileId !== undefined) {
        await fileStore.deleteImageF(fileId.id);
      }
    };

    onMounted(async () => {
      setTimeout(async () => {
        await runActions();
      }, 500);
    });

    return {
      change_post,
      loadDatas,
      dataFrom,
      filesUrl,
      handlerForm,
      handlerRemoveFile,
    };
  },
});
</script>

<style scoped></style>

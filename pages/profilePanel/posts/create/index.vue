<template>
  <div class="w-full flex flex-col gap-3 p-3">
    <ProfileTab />
    <AutoGenerateFrom :schemaJson="createForm" @handler-form="handlerForm" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import _ from "lodash";
import { useRouter } from "vue-router";
import { paths } from "./../../../../utils/paths";

// components
import ProfileTab from "./../../../../components/Tabs/ProfilePanel/Profile.vue";
import AutoGenerateFrom from "./../../../../components/Forms/AutoGenerate.vue";

// schema json form
import create_post from "./../../../../__forms__/posts/create_post.json";
import create_post_rwd from "./../../../../__forms__/posts/create_post_rwd.json";

// types
import type { CreatePost } from "./../../../../data/types/storage/post/types";

// stores
import { PostStore } from "./../../../../storage/post/post";
import { ProfilePanelStore } from "./../../../../storage/profilePanel/profilePanel";

export default defineComponent({
  components: {
    ProfileTab,
    AutoGenerateFrom,
  },
  setup() {
    const postStore = PostStore();
    const profilePanelStore = ProfilePanelStore();
    const router = useRouter();
    const createForm = ref<any>(create_post);

    const checkScreenWidth = _.throttle(() => {
      createForm.value =
        window.innerWidth >= 768 ? create_post : create_post_rwd;
    }, 200);

    onMounted(() => {
      window.addEventListener("resize", checkScreenWidth);
      checkScreenWidth();
    });

    const handlerForm = async (formValues: any) => {
      const post: CreatePost = {
        day: parseInt(formValues.day),
        kcal: parseInt(formValues.kcal),
        weight: parseFloat(formValues.weight),
        collectionTraining: [],
      };

      formValues.trainingCollection.forEach(
        (element: { type: string; time: string; kcal: string | number }) => {
          post.collectionTraining?.push({
            type: element.type,
            time: element.time,
            kcal: parseInt(element.kcal as string),
          });
        }
      );

      const arrayFiles: { name: string; file: File }[] = [
        {
          name: "fileFigure",
          file: formValues.fileFigure,
        },
        {
          name: "fileKcal",
          file: formValues.fileKcal,
        },
        {
          name: "fileTraining",
          file: formValues.fileTraining,
        },
        {
          name: "fileWeight",
          file: formValues.fileWeight,
        },
      ];
      const projectId: string = formValues.selectProject;

      await postStore.createPostF(projectId, post, arrayFiles);
      profilePanelStore.saveTab("posts");
      router.push({ path: paths.profilePanelPosts });
    };

    return { createForm, handlerForm };
  },
});
</script>

<template>
  <div class="w-full flex flex-col gap-3 p-3">
    <ProfileTab />
    <AutoGenerateFrom
      v-if="loadDatas"
      :schemaJson="change_project"
      typeButton="change"
      :loadForm="true"
      :dataForm="dataFrom"
      @handler-form="handlerForm"
      @handler-deleteImage="handlerDeleteImage"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { useRoute } from "vue-router";

// components
import ProfileTab from "./../../../../components/Tabs/ProfilePanel/Profile.vue";
import AutoGenerateFrom from "./../../../../components/Forms/AutoGenerate.vue";

// stores
import { ProjectStore } from "./../../../../storage/project/project";
import { FileStore } from "./../../../../storage/file/file";

// schema json form
import change_project from "./../../../../__forms__/projects/change_project.json";

// types
import type { FormProject } from "./../../../../data/types/storage/project/types";

export default defineComponent({
  components: {
    ProfileTab,
    AutoGenerateFrom,
  },
  setup() {
    const route = useRoute();
    const projectStore = ProjectStore();
    const fileStore = FileStore();

    const loadDatas = ref<boolean>(false);
    const fileId = ref<string>("");
    const fileFolder = ref<string>("");
    const id = ref<string>(route.params.id as string);

    const dataFrom = ref<{
      title: string;
      description: string;
      fileProject: string;
    }>({ title: "", description: "", fileProject: "" });

    onMounted(async () => {
      loadDatas.value = false;

      const project = await projectStore.apiFetchOne(id.value);
      const file = await fileStore.apiFetchOne(id.value);

      fileId.value = file?.id!;
      fileFolder.value = file?.folder!;

      dataFrom.value.title = project?.title!;
      dataFrom.value.description = project?.description!;
      dataFrom.value.fileProject = file?.url!;

      loadDatas.value = true;
    });

    const handlerForm = async (dataForm: any) => {
      const body: FormProject = {
        title: dataForm.title,
        description: dataForm.description,
        file: dataForm.fileProject,
        fileFolder: fileFolder.value,
      };

      await projectStore.changeProjectF(id.value, body);
    };

    const handlerDeleteImage = async () => {
      await fileStore.deleteImageF(fileId.value);
    };

    return {
      change_project,
      dataFrom,
      loadDatas,
      handlerForm,
      handlerDeleteImage,
    };
  },
});
</script>

<style scoped></style>

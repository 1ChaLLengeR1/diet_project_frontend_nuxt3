<template>
  <div class="w-full flex flex-col gap-3 p-3">
    <ProfileTab />
    <AutoGenerateFrom
      :schemaJson="create_project"
      @handler-form="handlerForm"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// components
import ProfileTab from "./../../../../components/Tabs/ProfilePanel/Profile.vue";
import AutoGenerateFrom from "./../../../../components/Forms/AutoGenerate.vue";

// schema json form
import create_project from "./../../../../__forms__/projects/create_project.json";

// stores
import { ProjectStore } from "./../../../../storage/project/project";

// types
import type { FormProject } from "./../../../../data/types/storage/project/types";

export default defineComponent({
  components: {
    ProfileTab,
    AutoGenerateFrom,
  },
  setup() {
    const projectStore = ProjectStore();

    const handlerForm = async (formValues: any) => {
      const body: FormProject = {
        title: formValues.title,
        description: formValues.description,
        file: formValues.fileProject,
      };
      await projectStore.createProjectF(body);
    };

    return { create_project, handlerForm };
  },
});
</script>

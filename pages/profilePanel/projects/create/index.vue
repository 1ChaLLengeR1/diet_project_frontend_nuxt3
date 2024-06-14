<template>
  <div class="w-full flex flex-col gap-3 p-3">
    <ProfileTab />
    <InformationProject />
    <AutoGenerateFrom
      :schemaJson="create_project"
      @handler-form="handlerForm"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { paths } from "./../../../../utils/paths";

// components
import ProfileTab from "./../../../../components/Tabs/ProfilePanel/Profile.vue";
import AutoGenerateFrom from "./../../../../components/Forms/AutoGenerate.vue";
import InformationProject from "./../../../../components/ProfilePanel/Projects/Create/Information.vue";

// schema json form
import create_project from "./../../../../__forms__/projects/create_project.json";

// stores
import { ProjectStore } from "./../../../../storage/project/project";
import { ProfilePanelStore } from "./../../../../storage/profilePanel/profilePanel";

// types
import type { FormProject } from "./../../../../data/types/storage/project/types";

export default defineComponent({
  components: {
    ProfileTab,
    AutoGenerateFrom,
    InformationProject,
  },
  setup() {
    const projectStore = ProjectStore();
    const profilePanelStore = ProfilePanelStore();
    const router = useRouter();

    const handlerForm = async (formValues: any) => {
      const body: FormProject = {
        title: formValues.title,
        description: formValues.description,
        file: formValues.fileProject,
      };
      await projectStore.createProjectF(body);
      projectStore.collection = [];
      profilePanelStore.saveTab("projects");
      router.push({ path: paths.profilePanelProject });
    };

    return { create_project, handlerForm };
  },
});
</script>

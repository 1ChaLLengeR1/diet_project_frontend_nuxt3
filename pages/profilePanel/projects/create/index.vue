<template>
  <div class="w-full flex flex-col gap-3 p-3">
    <ProfileTab />
    <AutoGenerateFrom :schemaJson="create_project" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// components
import ProfileTab from "./../../../../components/Tabs/ProfilePanel/Profile.vue";
import AutoGenerateFrom from "./../../../../components/Forms/AutoGenerate.vue";

// schema json form
import create_project from "./../../../../__forms__/projects/create_project.json";

export default defineComponent({
  components: {
    ProfileTab,
    AutoGenerateFrom,
  },
  setup() {
    return { create_project };
  },
});
</script>

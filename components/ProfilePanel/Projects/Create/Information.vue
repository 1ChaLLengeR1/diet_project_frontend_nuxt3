<template>
  <v-alert
    class="w-full"
    color="info"
    icon="$info"
    :title="$t('profilePanel.projectPanel.createProject.title')"
    :text="$t('profilePanel.projectPanel.createProject.description')"
  ></v-alert>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return {};
  },
});
</script>

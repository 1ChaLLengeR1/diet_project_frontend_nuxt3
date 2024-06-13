<template>
  <div class="w-full flex flex-col gap-3 p-3">
    <ProfileTab />
    <ul class="w-full flex justify-center flex-wrap gap-3">
      <CardProject
        v-for="(item, index) in projectStore.collection"
        :key="index"
        :id="item.id"
        :title="item.title"
        :description="item.description"
        :updateUp="item.updateUp"
      />
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";

// stores
import { ProjectStore } from "./../../../storage/project/project";

// components
import ProfileTab from "./../../../components/Tabs/ProfilePanel/Profile.vue";
import CardProject from "./../../../components/Cards/ProfileProject/Card.vue";

export default defineComponent({
  components: {
    ProfileTab,
    CardProject,
  },
  setup() {
    const projectStore = ProjectStore();
    onMounted(async () => {
      await projectStore.apiFetch();
    });

    return { projectStore };
  },
});
</script>

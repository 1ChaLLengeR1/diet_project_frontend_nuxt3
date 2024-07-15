<template>
  <v-card
    id="itemProject"
    class="w-[380px] h-fit"
    :border="true"
    max-width="380"
  >
    <v-img
      class="align-end text-white"
      height="200"
      :src="img !== null ? img : noImage"
      cover
    >
      <v-card-title class="text-main">
        {{ formatDateTime(updateUp) }}
      </v-card-title>
    </v-img>

    <v-card-subtitle class="pt-4 text-main">
      <p id="titleCard" class="font-bold">{{ title }}</p>
    </v-card-subtitle>

    <v-card-actions>
      <v-btn
        color="orange-lighten-2"
        :text="$t('tabs.confirmButton.default.buttons.description')"
      ></v-btn>

      <v-spacer></v-spacer>

      <v-btn
        :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
        @click="show = !show"
      ></v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text>
          {{ description }}
        </v-card-text>
      </div>
    </v-expand-transition>

    <v-card-actions class="w-full flex justify-between">
      <div class="flex flex-col gap-3">
        <v-btn id="changeProjectCard" @click="changeProject(id)" color="blue">
          {{ $t("profilePanel.projectPanel.cards.button.change") }}</v-btn
        >
        <v-btn
          id="changeProjectCard"
          @click="downloadProject(id)"
          color="green"
        >
          {{ $t("profilePanel.projectPanel.cards.button.downoload") }}</v-btn
        >
      </div>

      <ConfirmButton
        id="confirmButtonProjectCard"
        text="tabs.confirmButton.project.text"
        title="tabs.confirmButton.project.title"
        openDialog="tabs.confirmButton.project.openDialog"
        confirmd="tabs.confirmButton.project.deleteButton"
        :nameValue="title"
        @delete-handler="deleteProject(true, id)"
      />
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import noImage from "./../../../public/images/noImage.png";

// components
import ConfirmButton from "./../../../components/Button/ConfirmButton.vue";

// helper
import { formatDateTime } from "./../../../storage/common/formaters";
import { paths } from "./../../../utils/paths";

// stores
import { ProjectStore } from "./../../../storage/project/project";
import { FileStore } from "./../../../storage/file/file";

export default defineComponent({
  props: {
    id: {
      type: String,
      required: true,
    },
    img: {
      type: String || null || undefined,
      required: false,
      default: null,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    updateUp: {
      type: String,
      required: true,
    },
  },
  components: {
    ConfirmButton,
  },
  setup() {
    const projectStore = ProjectStore();
    const fileStore = FileStore();

    const show = ref<boolean>(false);
    const router = useRouter();

    const changeProject = async (id: string) => {
      router.push({ path: `${paths.profilePanelProjectChange}/${id}` });
    };

    const downloadProject = async (projectId: string) => {
      await fileStore.downoladProject(projectId);
    };

    const deleteProject = async (confirmd: boolean, id: string) => {
      if (confirmd) {
        await projectStore.deleteProjectF(id);
        await projectStore.apiFetch(true, 1);
      }
    };
    return {
      noImage,
      show,
      changeProject,
      deleteProject,
      formatDateTime,
      downloadProject,
    };
  },
});
</script>

<style scoped></style>

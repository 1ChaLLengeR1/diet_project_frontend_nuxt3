<template>
  <v-card class="w-max-[400px]" :border="true" max-width="400">
    <v-img class="align-end text-white" height="200" :src="noImage" cover>
      <v-card-title class="text-black">
        {{ formatDateTime(updateUp) }}
      </v-card-title>
    </v-img>

    <v-card-subtitle class="pt-4 text-main">
      <p class="font-bold">{{ title }}</p>
    </v-card-subtitle>

    <v-card-text>
      <p class="text-main">{{ description }}</p>
    </v-card-text>

    <v-card-actions>
      <v-btn @click="changeProject(id)" color="blue">
        {{ $t("profilePanel.projectPanel.cards.button.change") }}</v-btn
      >
      <ConfirmButton
        text="confirmButton.project.text"
        title="confirmButton.project.title"
        openDialog="confirmButton.project.openDialog"
        confirmd="confirmButton.project.deleteButton"
        :nameValue="title"
        @delete-handler="deleteProject(true, id)"
      />
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import noImage from "./../../../public/images/noImage.png";

// components
import ConfirmButton from "./../../../components/Button/ConfirmButton.vue";

// helper
import { formatDateTime } from "./../../../storage/common/formaters";

// stores
import { ProjectStore } from "./../../../storage/project/project";

export default defineComponent({
  props: {
    id: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: false,
      defult: noImage,
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

    const changeProject = async (id: string) => {
      console.log(id);
    };

    const deleteProject = async (confirmd: boolean, id: string) => {
      if (confirmd) {
        await projectStore.deleteProjectF(id);
      }
    };
    return { noImage, changeProject, deleteProject, formatDateTime };
  },
});
</script>

<style scoped></style>

<template>
  <v-card class="w-max-[400px]" max-width="400">
    <v-img class="align-end text-white" height="200" :src="noImage" cover>
      <v-card-title class="text-black">{{
        formatDateTime(updateUp)
      }}</v-card-title>
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
      <v-btn @click="deleteProject(id)" color="red">{{
        $t("profilePanel.projectPanel.cards.button.delete")
      }}</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import noImage from "./../../../public/images/noImage.png";

import { formatDateTime } from "./../../../storage/common/formaters";

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
  setup() {
    const changeProject = async (id: string) => {
      console.log(id);
    };

    const deleteProject = async (id: string) => {
      console.log(id);
    };
    return { noImage, changeProject, deleteProject, formatDateTime };
  },
});
</script>

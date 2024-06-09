<template>
  <v-carousel hide-delimiters :show-arrows="false" cycle height="100%">
    <v-carousel-item
      v-for="(image, index) in images"
      :key="index"
      :src="image"
      cover
    ></v-carousel-item>
  </v-carousel>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    images: {
      type: Array<String>,
      required: true,
    },
  },
  setup() {
    return {};
  },
});
</script>

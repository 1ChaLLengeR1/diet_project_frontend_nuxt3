<template>
  <div class="w-full h-100% flex">
    <CarouselHome :images="images" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

// components
import CarouselHome from "./../components/Carousel/CaroselHome.vue";
import imageBike from "./../public/images/bike.jpg";
import imageRun from "./../public/images/run.jpg";
import imageSwim from "./../public/images/swim.jpg";

export default defineComponent({
  components: {
    CarouselHome,
  },
  setup() {
    const images = ref<string[]>([]);

    images.value = [imageBike, imageRun, imageSwim];

    return { images };
  },
});
</script>

<template>
  <div class="relative w-full h-screen flex">
    <CarouselHome v-if="onCarousel" :images="images" />
    <Banner />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import _ from "lodash";

// components
import CarouselHome from "./../../components/Carousel/CaroselHome.vue";
import Banner from "./components/Banner.vue";

// images
import imageBike from "./../../public/images/bike.jpg";
import imageRun from "./../../public/images/run.jpg";
import imageSwim from "./../../public/images/swim.jpg";

export default defineComponent({
  components: {
    CarouselHome,
    Banner,
  },
  setup() {
    const onCarousel = ref<boolean>(false);
    const images = ref<string[]>([]);
    images.value = [imageBike, imageRun, imageSwim];

    const checkScreenWidth = _.throttle(() => {
      onCarousel.value = window.innerWidth >= 1700 ? true : false;
    }, 200);

    onMounted(() => {
      window.addEventListener("resize", checkScreenWidth);
      checkScreenWidth();
    });

    return { images, onCarousel };
  },
});
</script>

<style scoped></style>

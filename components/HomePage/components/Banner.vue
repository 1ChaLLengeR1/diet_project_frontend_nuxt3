<template>
  <div class="absolute z-10 w-full h-full p-7">
    <div
      class="w-full h-full flex flex-col rounded-xl p-6 backdrop-blur-sm bg-black/60 shadow-lg space-y-4 text-white"
      :class="[{ 'overflow-auto': onOverFlow }]"
    >
      <h1 class="text-2xl font-bold text-main">{{ $t("banner.h1") }}</h1>
      <h2 class="text-lg">
        {{ $t("banner.h2") }}
      </h2>
      <h3 class="text-lg font-semibold text-main">
        {{ $t("banner.h3") }}
      </h3>
      <h4 class="text-lg">
        {{ $t("banner.h4") }}
      </h4>
      <h5 class="text-lg font-semibold text-main">
        {{ $t("banner.h5") }}
      </h5>
      <ul class="list-disc list-inside space-y-2">
        <p class="font-medium">{{ $t("banner.p1") }}</p>
        <li v-for="(item, index) in listFrontend" :key="index">
          {{ $t(`${item}`) }}
        </li>
        <p class="font-medium">{{ $t("banner.p2") }}</p>
        <li v-for="(item, index) in listBackend" :key="index">
          {{ $t(`${item}`) }}
        </li>
      </ul>
      <h6 class="text-lg font-semibold text-main">{{ $t("banner.h6") }}</h6>
      <p class="text-lg">
        {{ $t("banner.p") }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import _ from "lodash";

export default defineComponent({
  setup() {
    const onOverFlow = ref<boolean>(false);

    const listFrontend = ref<string[]>([
      "banner.list.frontend.nuxt3",
      "banner.list.frontend.vuetify",
      "banner.list.frontend.vueForm",
      "banner.list.frontend.i18n",
      "banner.list.frontend.auth0",
      "banner.list.frontend.cypress",
    ]);
    const listBackend = ref<string[]>([
      "banner.list.backend.golang",
      "banner.list.backend.gin",
      "banner.list.backend.sql",
      "banner.list.backend.auth0",
      "banner.list.backend.postgresql",
    ]);

    const checkScreenWidth = _.throttle(() => {
      onOverFlow.value = window.innerWidth <= 1900 ? true : false;
    }, 200);

    onMounted(() => {
      window.addEventListener("resize", checkScreenWidth);
      checkScreenWidth();
    });

    return { listFrontend, listBackend, onOverFlow };
  },
});
</script>

<template>
  <footer class="sticky w-full bg-main text-center d-flex flex-column pb-1">
    <div>
      <v-btn
        v-for="(icon, index) in icons"
        :key="index"
        :icon="icon.icon"
        class="mx-4"
        color="white"
        variant="text"
        @click="goToPage(icon.link)"
      ></v-btn>
    </div>

    <div class="pt-0 text-white">
      <p>&copy; {{ $t("footer.info", { year: new Date().getFullYear() }) }}</p>
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    const icons = [
      {
        icon: "mdi-facebook",
        link: "https://www.facebook.com/profile.php?id=100008634312630",
      },
      { icon: "mdi-github", link: "https://github.com/1ChaLLengeR1" },
      {
        icon: "mdi-linkedin",
        link: "https://www.linkedin.com/in/artur-%C5%9Bcibor-9799ba276/",
      },
      {
        icon: "mdi-instagram",
        link: "https://www.instagram.com/artur.sciborr/",
      },
    ];

    const goToPage = (link: string) => {
      window.location.href = link;
    };

    return { icons, goToPage };
  },
});
</script>

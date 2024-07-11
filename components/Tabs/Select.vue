<template>
  <div class="w-fit">
    <v-menu v-if="links.length">
      <template v-slot:activator="{ props }">
        <v-btn
          class="align-self-center me-4"
          height="100%"
          rounded="0"
          variant="flat"
          v-bind="props"
        >
          {{ $t("tabs.select.pages") }}

          <v-icon icon="mdi-menu-down" end></v-icon>
        </v-btn>
      </template>

      <v-list class="bg-grey-lighten-3">
        <v-list-item
          v-for="(item, index) in links"
          :key="index"
          :title="$t(`${item.name}`)"
          @click="goToPage(item.path, item.value)"
        ></v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

// stores
import { ProfilePanelStore } from "./../../storage/profilePanel/profilePanel";

// types
import type { Tabs } from "./../../data/types/storage/profilePanel/types";

export default defineComponent({
  props: {
    links: {
      type: Array<Tabs>,
      required: true,
    },
  },
  setup() {
    const profilePanelStore = ProfilePanelStore();
    const router = useRouter();

    const goToPage = (path: string, value: string) => {
      profilePanelStore.saveTab(value);
      router.push({ path: path });
    };

    return { goToPage };
  },
});
</script>

<style scoped></style>

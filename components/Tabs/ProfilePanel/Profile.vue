<template>
  <v-card>
    <v-tabs id="profilePanelTabs" v-model="tab" :color="colorsStore.main">
      <div class="w-full flex justify-between">
        <div class="w-fit hidden sm:flex">
          <v-tab
            id="profilePanelTab"
            v-for="(tab, index) in profilePanelStore.tabs"
            :key="index"
            :value="tab.value"
            @click="goToPage(tab.path, tab.value)"
          >
            <NuxtLink :to="tab.path"> {{ $t(`${tab.name}`) }} </NuxtLink>
          </v-tab>
        </div>
        <SelectTab :links="profilePanelStore.tabs" class="sm:hidden" />
        <div class="w-fit flex">
          <v-tab
            id="profilePanelTab"
            v-for="(tab, index) in profilePanelStore.filterActiveCreateTabs(
              route.fullPath
            )"
            :key="index"
            :value="tab.value"
            @click="goToPage(tab.path, tab.value)"
          >
            <NuxtLink :to="tab.path"> {{ $t(`${tab.name}`) }} </NuxtLink>
          </v-tab>
        </div>
      </div>
    </v-tabs>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { paths } from "./../../../utils/paths";

// stores
import { ProfilePanelStore } from "./../../../storage/profilePanel/profilePanel";
import { ColorsStore } from "./../../../storage/colors/colors";

// components
import SelectTab from "./../Select.vue";

export default defineComponent({
  components: {
    SelectTab,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const tab = ref<string | null>(null);
    const profilePanelStore = ProfilePanelStore();
    const colorsStore = ColorsStore();

    const goToPage = (path: string, value: string) => {
      profilePanelStore.saveTab(value);
      router.push({ path: path });
    };

    onMounted(() => {
      tab.value = profilePanelStore.activeTab();
    });

    return {
      tab,
      profilePanelStore,
      colorsStore,
      paths,
      route,
      goToPage,
    };
  },
});
</script>

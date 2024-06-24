<template>
  <div class="w-full">
    <v-select
      id="selectUser"
      :label="loadSelectTitle"
      v-model="search"
      clearable
      :items="usersStore.filterSelect()"
      item-title="fullName"
      return-object
    ></v-select>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch, computed } from "vue";

// stores
import { UsersStore } from "./../../storage/user/user";

// types
import type { ItemFilter } from "./../../data/types/storage/user/types";

export default defineComponent({
  emits: ["search-user-id"],
  setup(_, ctx) {
    const { $i18n } = useNuxtApp();
    const usersStore = UsersStore();
    const search = ref<ItemFilter | null>({
      id: null,
      fullName: null,
    });
    search.value = null;

    onMounted(async () => {
      await usersStore.apiFetch();
    });

    watch(search, () => {
      ctx.emit("search-user-id", search.value?.id);
    });

    const loadSelectTitle = computed(() => {
      return $i18n.t("selects.selectUser.select");
    });

    return { usersStore, search, loadSelectTitle };
  },
});
</script>

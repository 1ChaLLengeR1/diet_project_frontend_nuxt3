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
import { ButtonsStore } from "./../../storage/buttons/buttons";

// types
import type { ItemFilter } from "./../../data/types/storage/user/types";

export default defineComponent({
  emits: ["search-user-id"],
  setup(_, ctx) {
    const { $i18n } = useNuxtApp();
    const usersStore = UsersStore();
    const buttonsStore = ButtonsStore();

    const search = ref<ItemFilter | null>({
      id: null,
      fullName: null,
    });

    onMounted(async () => {
      if (
        buttonsStore.selectUser.id === null ||
        buttonsStore.selectUser.id === undefined
      ) {
        search.value = null;
      }

      if (buttonsStore.selectUser.id !== null && search.value !== null) {
        search.value.id = buttonsStore.selectUser.id;
        search.value.fullName = buttonsStore.selectUser.fullName;
      }

      await usersStore.apiFetch();
    });

    watch(search, () => {
      buttonsStore.saveDataSelectUser(
        search.value?.id!,
        search.value?.fullName!
      );
      ctx.emit("search-user-id", search.value?.id);
    });

    const loadSelectTitle = computed(() => {
      return $i18n.t("selects.select.user");
    });

    return { usersStore, search, loadSelectTitle };
  },
});
</script>

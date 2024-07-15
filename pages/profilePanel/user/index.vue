<template>
  <div class="w-full flex flex-col gap-3 p-3">
    <ProfileTab />
    <v-alert
      v-if="onWarning"
      class="w-full"
      color="warning"
      icon="$warning"
      :title="$t('profilePanel.projectPanel.user.title')"
      :text="$t('profilePanel.projectPanel.user.description')"
    ></v-alert>
    <AutoGenerateFrom
      :schemaJson="change_user"
      typeButton="change"
      :loadForm="true"
      :dataForm="dataForm"
      @handler-form="handlerForm"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed } from "vue"; // stores

// stores
import { AuthStore } from "./../../../storage/auth/auth";
import { UsersStore } from "./../../../storage/user/user";

// components
import ProfileTab from "./../../../components/Tabs/ProfilePanel/Profile.vue";
import AutoGenerateFrom from "./../../../components/Forms/AutoGenerate.vue";

// schema_json
import change_user from "./../../../__forms__/user/change_user.json";

// types
import type { UserParams } from "./../../../data/types/storage/auth/types";
import type { ItemUser } from "./../../../data/types/storage/user/types";

export default defineComponent({
  components: {
    ProfileTab,
    AutoGenerateFrom,
  },
  setup() {
    const authStore = AuthStore();
    const usersStore = UsersStore();
    const onWarning = ref<boolean>(false);
    const dataForm = ref<UserParams>({
      email: "",
      userName: "",
      lastName: "",
      nickName: "",
      role: "",
    });

    const loadDataUser = async () => {
      dataForm.value.email = authStore.userParams.email;
      dataForm.value.userName = authStore.userParams.userName;
      dataForm.value.lastName = authStore.userParams.lastName;
      dataForm.value.nickName = authStore.userParams.nickName;
      dataForm.value.role = authStore.userParams.role;

      for (const key in dataForm.value) {
        if (dataForm.value[key] === "") {
          onWarning.value = true;
          return;
        }
        onWarning.value = false;
      }
    };
    loadDataUser();

    watch(authStore, () => {
      loadDataUser();
    });

    const handlerForm = async (formValue: any) => {
      const body: ItemUser = {
        email: formValue.email,
        userName: formValue.userName,
        lastName: formValue.lastName,
        nickName: formValue.nickName,
        role: formValue.role,
      };
      usersStore.changeUserParams(body);
    };

    return { change_user, dataForm, onWarning, handlerForm };
  },
});
</script>

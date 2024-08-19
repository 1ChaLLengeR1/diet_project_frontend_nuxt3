// general
import { defineStore } from "pinia";
import { ref } from "vue";

// types
import type {
  ItemUser,
  ItemFilter,
} from "./../../data/types/storage/user/types";

// api
import { collectionUsers } from "./../../api/users/fetch";
import { changeUser } from "./../../api/users/change";

// stores
import { AlertStore } from "./../../storage/alert/alert";
import { AuthStore } from "./../../storage/auth/auth";

export const UsersStore = defineStore("users", () => {
  const alertStore = AlertStore();
  const authStore = AuthStore();
  const { $i18n } = useNuxtApp();
  const collection = ref<ItemUser[]>([]);

  const apiFetch = async () => {
    if (collection.value.length > 0) {
      return;
    }

    const response = await collectionUsers();
    if (response !== null && response.collection) {
      let filteredCollection = response.collection;

      if (filteredCollection.length > 1) {
        filteredCollection = filteredCollection.filter(
          (user) => user.nickName !== "guest123@"
        );
      }

      filteredCollection.forEach((item) => {
        if (item.userName !== "" && item.userName !== null) {
          collection.value.push(item);
        }
      });
    }
  };

  const changeUserParams = async (body: ItemUser) => {
    const response = await changeUser(body);
    if (response !== null && response.collection) {
      alertStore.addToCollection(
        $i18n.t("alert.message.positive.user.change"),
        "positive"
      );
      authStore.userParams = response.collection[0];
      return;
    }
    alertStore.addToCollection(
      $i18n.t("alert.message.error.user.change"),
      "error"
    );
  };

  const filterSelect = (): ItemFilter[] => {
    return collection.value.map((user) => ({
      id: user.id,
      fullName: `${user.userName} - ${user.nickName}`,
    }));
  };

  return { collection, apiFetch, filterSelect, changeUserParams };
});

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

export const UsersStore = defineStore("users", () => {
  const collection = ref<ItemUser[]>([]);

  const apiFetch = async () => {
    if (collection.value.length > 0) {
      return;
    }

    const response = await collectionUsers();
    if (response !== null && response.collection) {
      response.collection.forEach((item) => {
        if (item.userName !== "" && item.userName !== null) {
          collection.value.push(item);
        }
      });
    }
  };

  const filterSelect = (): ItemFilter[] => {
    return collection.value.map((user) => ({
      id: user.id,
      fullName: `${user.userName} - ${user.nickName}`,
    }));
  };

  return { collection, apiFetch, filterSelect };
});

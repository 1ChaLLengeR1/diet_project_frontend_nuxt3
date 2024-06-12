//general
import { defineStore } from "pinia";
import { ref } from "vue";
import { useAuth0 } from "@auth0/auth0-vue";

//types
import type {
  ParamsAuth0,
  UserData,
} from "../../data/types/storage/auth/types";

export const AuthStore = defineStore("auth", () => {
  const {
    isAuthenticated,
    idTokenClaims,
    getAccessTokenSilently,
    logout,
    loginWithRedirect,
  } = useAuth0();

  const paramsAuth0 = ref<ParamsAuth0 | undefined>({
    aud: "",
    email: "",
    email_verified: false,
    exp: 0,
    iat: 0,
    iss: "",
    name: "",
    nickname: "",
    nonce: "",
    picture: "",
    sid: "",
    sub: "",
    updated_at: "",
    __raw: "",
    token: "",
  });

  const userData = ref<UserData>({
    name: "",
    nickname: "",
    sub: "",
  });

  const localStorageParamsAuth0 = ref<string>("paramsAuth0");
  const localStorageUserData = ref<string>("userData");

  const singIn = async () => {
    if (isAuthenticated.value) {
      await logout({
        logoutParams: {
          returnTo: window.location.origin,
        },
      });
      paramsAuth0.value = {} as ParamsAuth0;
      userData.value = {} as UserData;
      localStorage.removeItem(localStorageParamsAuth0.value);
      localStorage.removeItem(localStorageUserData.value);
      return;
    }
    await loginWithRedirect();
  };

  const loadDataAuth0 = async () => {
    if (!isAuthenticated.value) {
      return;
    }

    paramsAuth0.value = idTokenClaims.value;
    paramsAuth0.value.token = await getAccessTokenSilently();

    userData.value = {
      name: paramsAuth0.value?.email,
      nickname: paramsAuth0.value?.nickname,
      sub: paramsAuth0.value?.sub,
    };

    localStorage.setItem(
      localStorageParamsAuth0.value,
      JSON.stringify(paramsAuth0.value)
    );

    localStorage.setItem(
      localStorageUserData.value,
      JSON.stringify(userData.value)
    );
  };

  const populateDataUser = async (lvl: number = 0) => {
    if (lvl === 3) {
      console.error("Fetch data not working, data from Auth0");
      return;
    }

    if (!isAuthenticated.value && lvl < 3) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await populateDataUser(lvl + 1);
      return;
    }

    await loadDataAuth0();
  };

  const getTokenDataForApi = (): string => {
    return paramsAuth0.value?.token!;
  };

  const getUserDataForApi = (): UserData => {
    return userData.value;
  };

  return {
    paramsAuth0,
    singIn,
    populateDataUser,
    getTokenDataForApi,
    getUserDataForApi,
  };
});

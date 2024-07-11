// variables
const DEBUG_USER_TOKEN = false;
const DEBUG_LANG = false;
const DEBUG_USER_DATA = false;

// types
import type {
  ResponseFetch,
  OmitHeaders,
} from "./../../data/types/api/common/types";
import type { FetchOptions } from "ohmyfetch";

// stores
import { DictionaryStore } from "./../../storage/dictionary/dictionary";
import { AuthStore } from "./../../storage/auth/auth";

export async function apiPost(
  urlPath: string,
  body: object,
  method: "POST" | "PATCH" | "PUT" | "DELETE" = "POST",
  lvl: number = 0,
  omitHeaders: OmitHeaders = {
    AppLanguage: false,
    Authorization: false,
    UserData: false,
  }
) {
  const environment = useRuntimeConfig();
  const urlApi: string = environment.public.apiServer;
  const url: string = `${urlApi}${urlPath}`;
  const responseApi: ResponseFetch = { status: 0, ok: false, data: null };

  const dictionaryStore = DictionaryStore();
  const authStore = AuthStore();

  try {
    const headers: Headers = new Headers();

    if (dictionaryStore.getAppLanguage() !== "" && omitHeaders.AppLanguage) {
      headers.append("AppLanguage", `${dictionaryStore.getAppLanguage()}`);
      if (DEBUG_LANG) {
        console.info("lang id:", dictionaryStore.getAppLanguage());
      }
    }

    if (authStore.getTokenDataForApi() !== "" && omitHeaders.Authorization) {
      headers.append(
        "Authorization",
        `Bearer ${authStore.getTokenDataForApi()}`
      );
      if (DEBUG_USER_TOKEN) {
        console.info("auth0 token:", authStore.getTokenDataForApi());
      }
    }

    if (authStore.getUserDataForApi().sub !== "" && omitHeaders.UserData) {
      headers.append("UserData", JSON.stringify(authStore.getUserDataForApi()));
      if (DEBUG_USER_DATA) {
        console.info("userData:", authStore.getUserDataForApi());
      }
    }

    const { data } = await useFetch(url, {
      onRequest({ options }: { options: FetchOptions }) {
        options.headers = headers;
        options.method = method;
        options.body = body;
      },
      onResponse({ response }) {
        responseApi.status = response.status;
        responseApi.ok = response.ok;
      },
    });

    if (!responseApi.ok) {
      console.error(
        `Api status is not in the confirm pool: ${responseApi.status} status`
      );
    }

    return {
      data: data._value,
      status: responseApi.status,
      ok: responseApi.ok,
    };
  } catch (error) {
    if (lvl < 3) {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      return apiPost(urlPath, body, "POST", lvl + 1);
    } else {
      console.error(`${url} is not working`);
      throw error;
    }
  }
}

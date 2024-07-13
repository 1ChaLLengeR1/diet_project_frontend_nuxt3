// variables
const DEBUG_USER_TOKEN = false;
const DEBUG_LANG = false;
const DEBUG_USER_DATA = false;

// types
import type {
  ResponseFetch,
  OmitHeaders,
} from "./../../data/types/api/common/types";

// stores
import { DictionaryStore } from "./../../storage/dictionary/dictionary";
import { AuthStore } from "./../../storage/auth/auth";

export async function apiDownload(
  urlPath: string,
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
  const responseApi: ResponseFetch = { status: 0, ok: false, data: false };

  const dictionaryStore = DictionaryStore();
  const authStore = AuthStore();

  try {
    const headers: Headers = new Headers();

    if (omitHeaders.AppLanguage && dictionaryStore.getAppLanguage() !== "") {
      headers.append("AppLanguage", `${dictionaryStore.getAppLanguage()}`);
      if (DEBUG_LANG) {
        console.info("lang id:", dictionaryStore.getAppLanguage());
      }
    }

    if (authStore.getTokenDataForApi() && omitHeaders.Authorization) {
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

    const response = await fetch(url, {
      method: "GET",
      headers: headers,
    });

    if (!response.ok) {
      return {
        data: false,
        status: response.status,
        ok: response.ok,
      };
    }

    const blob = await response.blob();
    const a = document.createElement("a");
    a.href = window.URL.createObjectURL(blob);
    a.download = "download_project.zip";
    a.click();

    return {
      data: true,
      status: response.status,
      ok: response.ok,
    };
  } catch (error) {
    if (lvl < 3) {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      return apiDownload(urlPath, lvl + 1);
    } else {
      console.error(`${url} is not working`);
      throw error;
    }
  }
}

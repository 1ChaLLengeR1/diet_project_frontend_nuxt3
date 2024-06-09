// variables
const DEBUG_USER_TOKEN = false;
const DEBUG_LANG = false;

// types
import type {
  ResponseFetch,
  OmitHeaders,
} from "./../../data/types/api/common/types";
import type { FetchOptions } from "ohmyfetch";

// stores
import { DictionaryStore } from "./../../storage/dictionary/dictionary";

export async function apiGet(
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
  const responseApi: ResponseFetch = { status: 0, ok: false, data: null };

  const dictionaryStore = DictionaryStore();

  try {
    const headers: Headers = new Headers();

    if (omitHeaders.AppLanguage && dictionaryStore.getAppLanguage() !== "") {
      headers.append("AppLanguage", `${dictionaryStore.getAppLanguage()}`);
      if (DEBUG_LANG) {
        console.info("lang id:", dictionaryStore.getAppLanguage());
      }
    }

    // if (sotreAuth.getTokenDataForApi() && !omitHeaders.Authorization) {
    //   headers.append(
    //     "Authorization",
    //     `Bearer ${sotreAuth.getTokenDataForApi()}`
    //   );

    //   if (DEBUG_USER_TOKEN) {
    //     console.info("auth0 token:", sotreAuth.getTokenDataForApi());
    //   }
    // }

    const { data } = await useFetch(url, {
      onRequest({ options }: { options: FetchOptions }) {
        options.headers = headers;
        options.method = "GET";
      },
      onResponse({ response }: { response: Response }) {
        responseApi.status = response.status;
        responseApi.ok = response.ok;
      },
    });

    if (!responseApi.ok) {
      console.error(
        `Api status is not in the confirm pool: ${responseApi.status} status`
      );
      return;
    }

    return {
      data: data._value,
      status: responseApi.status,
      ok: responseApi.ok,
    };
  } catch (error) {
    if (lvl < 3) {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      return apiGet(urlPath, lvl + 1);
    } else {
      console.error(`${url} is not working`);
      throw error;
    }
  }
}

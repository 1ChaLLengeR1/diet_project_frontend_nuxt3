import { apiGet } from "./../common/fetch";
import type {
  ResponseApiDictionary,
  ResponseDictionary,
} from "./../../data/types/api/dictionary/types";

export async function collectionDictionary(): Promise<ResponseDictionary | null> {
  const urlPath: string = "/api/dictionary/collection";
  const response: ResponseApiDictionary | undefined = await apiGet(urlPath, 0, {
    AppLanguage: true,
  });

  if (!response || response.ok !== true || response.status >= 400) {
    console.error("api response does not return the collection in Dictionary!");
    return null;
  }

  const responseData: ResponseDictionary = {
    collection: response.data?.collection,
    error: response.data?.error,
    status: response.data?.status,
  };

  return responseData;
}

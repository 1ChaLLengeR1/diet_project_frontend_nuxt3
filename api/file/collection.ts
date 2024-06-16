// general
import { apiPost } from "./../common/post";

// types
import type { CollectionIds } from "./../../data/types/storage/file/types";
import type {
  ResponseApiFile,
  ResponseFile,
} from "./../../data/types/api/file/types";

export async function collectionFileMultiple(body: CollectionIds) {
  const urlPath: string = `/api/file/collectionMultiple`;

  const response: ResponseApiFile = await apiPost(urlPath, body, "POST", 0, {
    AppLanguage: false,
    Authorization: false,
    UserData: false,
  });

  if (!response || response.ok !== true || response.status >= 400) {
    console.error(
      "api response does not return the collection in FileMultiple!"
    );
    return null;
  }

  const responseData: ResponseFile = {
    collection: response.data?.collection,
    error: response.data?.error,
    status: response.data?.status,
  };

  return responseData;
}

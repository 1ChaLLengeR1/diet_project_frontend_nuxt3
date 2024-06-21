import { apiGet } from "./../common/fetch";

import type {
  ResponseApiUsers,
  ResponseUsers,
} from "./../../data/types/api/users/types";

export async function collectionUsers(): Promise<ResponseUsers | null> {
  const urlPath: string = `/api/user/collection`;
  const response: ResponseApiUsers | undefined = await apiGet(urlPath, 0, {
    AppLanguage: false,
    UserData: false,
    Authorization: false,
  });

  if (!response || response.ok !== true || response.status >= 400) {
    console.error("api response does not return the collection in Users!");
    return null;
  }

  const responseData: ResponseUsers = {
    collection: response.data?.collection,
    error: response.data?.error,
    status: response.data?.status,
  };

  return responseData;
}

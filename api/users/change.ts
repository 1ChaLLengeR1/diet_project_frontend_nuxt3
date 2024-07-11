import { apiPost } from "./../common/post";

import type {
  ResponseApiUsers,
  ResponseUsers,
} from "./../../data/types/api/users/types";

import type { ItemUser } from "./../../data/types/storage/user/types";

export async function changeUser(
  body: ItemUser
): Promise<ResponseUsers | null> {
  const urlPath: string = `/api/user/change`;
  const response: ResponseApiUsers | undefined = await apiPost(
    urlPath,
    body,
    "PATCH",
    0,
    {
      UserData: true,
      Authorization: true,
    }
  );

  if (!response || response.ok !== true || response.status >= 400) {
    console.error("api response does not return the change in user!");
    return null;
  }

  const responseData: ResponseUsers = {
    collection: response.data?.collection,
    error: response.data?.error,
    status: response.data?.status,
  };

  return responseData;
}

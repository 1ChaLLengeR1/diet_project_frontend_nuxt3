import { apiPost } from "./../common/post";

import type {
  ResponseApiPost,
  ResponsePost,
} from "./../../data/types/api/post/types";

import type { ChnagePost } from "./../../data/types/storage/post/types";

export async function changePost(
  id: string,
  body: ChnagePost
): Promise<ResponsePost | null> {
  const urlPath = `/api/post/change/${id}`;
  const response: ResponseApiPost | undefined = await apiPost(
    urlPath,
    body,
    "PATCH",
    0,
    {
      AppLanguage: false,
      UserData: true,
      Authorization: true,
    }
  );

  if (!response || response.ok !== true || response.status >= 400) {
    console.error(
      "api response does not return the collection in change Post!"
    );
    return null;
  }

  const responseData: ResponsePost = {
    collection: response.data?.collection,
    collectionTraining: response.data?.collectionTraining,
    error: response.data?.error,
    status: response.data?.status,
  };

  return responseData;
}

import { apiPost } from "./../common/post";

import type {
  ResponseApiTraining,
  ResponseTraining,
} from "./../../data/types/api/training/types";

import type { RemoveTraining } from "./../../data/types/storage/training/types";

export async function deleteTraning(
  idPost: string,
  removeIds: RemoveTraining
): Promise<ResponseTraining | null> {
  const urlPath = `/api/training/delete/${idPost}`;
  const response: ResponseApiTraining | undefined = await apiPost(
    urlPath,
    {},
    "DELETE",
    0,
    {
      UserData: true,
      Authorization: true,
    }
  );

  if (!response || response.ok !== true || response.status >= 400) {
    console.error(
      "api response does not return the collection in Remove Training!"
    );
    return null;
  }

  const responseData: ResponseTraining = {
    collection: response.data?.collection,
    error: response.data?.error,
    status: response.data?.status,
  };

  return responseData;
}

import { apiPost } from "./../common/post";

import type {
  ResponseApiTraining,
  ResponseTraining,
} from "./../../data/types/api/training/types";

import type { CreateTraining } from "./../../data/types/storage/training/types";

export async function createTraining(
  idPost: string,
  body: CreateTraining
): Promise<ResponseTraining | null> {
  const urlPath: string = `/api/training/create/${idPost}`;
  const response: ResponseApiTraining | undefined = await apiPost(
    urlPath,
    body,
    "POST",
    0,
    {
      AppLanguage: false,
      UserData: false,
      Authorization: true,
    }
  );

  if (!response || response.ok !== true || response.status >= 400) {
    console.error(
      "api response does not return the collection in Training Create!"
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

import { apiPost } from "./../common/post";

import type {
  ResponseApiPost,
  ResponsePost,
} from "./../../data/types/api/post/types";

import type { CreatePost } from "./../../data/types/storage/post/types";

export async function createPost(
  idProject: string,
  body: CreatePost
): Promise<ResponsePost | null> {
  const urlPath: string = `/api/post/create/${idProject}`;
  const response: ResponseApiPost | undefined = await apiPost(
    urlPath,
    body,
    "POST",
    0,
    {
      AppLanguage: false,
      UserData: true,
      Authorization: true,
    }
  );

  if (!response || response.ok !== true || response.status >= 400) {
    console.error(
      "api response does not return the collection in Create Post!"
    );
    return null;
  }

  const responseData: ResponsePost = {
    collection: response.data?.collection,
    trainingCollection: response.data?.trainingCollection,
    error: response.data?.error,
    status: response.data?.status,
  };

  return responseData;
}

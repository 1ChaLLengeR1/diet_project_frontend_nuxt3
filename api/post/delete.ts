import { apiPost } from "./../common/post";

import type {
  ResponseApiPost,
  ResponsePost,
} from "./../../data/types/api/post/types";

export async function deletePost(id: string): Promise<ResponsePost | null> {
  const urlPath = `/api/post/delete/${id}`;
  const response: ResponseApiPost | undefined = await apiPost(
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
      "api response does not return the collection in Delete Post!"
    );
    return null;
  }

  const responseData: ResponsePost = {
    collection: response.data?.collection,
    error: response.data?.error,
    status: response.data?.status,
  };

  return responseData;
}

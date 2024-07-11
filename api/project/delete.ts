import { apiPost } from "./../common/post";

import type {
  ResponseApiProject,
  ResponseProject,
} from "./../../data/types/api/project/types";

export async function deleteProject(
  id: string
): Promise<ResponseProject | null> {
  const urlPath = `/api/project/delete/${id}`;
  const response: ResponseApiProject | undefined = await apiPost(
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
      "api response does not return the collection in Delete Project!"
    );
    return null;
  }

  const responseData: ResponseProject = {
    collection: response.data?.collection,
    collectionRemoveId: response.data?.collectionRemoveId,
    error: response.data?.error,
    status: response.data?.status,
  };

  return responseData;
}

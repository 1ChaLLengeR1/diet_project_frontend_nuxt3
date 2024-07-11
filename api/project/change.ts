import { apiPost } from "./../common/post";

import type {
  ResponseApiProject,
  ResponseProject,
} from "./../../data/types/api/project/types";

import type { CreateProject } from "./../../data/types/storage/project/types";

export async function changeProeject(id: string, body: CreateProject) {
  const urlPath: string = `/api/project/change/${id}`;
  const response: ResponseApiProject | undefined = await apiPost(
    urlPath,
    body,
    "PATCH",
    0,
    {
      AppLanguage: true,
      UserData: true,
      Authorization: true,
    }
  );

  if (!response || response.ok !== true || response.status >= 400) {
    console.error(
      "api response does not return the collection in change Project!"
    );
    return null;
  }

  const responseData: ResponseProject = {
    collection: response.data?.collection,
    error: response.data?.error,
    status: response.data?.status,
  };

  return responseData;
}

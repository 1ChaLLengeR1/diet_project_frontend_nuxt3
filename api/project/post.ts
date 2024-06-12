import { apiPost } from "./../common/post";

import type {
  ResponseApiProject,
  ResponseProject,
} from "./../../data/types/api/project/types";

export async function createProject(
  body: any
): Promise<ResponseProject | null> {
  const urlPath: string = `/api/project/create`;
  const response: ResponseApiProject | undefined = await apiPost(
    urlPath,
    body,
    "POST",
    0,
    {
      AppLanguage: true,
      UserData: true,
      Authorization: true,
    }
  );

  if (!response || response.ok !== true || response.status >= 400) {
    console.error(`error: ${response}`);
    console.error(
      "api response does not return the collection in Create Project!"
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

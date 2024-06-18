import { apiPost } from "./../common/post";

import type {
  ResponseApiFile,
  ResponseFile,
} from "./../../data/types/api/file/types";

export async function deleteAllFile(ids: {
  ids: string[];
}): Promise<ResponseFile | null> {
  const urlPath = `/api/file/deleteAll`;
  const response: ResponseApiFile | undefined = await apiPost(
    urlPath,
    ids,
    "DELETE",
    0,
    {
      UserData: true,
      Authorization: true,
    }
  );
  if (!response || response.ok !== true || response.status >= 400) {
    console.error(
      "api response does not return the collection in Delete File All!"
    );
    return null;
  }

  const responseData: ResponseFile = {
    collection: response.data?.collection,
    error: response.data?.error,
    status: response.data?.status,
  };

  return responseData;
}

export async function deleteImage(id: string): Promise<ResponseFile | null> {
  const urlPath = `/api/file/delete/${id}`;
  const response: ResponseApiFile | undefined = await apiPost(
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
      "api response does not return the collection in Delete File!"
    );
    return null;
  }

  const responseData: ResponseFile = {
    collection: response.data?.collection,
    error: response.data?.error,
    status: response.data?.status,
  };

  return responseData;
}

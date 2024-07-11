import { apiGet } from "./../common/fetch";
import { apiPost } from "./../common/post";

import type {
  ResponseApiProject,
  ResponseProject,
} from "./../../data/types/api/project/types";

import type { BodyCollectionPublic } from "./../../data/types/storage/project/types";

export async function collectionProject(
  page: number = 1
): Promise<ResponseProject | null> {
  const urlPath: string = `/api/project/collection/${page}`;
  const response: ResponseApiProject | undefined = await apiGet(urlPath, 0, {
    AppLanguage: true,
    UserData: true,
    Authorization: false,
  });

  if (!response || response.ok !== true || response.status >= 400) {
    console.error("api response does not return the collection in Project!");
    return null;
  }

  const responseData: ResponseProject = {
    collection: response.data?.collection,
    pagination: response.data?.pagination,
    error: response.data?.error,
    status: response.data?.status,
  };

  return responseData;
}

export async function collectionProjectAll(): Promise<ResponseProject | null> {
  const urlPath: string = `/api/project/collectionAll`;
  const response: ResponseApiProject | undefined = await apiGet(urlPath, 0, {
    AppLanguage: true,
    UserData: true,
    Authorization: false,
  });

  if (!response || response.ok !== true || response.status >= 400) {
    console.error(
      "api response does not return the collection all in Project!"
    );
    return null;
  }

  const responseData: ResponseProject = {
    collection: response.data?.collection,
    pagination: response.data?.pagination,
    error: response.data?.error,
    status: response.data?.status,
  };

  return responseData;
}

export async function collectionOne(
  id: string
): Promise<ResponseProject | null> {
  const urlPath: string = `/api/project/collectionOne/${id}`;
  const response: ResponseApiProject | undefined = await apiGet(urlPath, 0, {
    AppLanguage: true,
    UserData: true,
    Authorization: false,
  });

  if (!response || response.ok !== true || response.status >= 400) {
    console.error(
      "api response does not return the collection one in Project!"
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

export async function collectionPublic(body: BodyCollectionPublic) {
  const urlPath: string = `/api/project/collectionPublic`;
  const response: ResponseApiProject | undefined = await apiPost(
    urlPath,
    body,
    "POST"
  );

  if (!response || response.ok !== true || response.status >= 400) {
    console.error(
      "api response does not return the collection public in Project!"
    );
    return null;
  }

  const responseData: ResponseProject = {
    collection: response.data?.collection,
    pagination: response.data?.pagination,
    error: response.data?.error,
    status: response.data?.status,
  };

  return responseData;
}

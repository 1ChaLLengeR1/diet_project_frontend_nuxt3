import { apiGet } from "./../common/fetch";
import { apiPost } from "./../common/post";

import type {
  ResponseApiPost,
  ResponsePost,
} from "./../../data/types/api/post/types";

import type { BodyCollectionPublicPost } from "./../../data/types/storage/post/types";

export async function collectionPost(
  page: number = 1,
  body: { id: string }
): Promise<ResponsePost | null> {
  const urlPath: string = `/api/post/collection/${page}`;
  const response: ResponseApiPost | undefined = await apiPost(
    urlPath,
    body,
    "POST",
    0,
    {
      AppLanguage: false,
      Authorization: true,
      UserData: true,
    }
  );

  if (!response || response.ok !== true || response.status >= 400) {
    console.error("api response does not return the collection in Post!");
    return null;
  }

  const responseData: ResponsePost = {
    collection: response.data?.collection,
    pagination: response.data?.pagination,
    error: response.data?.error,
    status: response.data?.status,
  };

  return responseData;
}

export async function collectionOnePost(
  id: string
): Promise<ResponsePost | null> {
  const urlPath: string = `/api/post/one/${id}`;
  const response: ResponseApiPost | undefined = await apiGet(urlPath, 0, {
    AppLanguage: false,
    UserData: true,
    Authorization: true,
  });

  if (!response || response.ok !== true || response.status >= 400) {
    console.error("api response does not return the collection one in Post!");
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

export async function collectionOnePublic(body: { id: string }) {
  const urlPath: string = `/api/post/collectionOnePublic`;
  const response: ResponseApiPost | undefined = await apiPost(
    urlPath,
    body,
    "POST"
  );

  if (!response || response.ok !== true || response.status >= 400) {
    console.error(
      "api response does not return the collection one public in POst!"
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

export async function collectionPublicPost(
  body: BodyCollectionPublicPost
): Promise<ResponsePost | null> {
  const urlPath: string = `/api/post/collectionPublic`;
  const response: ResponseApiPost | undefined = await apiPost(
    urlPath,
    body,
    "POST"
  );

  if (!response || response.ok !== true || response.status >= 400) {
    console.error(
      "api response does not return the collection public in POst!"
    );
    return null;
  }

  const responseData: ResponsePost = {
    collection: response.data?.collection,
    pagination: response.data?.pagination,
    error: response.data?.error,
    status: response.data?.status,
  };

  return responseData;
}

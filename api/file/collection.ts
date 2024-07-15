// general
import { apiPost } from "./../common/post";
import { apiGet } from "./../common/fetch";
import { apiDownload } from "./../common/downoload";

// types
import type { CollectionIds } from "./../../data/types/storage/file/types";
import type {
  ResponseApiFile,
  ResponseFile,
} from "./../../data/types/api/file/types";

export async function collectionFileMultiple(
  body: CollectionIds
): Promise<ResponseFile | null> {
  const urlPath: string = `/api/file/collectionMultiple`;

  const response: ResponseApiFile = await apiPost(urlPath, body, "POST", 0, {
    AppLanguage: false,
    Authorization: false,
    UserData: false,
  });

  if (!response || response.ok !== true || response.status >= 400) {
    console.error(
      "api response does not return the collection in FileMultiple!"
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

export async function collectionOne(id: string): Promise<ResponseFile | null> {
  const urlPath: string = `/api/file/collection/${id}`;

  const response: ResponseApiFile = await apiGet(urlPath, 0, {
    AppLanguage: false,
    Authorization: false,
    UserData: true,
  });

  if (!response || response.ok !== true || response.status >= 400) {
    console.error("api response does not return the collection file one!");
    return null;
  }

  const responseData: ResponseFile = {
    collection: response.data?.collection,
    error: response.data?.error,
    status: response.data?.status,
  };

  return responseData;
}

export async function downloadZip(projectId: string): Promise<boolean | null> {
  const urlPath: string = `/api/file/downolad/zip/${projectId}`;
  const response: { status: number; ok: boolean; data: boolean } =
    await apiDownload(urlPath, 0, {
      AppLanguage: false,
      Authorization: true,
      UserData: true,
    });

  if (
    !response ||
    response.ok !== true ||
    response.data !== true ||
    response.status >= 400
  ) {
    console.error("api response does not return the collection file one!");
    return null;
  }

  return true;
}

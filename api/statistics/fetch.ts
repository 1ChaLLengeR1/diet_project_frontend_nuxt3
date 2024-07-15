import { apiGet } from "./../common/fetch";

import type {
  ResponseApiStatistics,
  ResponseStatistics,
} from "./../../data/types/api/statistics/types";

export async function collectionStatistics(
  projectId: string
): Promise<ResponseStatistics | null> {
  const urlPath: string = `/api/statistics/collection/${projectId}`;
  const response: ResponseApiStatistics | undefined = await apiGet(urlPath, 0, {
    AppLanguage: false,
    UserData: false,
    Authorization: false,
  });

  if (!response || response.ok !== true || response.status >= 400) {
    console.error("api response does not return the collection in statistics!");
    return null;
  }

  const responseData: ResponseStatistics = {
    collection: response.data?.collection,
    error: response.data?.error,
    status: response.data?.status,
  };

  return responseData;
}

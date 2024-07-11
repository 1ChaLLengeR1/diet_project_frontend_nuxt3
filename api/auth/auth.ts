import { apiPost } from "./../common/post";

//types
import type {
  ResponseApiAuthorization,
  ResponseAuthorization,
} from "../../data/types/api/auth/types";

export async function authorization() {
  const urlPath: string = `/api/auth/authorization`;
  const response: ResponseApiAuthorization = await apiPost(
    urlPath,
    {},
    "POST",
    0,
    {
      AppLanguage: false,
      Authorization: true,
      UserData: true,
    }
  );

  if (!response || response.ok !== true || response.status >= 400) {
    console.error("api response does not return the authorization user");
    return null;
  }

  const responseData: ResponseAuthorization = {
    collection: response.data?.collection,
    error: response.data?.error,
    status: response.data?.status,
  };

  return responseData;
}

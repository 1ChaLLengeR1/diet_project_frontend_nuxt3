// general
import { apiPostFormData } from "./../common/postFormData";

// types
import type { CreateFile } from "./../../data/types/storage/file/types";
import type {
  ResponseApiFile,
  ResponseFile,
} from "./../../data/types/api/file/types";

export async function uploadFile(
  formData: CreateFile[]
): Promise<ResponseFile | null> {
  const urlPath: string = `/api/file/create`;

  const response: ResponseApiFile = await apiPostFormData(
    urlPath,
    formData,
    "POST",
    0,
    {
      Authorization: true,
      UserData: true,
    }
  );

  if (!response || response.ok !== true || response.status >= 400) {
    console.error(
      "api response does not return the collection in Create File!"
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

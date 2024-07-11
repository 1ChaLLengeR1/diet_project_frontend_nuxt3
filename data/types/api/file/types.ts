export interface ResponseApiFile {
  data?: {
    collection?: Array<{
      id: string;
      projectId: string;
      name: string;
      folder: string;
      folderPath: string;
      path: string;
      url: string;
      createdUp: string;
      updateUp: string;
    }>;
    error: string;
    status: number;
  };
  ok: boolean;
  status: number;
}

export interface ResponseFile {
  collection?: Array<{
    id: string;
    projectId: string;
    name: string;
    folder: string;
    folderPath: string;
    path: string;
    url: string;
    createdUp: string;
    updateUp: string;
  }>;
  error?: string;
  status?: number;
}

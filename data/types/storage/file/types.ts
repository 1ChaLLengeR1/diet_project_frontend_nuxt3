export interface CreateFile {
  projectId: string;
  folder: string;
  name: string;
  file: File;
}

export interface ItemFile {
  id: string;
  projectId: string;
  name: string;
  folder: string;
  folderPath: string;
  path: string;
  url: string;
  createdUp: string;
  updateUp: string;
}

export interface DeleteAll {
  ids: string[];
}

export interface CollectionIds {
  ids: string[];
}

export interface FilesAdd {
  file?: File;
  name?: string;
  folder?: string;
}

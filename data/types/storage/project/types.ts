export interface FormProject {
  title: string;
  description: string;
  fileFolder?: string;
  file: File;
}

export interface CreateProject {
  title: string;
  description: string;
}

export interface Collection {
  id: string;
  userId: string;
  ikdLanguage: string;
  title: string;
  description: string;
  createdUp: string;
  updateUp: string;
}

export interface BodyCollectionPublic {
  id: string;
  idLanguage: string;
  page: string;
}

export interface ItemFilterPost {
  id?: string | null;
  title?: string | null;
}

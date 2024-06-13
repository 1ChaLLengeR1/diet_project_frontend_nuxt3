export interface FormProject {
  title: string;
  description: string;
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

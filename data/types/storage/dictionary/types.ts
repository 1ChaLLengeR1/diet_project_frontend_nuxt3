export interface ResponseApiDictionary {
  ok: boolean;
  status: number;
  data?: {
    collection?: Array<{
      createdUp: string;
      id: string;
      key: string;
      translation: string;
    }>;
    error: string;
    status: number;
  };
}

export interface ResponseDictionary {
  collection?: Array<{
    createdUp: string;
    id: string;
    key: string;
    translation: string;
  }>;
  error?: string;
  status?: number;
}

export interface Dictionary {
  createdUp: string;
  id: string;
  key: string;
  translation: string;
}

export interface AppLanguage {
  id: string;
  key: string;
}

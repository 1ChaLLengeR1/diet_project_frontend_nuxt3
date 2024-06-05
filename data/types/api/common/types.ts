export interface ResponseFetch {
  status: number;
  ok: boolean;
  data: any;
}

export interface OmitHeaders {
  UserData?: boolean;
  Authorization?: boolean;
  AppLanguage?: boolean;
}

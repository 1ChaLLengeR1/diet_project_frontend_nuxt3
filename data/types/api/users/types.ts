export interface ResponseApiUsers {
  data?: {
    collection?: Array<{
      id: string;
      userName: string;
      lastName: string;
      nickName: string;
      email: string;
      role: string;
      sub: string;
    }>;
    error: string;
    status: number;
  };
  ok: boolean;
  status: number;
}

export interface ResponseUsers {
  collection?: Array<{
    id: string;
    userName: string;
    lastName: string;
    nickName: string;
    email: string;
    role: string;
    sub: string;
  }>;
  error?: string;
  status?: number;
}

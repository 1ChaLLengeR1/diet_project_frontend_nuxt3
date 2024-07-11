export interface ItemUser {
  id?: string;
  userName: string;
  lastName: string;
  nickName: string;
  email: string;
  role: string;
  sub?: string;
}

export interface ItemFilter {
  id?: string | null;
  fullName?: string | null;
}

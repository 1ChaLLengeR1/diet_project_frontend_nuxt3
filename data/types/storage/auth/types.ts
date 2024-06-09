export interface ParamsAuth0 {
  aud?: string;
  email?: string;
  email_verified?: boolean;
  exp?: number;
  iat?: number;
  iss?: string;
  name?: string;
  nickname?: string;
  nonce?: string;
  picture?: string;
  sid?: string;
  sub?: string;
  updated_at?: string;
  __raw?: string;
}

export interface UserData {
  name?: string;
  nickname?: string;
  sub?: string;
}

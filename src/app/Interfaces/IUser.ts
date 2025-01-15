export interface User {
  userName: string;
  email: string;
  password: string;
  mobile: number;
}

export interface LoginResponse {
  userName: string;
  password: string;
  token: string;
}
export interface LoginModel {
  userName: string;
  password: string;
}

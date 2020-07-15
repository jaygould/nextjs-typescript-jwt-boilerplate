export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  authToken?: string;
  refreshToken?: string;
}
export interface ILoginIn {
  email: string;
  password: string;
}

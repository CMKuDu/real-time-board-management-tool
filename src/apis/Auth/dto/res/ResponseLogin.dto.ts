interface Token {
  accessToken: string;
  refreshToken: string;
}
export interface User {
  id: string; 
  createdAt: Date; 
  updatedAt: Date;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  passWord: string;
}
interface Info {
  user: User;
}
export interface ResponseLoginDTO {
  info: Info;
  token: Token;
}
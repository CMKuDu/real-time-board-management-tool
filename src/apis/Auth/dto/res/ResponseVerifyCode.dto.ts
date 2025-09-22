export interface ResponseVerifyCodeDTO {
  user: {
    uid: string;
    email: string;
    emailVerified: boolean;
  };
  token: string;
}

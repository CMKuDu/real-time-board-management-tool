interface Token {
    accessToken: string;
    refreshToken: string;
}

export interface User {
    email: string;
}
interface Info {
    user: User;
}
export interface ResponseLoginEmailDTO {
    info: Info;
    token: Token;
}
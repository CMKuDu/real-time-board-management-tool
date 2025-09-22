import { axiosClient } from "@/config/AxiosClient"
import { RequestLoginDTO } from "./dto/req/ResquestLogin.dto"
import { ResponseLoginDTO } from "./dto/res/ResponseLogin.dto"
import { ResponseApi } from "../Base/Base.API"
import { RequestRegisterDTO } from "./dto/req/ResquestRegister.dto"
import { ResponseRegisterDTO } from "./dto/res/ResponseRegister.dto"
import { RequestEmailDTO } from "./dto/req/ResquestEmail.dto"
import { ResponseLoginEmailDTO } from "./dto/res/ReponseEmail.dto"

const END_POINT = "/auth"
export const AuthAPI = {
    async Login(reqBody: RequestLoginDTO): Promise<ResponseLoginDTO> {
        const res = await axiosClient.post<ResponseApi<ResponseLoginDTO>>(
            `${END_POINT}/login`,
            reqBody
        );
        return res.data;
    },
    async Register(reqBody: RequestRegisterDTO): Promise<ResponseRegisterDTO> {
        const res = await axiosClient.post<ResponseApi<ResponseRegisterDTO>>(
            `${END_POINT}/register`,
            reqBody
        );
        return res.data;
    },

    async LoginEmail(reqBody: RequestEmailDTO): Promise<ResponseLoginEmailDTO> {
        const res = await axiosClient.post<ResponseApi<ResponseLoginEmailDTO>>(
            `${END_POINT}/send-otp`,
            reqBody
        );
        return res.data;
    }
}
import { baseApi } from "../BaseApi";

const AuthApi = baseApi.injectEndpoints({
    endpoints : (builder)=>({
        signUp : builder.mutation({
            query : (userInfo) => ({
                url :'auth/register',
                method : 'POST',
                body : userInfo
            })
        })
    })
})

export const { useSignUpMutation } = AuthApi;
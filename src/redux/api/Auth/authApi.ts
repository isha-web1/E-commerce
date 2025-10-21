import { setUser } from "../../feature/auth/authSlice";
import { baseApi } from "../BaseApi";
 

const AuthApi = baseApi.injectEndpoints({
    endpoints : (builder)=>({
        signUp : builder.mutation({
            query : (userInfo) => ({
                url :'auth/register',
                method : 'POST',
                body : userInfo
            }),
            // 🔑 Handle successful signup response
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    // Assuming your backend returns { user: {...}, token: '...' }
                    dispatch(setUser(result.data)); 
                } catch (error) {
                    console.error("Sign up failed:", error);
                }
            }
        }),
        // 🔑 ADD A LOGIN ENDPOINT (Crucial for getting the user after they sign in)
        login: builder.mutation({
            query: (credentials) => ({
                url: 'auth/login', // Adjust URL as needed
                method: 'POST',
                body: credentials
            }),
            // 🔑 Handle successful login response
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    dispatch(setUser(result.data));
                } catch (error) {
                    console.error("Login failed:", error);
                }
            }
        })
    })
});

export const { useSignUpMutation, useLoginMutation } = AuthApi;
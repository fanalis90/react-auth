import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout, setCredential } from "../../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://api.escuelajs.co/api/v1/auth",
  credentials: "include",
  prepareHeaders: (headers, {getState}) => {
    
    const token = getState().auth.token
    console.log(token)
    if (token) {
        headers.set("authorization", `Bearer ${token}`)
    }
    
    return headers
  }
});

const baseQueryWithReAuth = async (args, api, options) => {
    let result = await baseQuery(args,api,options);
    if(result?.error?.originalStatus === 403) {
        console.log('sending refresh token')
        const refreshResult = await baseQuery('/refresh-token', api , options);
        console.log(refreshResult);
        if(refreshResult?.data){
            const user = api.getState().auth.user
            api.dispatch(setCredential({ ...refreshResult.data, user}))
            result = await(baseQuery(args,api,options))
        }else {
            api.dispatch(logout());
        }    
    }
    console.log(result)
    return result;  
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReAuth,
    endpoints: builder => ({})
})
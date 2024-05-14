import { apiSlice } from "../../app/api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: crededentials => ({
                url : '/login',
                method : 'POST',
                body : {...crededentials}
            })
        })
    })
})

export const { useLoginMutation } = authApiSlice
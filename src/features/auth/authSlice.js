import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: { user: null, token: null},
    reducers: {
        setCredential : (state, action) => {
            const { email,  refresh_token } = action.payload
            state.user = email
            state.token = refresh_token
        },
        logout : (state) => {
            state.user = null,
            state.token = null
        }
    }
})

export default authSlice.reducer

export const { setCredential, logout } = authSlice.actions

export const selectCurrentUser = (state) => state.auth.user
export const selectCurrentToken = (state) => state.auth.token
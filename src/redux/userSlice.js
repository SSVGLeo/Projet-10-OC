import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: null,
    userInfo: null,
    isAuthenticated: false,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.token = action.payload.token;
            state.userInfo = action.payload.userInfo;
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.token = null;
            state.userInfo = null;
            state.isAuthenticated = false;
        },
        updateUserInfo: (state, action) => {
            state.userInfo = action.payload;
        },
    }
})

export const { loginSuccess, logout, updateUserInfo } = userSlice.actions
export default userSlice.reducer
import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: {},
        token: '',
        isLogin: false,
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.isLogin = true;
        },
        setToken: (state, action) => {
            state.token = action.payload;
        },
        logoutUser: (state) => {
            state.user = {};
            state.isLogin = false;
        }
    }
});

export const { setUser, setToken, logoutUser } = userSlice.actions;
export default userSlice.reducer;

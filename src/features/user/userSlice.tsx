import { createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

interface AuthState {
    user: string | null;
    token: string | null;
    refreshToken: string | null;
    isAuthenticated: boolean;
}
const initialState: AuthState = {
    user: null,
    token: localStorage.getItem('jwtToken'),
    refreshToken: localStorage.getItem('refreshToken'),
    isAuthenticated: !!localStorage.getItem('jwtToken'),
};

const authReducer = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (
            state,
            action: PayloadAction<{ user: string; token: string; refreshToken: string }>
        ) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.refreshToken = action.payload.refreshToken;
            state.isAuthenticated = true;

            localStorage.setItem('jwtToken', action.payload.token);
            localStorage.setItem('refreshToken', action.payload.refreshToken);
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.refreshToken = null;
            state.isAuthenticated = false;

            localStorage.removeItem('jwtToken');
            localStorage.removeItem('refreshToken');
        },
    },
});




export const { loginSuccess, logout } = authReducer.actions;
export default authReducer.reducer;

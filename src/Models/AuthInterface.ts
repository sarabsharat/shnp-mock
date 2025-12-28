interface AuthState {
    user: any | null;
    token: string | null;
    refreshToken: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
}

export const initialState: AuthState = {
    user: null,
    token: localStorage.getItem('jwtToken'),
    refreshToken: localStorage.getItem('refreshToken'),
    isAuthenticated: !!localStorage.getItem('jwtToken'),
    loading: false,
    error: null,
};

export interface AuthResponse {
    user: any;
    jwt: string;
    refreshToken: string;
}

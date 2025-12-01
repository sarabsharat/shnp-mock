import { useContext, useState, createContext } from "react";
import type {FC } from "react";
import type {AuthContextType} from ".././Pages/Registry/Interface.tsx"
import type {AuthProviderProps} from ".././Pages/Registry/Interface.tsx"


const Auth = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
//redux toolkit
    const [token, setToken] = useState<string | null>(localStorage.getItem("jwtToken"));
    const [refreshToken, setRefreshToken] = useState<string | null>(localStorage.getItem("refreshToken"));

    const login = (jwt: string, newRefreshToken: string) => {
        localStorage.setItem("jwtToken", jwt);
        setToken(jwt);
        localStorage.setItem("refreshToken", newRefreshToken);
        setRefreshToken(newRefreshToken);
    }

    const logout = () => {
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("refreshToken");
        setToken(null);
        setRefreshToken(null);
    }

    return (
        <Auth.Provider value={{ token, refreshToken, login, logout }}>
            {children}
        </Auth.Provider>
    )
}
/* eslint-disable-next-line  */
export const useAuth = (): AuthContextType => {
    const context = useContext(Auth);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
import {Navigate} from "react-router-dom";
import type {ReactNode} from "react";
import {useAppSelector} from "../store/hooks.tsx";



const Protected = ({ children }: { children: ReactNode }) => {
    const { isAuthenticated } = useAppSelector((state) => state.auth);

    if (!isAuthenticated) return <Navigate to="/" replace />;
    return <>{children}</>;
};

export default Protected;

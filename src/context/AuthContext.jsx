import { createContext, useState, useContext } from "react";
import { login as loginAPI } from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [role, setRole] = useState(localStorage.getItem("role"));

    async function login(email, password) {
        const data = await loginAPI(email, password);
        setToken(data.token);
        setRole(data.role);
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);
    }

    function logout() {
        setToken(null);
        setRole(null);
        localStorage.removeItem("token");
        localStorage.removeItem("role");
    }

    const value = {
        token, 
        role,
        isAuthenticated: !!token,
        login,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    return useContext(AuthContext);
}
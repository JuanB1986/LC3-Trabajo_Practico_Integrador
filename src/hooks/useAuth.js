import { useState } from 'react';

export const useAuth = () => {

    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return localStorage.getItem("isAuthenticated") === 'true';
    });
    
    const [token, setToken] = useState(() => {
        return localStorage.getItem("token");
    });

    const [role, setRole] = useState("")      

    const login = (token, rol) => {
        localStorage.setItem("isAuthenticated", 'true');
        setRole(rol);                                       
        setIsAuthenticated(true);
        setToken(token);
    };

    const logout = () => {
        localStorage.setItem("isAuthenticated", 'false');
        localStorage.removeItem("token");
        setRole("");
        setIsAuthenticated(false);
        setToken(null);
    };

    return { isAuthenticated, token, login, logout,role };
};
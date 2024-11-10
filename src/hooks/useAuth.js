import { useState, useEffect } from 'react';

export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => localStorage.getItem("isAuthenticated") === 'true');


    const [token, setToken] = useState(() => {
        return localStorage.getItem("token");
    });

    const [role, setRole] = useState(() => {
        return localStorage.getItem("role");
    });

    const [id, setId] = useState(() => {
        return localStorage.getItem("userId");
    });

    const login = (token, rol, id) => {

        localStorage.setItem("isAuthenticated", 'true');
        localStorage.setItem("token", token);
        localStorage.setItem("role", rol);
        localStorage.setItem("userId", id)

        setToken(token);
        setRole(rol);
        setId(id);
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("userId");

        setIsAuthenticated(false);
        setToken(null);
        setRole(null);
        setId(null)
    };

    useEffect(() => {
        setIsAuthenticated(localStorage.getItem("isAuthenticated") === 'true');
        setToken(localStorage.getItem("token"));
        setRole(localStorage.getItem("role"));
        setId(localStorage.getItem("userId"));

    }, []);

    return { isAuthenticated, token, login, logout, role, id };
};

import { useState, useEffect } from 'react';

// Hook personalizado de autenticación
export const useAuth = () => {

    // Estado para saber si el usuario está autenticado, inicializado desde localStorage
    const [isAuthenticated, setIsAuthenticated] = useState(() => localStorage.getItem("isAuthenticated") === 'true');

    // Estado para almacenar el token de autenticación, inicializado desde localStorage
    const [token, setToken] = useState(() => {
        return localStorage.getItem("token");
    });

    // Estado para almacenar el rol del usuario, inicializado desde localStorage
    const [role, setRole] = useState(() => {
        return localStorage.getItem("role");
    });

    // Estado para almacenar el ID del usuario, inicializado desde localStorage
    const [id, setId] = useState(() => {
        return localStorage.getItem("userId");
    });

    // Función de inicio de sesión: guarda datos en localStorage y actualiza el estado de autenticación
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

    // Función de cierre de sesión: elimina datos de localStorage y restablece el estado de autenticación
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

    // Efecto para sincronizar el estado inicial de autenticación desde localStorage al cargar el componente
    useEffect(() => {
        setIsAuthenticated(localStorage.getItem("isAuthenticated") === 'true');
        setToken(localStorage.getItem("token"));
        setRole(localStorage.getItem("role"));
        setId(localStorage.getItem("userId"));

    }, []);

    return { isAuthenticated, token, login, logout, role, id };
};

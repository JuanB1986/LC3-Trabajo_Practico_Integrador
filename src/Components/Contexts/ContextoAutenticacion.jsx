import React, { createContext, useContext, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';

const AutenticacionContext = createContext();

export const ProveedorAutenticacion = ({ children }) => {

    const { isAuthenticated, token, login, logout, role } = useAuth();

    return (
        <AutenticacionContext.Provider value={{isAuthenticated, token, login, logout, role }}>
            {children}
        </AutenticacionContext.Provider>
    );
};

export const useAutenticacion = () => useContext(AutenticacionContext);
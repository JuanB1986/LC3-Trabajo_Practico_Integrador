import { createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '../../hooks/useAuth';

const AuthenticationContext = createContext();

// Componente que provee el contexto de autenticación a sus componentes hijos
export const AuthenticationProvider = ({ children }) => {

    // Usamos el hook `useAuth` para obtener la información de autenticación
    const { isAuthenticated, token, login, logout, role } = useAuth();

    return (
        
        // Proveedor del contexto, pasa la información de autenticación a los componentes hijos
        <AuthenticationContext.Provider value={{ isAuthenticated, token, login, logout, role }}>
            {children}
        </AuthenticationContext.Provider>
    );
};

AuthenticationProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

// Hook personalizado para acceder al contexto de autenticación
export const useAutenticacion = () => useContext(AuthenticationContext);
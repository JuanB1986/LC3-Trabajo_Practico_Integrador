import { createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '../../hooks/useAuth';

const AuthenticationContext  = createContext();

export const AuthenticationProvider  = ({ children }) => {

    const { isAuthenticated, token, login, logout, role } = useAuth();

    return (
        <AuthenticationContext.Provider value={{ isAuthenticated, token, login, logout, role }}>
            {children}
        </AuthenticationContext.Provider>
    );
};

AuthenticationProvider .propTypes = {
    children: PropTypes.node.isRequired,
  };

export const useAutenticacion = () => useContext(AuthenticationContext );
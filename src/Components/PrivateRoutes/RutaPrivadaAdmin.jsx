import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAutenticacion } from '../Contexts/ContextoAutenticacion';

const RutaPrivadaAdmin = ({ element }) => {

    const { isAuthenticated, role } = useAutenticacion();

    if (isAuthenticated && role=="admin")
    {
        return element
    }

    return <Navigate to="/iniciar-sesion" />;

};

export default RutaPrivadaAdmin;
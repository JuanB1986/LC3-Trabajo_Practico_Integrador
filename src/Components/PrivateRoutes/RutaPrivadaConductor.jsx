import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAutenticacion } from '../Contexts/ContextoAutenticacion';

const RutaPrivadaConductor = ({ element }) => {

    const { isAuthenticated, role } = useAutenticacion();

    if (isAuthenticated && role=="conductor")
    {
        return element
    }

    return <Navigate to="/iniciar-sesion" />;

};

export default RutaPrivadaConductor;
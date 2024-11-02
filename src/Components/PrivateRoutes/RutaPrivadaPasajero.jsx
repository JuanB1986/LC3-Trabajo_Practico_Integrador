import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAutenticacion } from '../Contexts/ContextoAutenticacion';

const RutaPrivadaPasajero = ({ element }) => {

    const { isAuthenticated, role } = useAutenticacion();

    if (isAuthenticated && role=="pasajero")
    {
        return element
    }

    return <Navigate to="/iniciar-sesion" />;

};

export default RutaPrivadaPasajero;
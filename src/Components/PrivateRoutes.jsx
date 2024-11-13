import { Navigate } from 'react-router-dom';
import { useAutenticacion } from './Contexts/AuthenticationContext';
import PropTypes from 'prop-types';

// Componente de rutas privadas que controla el acceso basado en autenticación y roles
const PrivateRoutes = ({ element, requiredRole }) => {

    // Obtiene el estado de autenticación y el rol de usuario desde el contexto
    const { isAuthenticated, role } = useAutenticacion();

    // Renderiza el componente si el usuario está autenticado y tiene el rol requerido
    if (isAuthenticated && role === requiredRole) {
        return element;
    }

    // Redirige al usuario a la página de inicio de sesión si no está autenticado o no tiene el rol correcto
    return <Navigate to="/iniciar-sesion" />;
};

PrivateRoutes.propTypes = {
    element: PropTypes.node.isRequired,
    requiredRole: PropTypes.string.isRequired,
};

export default PrivateRoutes;

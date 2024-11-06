import { Navigate } from 'react-router-dom';
import { useAutenticacion } from './Contexts/AuthenticationContext';
import PropTypes from 'prop-types';

const PrivateRoutes = ({ element, requiredRole }) => {

    const { isAuthenticated, role } = useAutenticacion();

    if (isAuthenticated && role === requiredRole) {
        return element;
    }

    return <Navigate to="/iniciar-sesion" />;
};

PrivateRoutes.propTypes = {
    element: PropTypes.node.isRequired,
    requiredRole: PropTypes.string.isRequired,
};

export default PrivateRoutes;

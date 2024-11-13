import styles from "./Home.module.css";
import DynamicFilter from "../../Components/DynamicFilter/DynamicFilter.jsx"
import TravelList from "../../Components/getTravelList.jsx";
import Footer from "../../Components/Footer/Footer.jsx";
import { Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { useAutenticacion } from '../../Components/Contexts/AuthenticationContext.jsx';

const Home = () => {

  // Definición de los campos para el filtro dinámico
  const filterFields1 = [
    { name: 'Origen', type: 'text' },
    { name: 'Destino', type: 'text' },
    { name: 'Fecha', type: 'date' },
  ];

  // Desestructuración del contexto de autenticación para obtener el estado de autenticación, rol y función de logout
  const { isAuthenticated, role, logout } = useAutenticacion();

  const navigate = useNavigate();

  // Manejar el inicio o cierre de sesión según el estado de autenticación
  const handleInicio = () => {
    if (isAuthenticated) {
      logout(); // Si está autenticado, realiza logout
    } else {
      navigate('/iniciar-sesion'); // Si no está autenticado, redirige a la página de inicio de sesión
    }
  };

  // Manejar la búsqueda y aplicar filtros
  const handleSearch = (filters) => {
    console.log('Filtros aplicados:', filters);
  };

  // Manejar la navegación a la página de reservas
  const handlerReservas = () => {
    navigate('/mis-reservas');
  };

  return (
    <div className={styles.dashboard}>

      {/* ENCABEZADO */}
      <header className={styles.header}>
        <span className={styles.header_span}>TravelRos</span>
        <div>
          {isAuthenticated ? (
            <Button onClick={handlerReservas} variant="outline-primary">
              Mis Reservas
            </Button>
          ) : null}

          <Button onClick={handleInicio} variant="outline-success">
            {isAuthenticated ? 'Cerrar Sesión' : 'Iniciar Sesión'}
          </Button>
        </div>
      </header>

      {/* CONTENIDO PRINCIPAL */}
      <main>
        <hr className={styles.linea} />

        <div className={styles.filter}>
          <h1>Buscá con quién compartir tu próximo viaje!</h1>
          <h6>¡Elegí fecha, origen o destino y encontralo!</h6>

          <DynamicFilter fields={filterFields1} onSearch={handleSearch} />
        </div>

        <hr className={styles.linea} />

        <div className={styles.contenedor2}>
          <TravelList authenticated={isAuthenticated && role === 'Passenger'} />
        </div>
      </main>

      {/* PIE DE PAGINA */}
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default Home
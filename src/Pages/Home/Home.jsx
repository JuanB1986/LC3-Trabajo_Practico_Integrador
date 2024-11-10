import styles from "./Home.module.css";
import { Button } from "react-bootstrap";
import DynamicFilter from "../../Components/DynamicFilter/DynamicFilter.jsx"
import TravelList from "../../Components/getTravelList.jsx";
import { useNavigate } from 'react-router-dom';
import { useAutenticacion } from '../../Components/Contexts/AuthenticationContext.jsx';

const Home = () => {
  const filterFields1 = [
    { name: 'Origen', type: 'text' },
    { name: 'Destino', type: 'text' },
    { name: 'Fecha', type: 'date' },
  ];

  const { isAuthenticated, role, logout } = useAutenticacion();
  const navigate = useNavigate();

  const handleInicio = () => {
    if (isAuthenticated) {
      logout();
    } else {
      navigate('/iniciar-sesion');
    }
  };

  // Función para manejar la búsqueda
  const handleSearch = (filters) => {
    console.log('Filtros aplicados:', filters);
  };

  const handlerReservas= () => {
    navigate('/mis-reservas');
};

  return (
    <div className={styles.dashboard}>

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

      <footer className={styles.footer}>

      </footer>
    </div>
  )
}

export default Home
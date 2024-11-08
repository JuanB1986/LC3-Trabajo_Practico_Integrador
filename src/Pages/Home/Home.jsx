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

  const { isAuthenticated, role, login, logout } = useAutenticacion();
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

  return (
    <div className={styles.dashboard}>

      <header className={styles.header}>
        <span className={styles.header_span}>TravelRos</span>
        <div>
          <Button onClick={handleInicio} variant="outline-success">
            {isAuthenticated ? 'Cerrar Sesión' : 'Iniciar Sesión'}
          </Button>
        </div>
      </header>

      <main>
        <hr className={styles.linea} />
        
        <div className={styles.filter}>
          <DynamicFilter fields={filterFields1} onSearch={handleSearch} />
        </div>

        <hr className={styles.linea} />

        <div className={styles.contenedor2}>
          <TravelList authenticated={isAuthenticated && role === 'pasajero'} />
        </div>
      </main>

      <footer className={styles.footer}>

      </footer>
    </div>
  )
}

export default Home
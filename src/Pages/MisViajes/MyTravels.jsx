import styles from "./Mytravels.module.css";
import { Button } from "react-bootstrap";
import { useAutenticacion } from '../../Components/Contexts/AuthenticationContext.jsx';
import DriversTravels from "../../Components/getDriversTravels.jsx";
import Footer from "../../Components/Footer/Footer.jsx";

const MyTravels = () => {
  const { isAuthenticated, role, logout } = useAutenticacion();

  // Cierra la sesión del usuario
  const handleInicio = () => {
    logout();
  }

  return (
    <div className={styles.dashboard}>

      {/* ENCABEZADO */}
      <header className={styles.header}>
        <span className={styles.header_span}>TravelRos</span>
        <div>
          <Button onClick={handleInicio} variant="outline-success">Cerrar Sesión</Button>
        </div>
      </header>

      {/* CONTENIDO PRINCIPAL */}
      <main>
        <hr className={styles.linea} />

        <h1 className={styles.subtitulo} >Mis Viajes</h1>

        <div className={styles.contenedor2}>
          <DriversTravels authenticated={isAuthenticated && role === 'Driver'} />
        </div>
      </main>

      {/* PIE DE PÁGINA */}
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default MyTravels

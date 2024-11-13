import styles from "./MyReservations.module.css";
import ReservationList from "../../Components/getPassengerReservations";
import Footer from "../../Components/Footer/Footer";
import { Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

const MyReservations = () => {

  const navigate = useNavigate();

  // Navega de regreso a la página del pasajero
  const handlerVolver = () => {
    navigate('/pasajero');
  };

  return (
    <div className={styles.dashboard}>
      {/* ENCABEZADO */}

      <header className={styles.header}>
        <span className={styles.header_span}>TravelRos</span>
        <div>

          <Button
            onClick={handlerVolver}
            variant="outline-success">
            Volver
          </Button>

        </div>
      </header>

      {/* CONTENIDO PRINCIPAL */}
      <main>
        <hr className={styles.linea} />
        <div className={styles.contenedor2}>
          <h1>Mis Reservas</h1>
          <ReservationList />
        </div>
      </main>

      {/* PIE DE PÁGINA */}
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default MyReservations
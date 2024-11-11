import styles from "./MyReservations.module.css";
import ReservationList from "../../Components/getPassengerReservations";
import Footer from "../../Components/Footer/Footer";
import { Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

const MyReservations = () => {

  const navigate = useNavigate();

  const handlerVolver = () => {
    navigate('/pasajero');
  };

  return (
    <div className={styles.dashboard}>

      <header className={styles.header}>
        <span className={styles.header_span}>TravelRos</span>
        <div>

          <Button onClick={handlerVolver} variant="outline-success">
            Volver
          </Button>

        </div>
      </header>

      <main>
        <hr className={styles.linea} />
        <div className={styles.contenedor2}>
          <h1>Mis Reservas</h1>

          <ReservationList />
        </div>
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default MyReservations
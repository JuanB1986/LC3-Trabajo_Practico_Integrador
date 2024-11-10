import styles from "./MyReservations.module.css";
import { Button } from "react-bootstrap";
import ReservationList from "../../Components/getPassengerReservations";
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

      <footer className={styles.footer}>

      </footer>
    </div>
  )
}

export default MyReservations
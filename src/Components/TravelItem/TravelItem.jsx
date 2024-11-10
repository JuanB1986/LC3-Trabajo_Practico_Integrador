import PropTypes from 'prop-types';
import styles from './TravelItem.module.css';
import { useAuth } from '../../hooks/useAuth';

const TravelItem = ({ travelId, origin, destination, date, time, availableSeats, price, isLogged, onDelete, onReserve }) => {

    const role = localStorage.getItem('role');

    const handleReserve = () => {
        if (window.confirm("¿Está seguro de que desea reservar este viaje?")) {
          onReserve(travelId); 
        }
      };

    const handleDelete = () => {
        if (window.confirm("¿Está seguro de que desea eliminar este viaje?")) {
          onDelete(travelId);
        }
      };

    return (
        <div className={styles.contenedor}>
            <div className={styles.left}>
                <span className={styles.secundario}>Fecha: {date}</span> { }
                <span className={styles.principal}>{origin} - {destination}</span>
                <span className={styles.secundario}>Horario: {time}</span>
                <span className={styles.secundario}>Asientos disponibles: {availableSeats}</span>
                <span className={styles.secundario}> Nº de Viaje: {travelId} </span>
            </div>

            <div className={styles.right}>
                <div>${price}</div>
                {isLogged && role === 'Passenger' && (
                    <button className={styles.delete_button} onClick={handleReserve}>Reservar</button>
                )}
                {isLogged && role === 'Driver' && (
                    <button className={styles.delete_button} onClick={handleDelete}>Eliminar</button>
                )}
            </div>
        </div>
    );
}

TravelItem.propTypes = {
    travelId: PropTypes.number,
    origin: PropTypes.string.isRequired,
    destination: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    availableSeats: PropTypes.number,
    price: PropTypes.number.isRequired,
    isLogged: PropTypes.bool.isRequired,
    onDelete: PropTypes.func,
    onReserve: PropTypes.func,
};

export default TravelItem;

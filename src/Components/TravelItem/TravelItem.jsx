import PropTypes from 'prop-types';
import styles from './TravelItem.module.css';

const TravelItem = ({ travelId, origin, destination, date, time, availableSeats, price, isLogged }) => {

    const role = localStorage.getItem('role');

    const handleReserve = () => {

        console.log(`Reservando viaje con ID: ${travelId}`);
    };

    const handleDelete = () => {

        console.log(`Eliminando viaje con ID: ${travelId}`);
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
};

export default TravelItem;

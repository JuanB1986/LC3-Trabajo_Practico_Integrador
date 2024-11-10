import PropTypes from 'prop-types';
import styles from './TravelItem.module.css';
import { useAuth } from '../../hooks/useAuth';

const TravelItem = ({ travelId, origin, destination, date, time, availableSeats, price, isLogged, btnClick }) => {

    //const { isAuthenticated, token, login, logout, role } = useAuth();
    const { isAuthenticated,role } = useAuth();

    const btnHandler =()=>{
        btnClick(travelId)    
    }

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
                {isAuthenticated  && (              //isLogged
                    <button onClick={btnHandler} className={styles.delete_button}>Eliminar</button>
                )}
            </div>
        </div>
    );
}

export default TravelItem;

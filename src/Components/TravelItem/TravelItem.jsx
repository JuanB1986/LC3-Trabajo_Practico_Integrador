import PropTypes from 'prop-types';
import styles from './TravelItem.module.css';

const TravelItem = ({ travelId, origen, destino, fecha, hora, asientos, precio }) => {


    return (
        <div className={styles.contenedor}>
            <div className={styles.left}>
                <span className={styles.secundario}>Fecha: {fecha.toLocaleDateString()}</span>
                <span className={styles.principal}>{origen} - {destino}</span>
                <span className={styles.secundario}>Horario: {hora}</span>
                <span className={styles.secundario}>Asientos disponibles: {asientos}</span>
                <span className={styles.secundario}> Nº de Viaje: {travelId} </span>
            </div>

            <div className={styles.right}>
                <div>${precio}</div>
                <button className={styles.delete_button}>Reservar</button>
            </div>
        </div>
    );
}

TravelItem.propTypes = {
    travelId: PropTypes.number.isRequired,
    origen: PropTypes.string.isRequired,
    destino: PropTypes.string.isRequired,
    fecha: PropTypes.instanceOf(Date).isRequired,
    hora: PropTypes.string.isRequired,
    asientos: PropTypes.number.isRequired,
    precio: PropTypes.number.isRequired,
};

export default TravelItem;

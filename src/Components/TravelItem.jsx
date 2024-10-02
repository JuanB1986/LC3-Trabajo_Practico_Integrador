import PropTypes from 'prop-types';
import './Css/TravelItem.css';

const TravelItem = ({ travelId, origen, destino, fecha, hora, asientos, precio }) => {


    return (
        <div className="contenedor">
            <div className='left'>
                <span className='secundario'>Fecha: {fecha.toLocaleDateString()}</span>
                <span className='principal'>{origen} - {destino}</span>
                <span className='secundario'>Horario: {hora}</span>
                <span className='secundario'>Asientos disponibles: {asientos}</span>
                <span className='secundario'> Nº de Viaje: {travelId} </span>
            </div>

            <div className='right'>
                <div>${precio}</div>
                <button className="delete-button">Reservar</button>
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

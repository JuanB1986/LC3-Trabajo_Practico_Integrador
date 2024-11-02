import PropTypes from 'prop-types';
import TravelItem from '../TravelItem/TravelItem';

const Travel = ({ travels }) => {
    return (
        <div>
            {travels.map((travel) => (
                <TravelItem
                    key={travel.id}
                    travelId={travel.id}
                    origen={travel.origen}
                    destino={travel.destino}
                    fecha={travel.fecha}
                    hora={travel.hora}
                    asientos={travel.asientos}
                    precio={travel.precio}
                />
            ))}
        </div>
    )
}

Travel.propTypes = {
    travels: PropTypes.array.isRequired
}

export default Travel
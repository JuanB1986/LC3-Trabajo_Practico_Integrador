import PropTypes from 'prop-types';
import TravelItem from '../TravelItem/TravelItem';

const Travel = ({ travels, authenticated  }) => {
    return (
        <div>
            {travels.map((travel) => (
                <TravelItem
                    key={travel.travelId}
                    travelId={travel.travelId}
                    origin={travel.origin}
                    destination={travel.destination}
                    date={travel.date}
                    time={travel.time}
                    availableSeats={travel.availableSeats}
                    price={travel.price}
                    isLogged={authenticated}
                />
            ))}
        </div>
    )
}

Travel.propTypes = {
    travels: PropTypes.array.isRequired,
    authenticated: PropTypes.bool.isRequired,
}

export default Travel
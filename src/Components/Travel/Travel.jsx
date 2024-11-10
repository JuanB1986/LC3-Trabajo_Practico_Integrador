import PropTypes from 'prop-types';
import TravelItem from '../TravelItem/TravelItem';

const Travel = ({ travels, authenticated, onDelete, onReserve, onCancel, myReserve }) => {
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
                    onDelete={onDelete}
                    onReserve={onReserve}
                    onCancel={onCancel}
                    myReserve={myReserve}
                />
            ))}
        </div>
    );
};


Travel.propTypes = {
    travels: PropTypes.array.isRequired,
    authenticated: PropTypes.bool,
    onDelete: PropTypes.func,
    onReserve: PropTypes.func,
    onCancel: PropTypes.func,
    myReserve: PropTypes.bool,
}

export default Travel
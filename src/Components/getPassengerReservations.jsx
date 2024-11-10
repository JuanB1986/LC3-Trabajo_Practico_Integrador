import { useEffect, useState } from 'react';
import Travel from "./Travel/Travel";
import PropTypes from 'prop-types';

const ReservationList = ({ authenticated }) => {
  const [travels, setTravels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTravels = () => {
    
    const passengerId = localStorage.getItem('userId');
    
    fetch(`https://localhost:7080/api/Passenger/${passengerId}/reserved-travels`, {
      method: "GET",
      mode: "cors",
      headers: {
        accept: "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((travels) => {
        const listadotravels = travels
          .map((travel) => ({
            travelId: travel.id,
            origin: travel.startDirection,
            destination: travel.endDirection,
            date: travel.date,
            time: travel.time,
            availableSeats: travel.availableSeats,
            price: travel.price,
            status: travel.status,
          }))
          .sort((a, b) => a.travelId - b.travelId);

        setTravels(listadotravels);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching travels:", error);
        setError(error.message);
        setLoading(false);
      });
  };

  // Llama a fetchTravels al montar el componente
  useEffect(() => {
    fetchTravels();
  }, []);

  // Función para manejar la cancelación
  const handleCancel = async (travelId) => {
    const passengerId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`https://localhost:7080/api/Passenger/${passengerId}/cancel-reservation/${travelId}`, {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Error al reservar el viaje');

      fetchTravels();  
    } catch (error) {
      console.error('Error al realizar la reserva:', error);
    }
  };

  if (loading) {
    return <div>Cargando lista de viajes...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Travel travels={travels} authenticated={authenticated} onCancel={handleCancel} myReserve={true} />
    </div>
  );  
};

ReservationList.propTypes = {
  authenticated: PropTypes.bool,
};

export default ReservationList;

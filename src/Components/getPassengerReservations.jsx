import { useEffect, useState } from 'react';
import Travel from "./Travel/Travel";
import PropTypes from 'prop-types';

// Componente que maneja la lista de reservas y su estado de carga
const ReservationList = ({ authenticated }) => {
  const [travels, setTravels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Función para obtener los viajes reservados desde la API
  const fetchTravels = () => {
    const token = localStorage.getItem('token');
    const passengerId = localStorage.getItem('userId');

    // Realiza la solicitud al servidor
    fetch(`https://localhost:7080/api/Passenger/${passengerId}/reserved-travels`, {
      method: "GET",
      mode: "cors",
      headers: {
        Authorization: `Bearer ${token}`,
        accept: "application/json",
      },
    })
      .then((response) => {

        // Lanza un error si la respuesta de la API no es exitosa
        if (!response.ok) throw new Error('Network response was not ok');

        return response.json();
      })
      .then((travels) => {

        // Mapea y ordena los viajes reservados antes de almacenarlos en el estado
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

  // Llama a `fetchTravels` una vez al montar el componente para obtener los datos iniciales
  useEffect(() => { fetchTravels() }, []);

  // Función para manejar la cancelación de una reserva
  const handleCancel = async (travelId) => {
    const passengerId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    try {

      // Realiza la solicitud al servidor
      const response = await fetch(`https://localhost:7080/api/Passenger/${passengerId}/cancel-reservation/${travelId}`, {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      // Lanza un error si la respuesta de la API no es exitosa
      if (!response.ok) throw new Error('Error al reservar el viaje');

      fetchTravels(); // Refresca la lista de viajes tras la cancelación

    } catch (error) {
      console.error('Error al realizar la reserva:', error);
    }
  };

  if (loading) return <div>Cargando lista de viajes...</div>;

  if (error) return <div>Error: {error}</div>;

  // Renderiza el componente `Travel` con la lista de reservas y la función de cancelación
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

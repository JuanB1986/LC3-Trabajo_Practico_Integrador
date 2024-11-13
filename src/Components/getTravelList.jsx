import { useEffect, useState } from 'react';
import Travel from "./Travel/Travel";
import PropTypes from 'prop-types';

// Componente que maneja la lista de viajes y su estado de carga
const TravelList = ({ authenticated }) => {
  const [travels, setTravels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Función para obtener los viajes disponibles desde la API
  const fetchTravels = () => {
    let url = "https://localhost:7080/api/Travel/available";

    // Si hay un ID de pasajero, añade el parámetro `passengerId` a la URL
    const passengerId = localStorage.getItem('userId');

    if (passengerId) {
      url = `https://localhost:7080/api/Travel/available?passengerId=${passengerId}`;
    }

    // Realiza la solicitud al servidor
    fetch(url, {
      method: "GET",
      mode: "cors",
      headers: {
        accept: "application/json",
      },
    })
      .then((response) => {

        // Lanza un error si la respuesta de la API no es exitosa
        if (!response.ok) throw new Error('Network response was not ok')

        return response.json();
      })
      .then((travels) => {

        // Mapea y ordena los viajes antes de almacenarlos en el estado
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

  // Función para manejar la reserva de un viaje
  const handleReserve = async (travelId) => {
    const passengerId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    try {

      // Realiza la solicitud al servidor
      const response = await fetch(`https://localhost:7080/api/Passenger/${passengerId}/reserve/${travelId}`, {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      // Lanza un error si la respuesta de la API no es exitosa
      if (!response.ok) throw new Error('Error al reservar el viaje');

      fetchTravels(); // Refresca la lista de viajes tras realizar la reserva

    } catch (error) {
      console.error('Error al realizar la reserva:', error);
    }
  };

  if (loading) return <div>Cargando lista de viajes...</div>;

  if (error) return <div>Error: {error}</div>;

  // Renderiza el componente `Travel` con la lista de viajes obtenida y el manejador de reservas
  return (
    <div>
      <Travel travels={travels} authenticated={authenticated} onReserve={handleReserve} />
    </div>
  );
};

TravelList.propTypes = {
  authenticated: PropTypes.bool.isRequired,
};

export default TravelList;

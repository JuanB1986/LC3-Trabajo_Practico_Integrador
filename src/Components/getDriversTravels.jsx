import { useEffect, useState } from 'react';
import Travel from "./Travel/Travel";
import PropTypes from 'prop-types';

const TravelList = ({ authenticated }) => {
  const [travels, setTravels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://localhost:7080/api/Driver/1", { 
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
      .then((driver) => {
        console.log("Datos recibidos desde la API:", driver);

        if (driver && driver.travels && Array.isArray(driver.travels)) {
          
          const listadotravels = driver.travels.map((travel) => ({
              travelId: travel.id,
              origin: travel.startDirection,
              destination: travel.endDirection,
              date: travel.date,
              time: travel.time,
              availableSeats: "-", 
              price: travel.price,
              status: travel.status,
          }));

          console.log("Lista de viajes:", listadotravels);
          setTravels(listadotravels);
        } else {
          console.error("No se encontraron viajes en la respuesta.");
          setTravels([]);
        }

        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching travels:", error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Cargando lista de viajes...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Travel travels={travels} authenticated={authenticated} />
    </div>
  );
};

TravelList.propTypes = {
  authenticated: PropTypes.bool.isRequired,
};

export default TravelList;

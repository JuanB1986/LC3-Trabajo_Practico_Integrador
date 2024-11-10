import { useEffect, useState } from 'react';
import styles from "../Pages/MisViajes/Mytravels.module.css";
import Travel from "./Travel/Travel.jsx";
import TravelCreateModifyForm from "./Forms/TravelCreateModifyForm/TravelCreateModifyForm.jsx";

import PropTypes from 'prop-types';

const TravelList = ({ authenticated }) => {
  const [travels, setTravels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null)

  const handleDeleteTravel = async (travelId) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`https://localhost:7080/api/Travel/${travelId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }); 
      if (!response.ok) throw new Error('No se pudo eliminar el viaje');
      setTravels((prevTravels) => prevTravels.filter((travel) => travel.travelId !== travelId));
    } catch (error) {
      console.error("Error eliminando el viaje:", error);
    }
  };

  useEffect(() => {
    const driverId = localStorage.getItem("userId");

    fetch(`https://localhost:7080/api/Driver/${driverId}/travels`, {
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
  }, []);

  const showCreateForm = travels.length != 0;

  if (loading) {
    return <div>Cargando lista de viajes...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }


  return (
    <div className={styles.contenedor2}>
      {travels.length > 0 ? (
        <Travel travels={travels} authenticated={authenticated} onDelete={handleDeleteTravel} />
      ) : (
        <div>Aún no tiene ningún viaje registrado.</div>
      )}
      {showCreateForm && <TravelCreateModifyForm />}
    </div>
  );
};

TravelList.propTypes = {
  authenticated: PropTypes.bool.isRequired,
};

export default TravelList;
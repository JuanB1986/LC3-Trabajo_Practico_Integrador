import { useEffect, useState } from 'react';

const ListaPasajeros = () => {
  const [passengers, setPassengers] = useState([]);

  useEffect(() => {
    fetch("https://localhost:7080/api/Passenger", {
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
      .then((pasajeros) => {
        const listadoPasajeros = pasajeros
          .map((pasajero) => ({
            pasajeroReservations: pasajero.reservations,
            pasajeroUserId: pasajero.userId, 
            pasajeroName: pasajero.name,
            pasajeroLastName: pasajero.lastName,
            pasajeroPhoneNumber: pasajero.phoneNumber,
            pasajeroDni: pasajero.dni,
            pasajeroEmail: pasajero.email,
            pasajeroPassword: pasajero.password,
          }))
          .sort((a, b) => b.pasajeroUserId - a.pasajeroUserId);

        setPassengers(listadoPasajeros);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <h1>Lista de Pasajeros</h1>
      <ul>
        {passengers.map((pasajero) => (
          <li key={pasajero.pasajeroUserId}>
            {pasajero.pasajeroName} 
            {pasajero.pasajeroLastName}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaPasajeros;
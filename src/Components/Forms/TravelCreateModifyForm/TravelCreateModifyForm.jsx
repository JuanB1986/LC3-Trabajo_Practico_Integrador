import styles from './TravelCreateModifyForm.module.css';
import { useState } from 'react';
import PropTypes from 'prop-types';

const TravelCreateModifyForm = ({ setTravels }) => {
  const [travelId, setTravelId] = useState('');
  const [startDirection, setStartDirection] = useState('');
  const [endDirection, setEndDirection] = useState('');
  const [StartDate, setStartDate] = useState('');
  const [StartHour, setStartHour] = useState('');
  const [price, setPrice] = useState('');
  const [option, setOption] = useState(false);
  const [inputIdType, setInputIdType] = useState("hidden");
  const [message, setMessage] = useState("");

  const route = "https://localhost:7080/api/Travel";

  const handleSubmit = async (event) => {
    event.preventDefault();

    const driverId = localStorage.getItem("userId");
    const token = localStorage.getItem('token');

    let startTime = new Date(
      `${StartDate.split("/").reverse().join("-")}T${StartHour}:00`
    );

    startTime.setHours(startTime.getHours() - 3);
    startTime = startTime.toISOString();

    const travelData = {
      driverId: driverId,
      startDirection: startDirection,
      endDirection: endDirection,
      startTime: startTime,
      price: price,
    };

    try {
      const response = await fetch(option ? `${route}/${travelId}` : route, {
        method: option ? 'PUT' : 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(travelData),
      });

      if (!response.ok) {
        messageHandler("Error del servidor");
        throw new Error('Error en la red');
      }

      // Si la creación/modificación es exitosa, obtener la lista actualizada de viajes
      const updatedTravelsResponse = await fetch('https://localhost:7080/api/Driver/' + driverId + '/travels', {
        method: 'GET',
        mode: 'cors',
        headers: {
          accept: 'application/json',
        },
      });

      const updatedTravels = await updatedTravelsResponse.json();

      // Mapea y ordena los viajes antes de almacenarlos en el estado
      const listadotravels = updatedTravels
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

      // Actualiza la lista de viajes en el componente principal
      setTravels(listadotravels);

      // Mensaje de éxito
      messageHandler("Modificado / Creado correctamente");

    } catch (error) {
      messageHandler({error} + "Error al enviar los datos");
    }
  };

  // Cambia la opción a "Nuevo Viaje" (sin ID)
  const handlerOption1 = () => {
    setOption(false);
    setInputIdType("hidden");
  };

  // Cambiar la opción a "Modificar Viaje" (con ID)
  const handlerOption2 = () => {
    setOption(true);
    setInputIdType("text");
  };

  // Función para mostrar mensajes de éxito o error
  const messageHandler = (mens) => {
    setMessage(mens);
    setTimeout(() => {
      setMessage("");
    }, 2500);
  };

  return (
    <div className={styles.Form_fondo}>
      <div className={styles.Form_contenedor}>
        <h5 className={styles.Form_titulo}>Crear / Modificar viaje</h5>

        <form onSubmit={handleSubmit}>

          {/* Opciones para seleccionar si es un nuevo viaje o modificar un viaje */}
          <div className={styles.Form_option_contenedor}>

            <span className={styles.Form_option_span}>
              <input defaultChecked type="radio" name='opcion' onClick={handlerOption1}></input>
              <label className={styles.Form_option} name="opcion">Nuevo Viaje</label>
            </span>

            <span className={styles.Form_option_span}>
              <input type="radio" name='opcion' onClick={handlerOption2}></input>
              <label className={styles.Form_option} name="opcion">Modificar Viaje</label>
            </span>
          </div>

          {/* Formulario para ingresar los detalles del viaje */}
          <input type={inputIdType} className={styles.Form_input} onChange={(e) => setTravelId(e.target.value)} required placeholder='Nº de Viaje' />
          <input type="text" className={styles.Form_input} onChange={(e) => setStartDirection(e.target.value)} required placeholder='Origen' />
          <input type="text" className={styles.Form_input} onChange={(e) => setEndDirection(e.target.value)} required placeholder='Destino' />
          <input type="text" className={styles.Form_input} onChange={(e) => setStartDate(e.target.value)} required placeholder='Fecha (dd/mm/yyyy)' />
          <input type="text" className={styles.Form_input} onChange={(e) => setStartHour(e.target.value)} required placeholder='Hora (hh:mm)' />
          <input type="text" className={styles.Form_input} onChange={(e) => setPrice(e.target.value)} required placeholder='Precio' />
          <button className={styles.Form_loginButton} type="submit">Enviar</button>
          
          <p className={styles.Form_message}>{message}</p>
        </form>
      </div>
    </div>
  );
};

TravelCreateModifyForm.propTypes = {
  setTravels: PropTypes.func.isRequired, // La función que se usará para actualizar la lista de viajes
};

export default TravelCreateModifyForm;

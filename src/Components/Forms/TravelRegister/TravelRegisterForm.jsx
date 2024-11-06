import styles from './TravelRegisterForm.module.css'
import { useState } from 'react';

const DriverRegisterForm = () => {

  const [travelId, setTravelId] = useState('');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [data, setData] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const travelData = {
      travelId,
      origin,
      destination,
      data,
      price,
    };

    try {
      const response = await fetch("https://localhost:7080/api/Travel", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(travelData),
      });

      if (!response.ok) {
        throw new Error('Error en la red');
      }

      const data = await response.json();
      console.log('Datos enviados:', data);

    } catch (error) {
      console.error('Error al enviar los datos:', error);

    }
  };

  return (
    <div className={styles.Form_fondo}>
      <div id={styles.Form_contenedor}>
        <h5 id={styles.Form_titulo}>Nuevo Viaje</h5>
        <form onSubmit={handleSubmit}>

          <input type="text" className={styles.Form_input} onChange={(e) => setTravelId(e.target.value)} required placeholder='Nº de Viaje' />
          <input type="text" className={styles.Form_input} onChange={(e) => setOrigin(e.target.value)} required placeholder='Origen' />
          <input type="text" className={styles.Form_input} onChange={(e) => setDestination(e.target.value)} required placeholder='Destino' />
          <input type="text" className={styles.Form_input} onChange={(e) => setData(e.target.value)} required placeholder='Fecha de salida' />
          <input type="text" className={styles.Form_input} onChange={(e) => setPrice(e.target.value)} required placeholder='Costo del viaje' />
          <button id={styles.Form_loginButton} type="submit">Enviar</button>

        </form>
      </div>
    </div>
  )
}
export default DriverRegisterForm

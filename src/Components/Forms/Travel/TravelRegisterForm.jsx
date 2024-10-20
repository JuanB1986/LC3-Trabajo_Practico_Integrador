import React from 'react'
import styles from './TravelRegisterForm.module.css'
import { useState } from 'react';

const DriverRegisterForm = () => {

  const [nroViaje, setNroViaje] = useState('');
  const [origen, setOrigen] = useState('');
  const [destino, setDestino] = useState('');
  const [fechaSalida, setFechaSalida] = useState('');
  const [costo, setCosto] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const travelData = {
      nroViaje,
      origen,
      destino,
      fechaSalida,
      costo,
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

          <input type="text" className={styles.Form_input} onChange={(e) => setNroViaje(e.target.value)} required placeholder='Nº de Viaje'/>
          <input type="text" className={styles.Form_input} onChange={(e) => setOrigen(e.target.value)} required placeholder='Origen'/>
          <input type="text" className={styles.Form_input} onChange={(e) => setFechaSalida(e.target.value)} required placeholder='Fecha de salida'/>
          <input type="text" className={styles.Form_input} onChange={(e) => setCosto(e.target.value)} required placeholder='Costo del viaje'/>
          <button id={styles.Form_loginButton} type="submit">Enviar</button>

        </form>
      </div>    
    </div>
  )
}
export default DriverRegisterForm

import React from 'react'
import styles from './DriverRegisterForm.module.css'
import { useState } from 'react';

const DriverRegisterForm = () => {

  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [dni, setDni] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [kilometros, setKilometros] = useState('');
  const [patente, setPatente] = useState('');
  const [asientos, setAsientos] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const driverData = {
      nombre,
      apellido,
      dni,
      telefono,
      email,
      password,
      vehiculo: {
        marca,
        modelo,
        kilometros,
        patente,
        asientos,
      },
    };
  
    try {
      const response = await fetch("https://localhost:7080/api/Driver", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(driverData),
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
        <h5 id={styles.Form_titulo}>Registro del Conductor</h5>
        <form onSubmit={handleSubmit}>
        
            <p className={styles.Form_Subtitle}>Datos del Conductor</p>
            <input type="text" className={styles.Form_input} onChange={(e) => setNombre(e.target.value)} required placeholder='Nombre'/>
            <input type="text" className={styles.Form_input} onChange={(e) => setApellido(e.target.value)} required placeholder='Apellido'/>
            <input type="text" className={styles.Form_input} onChange={(e) => setDni(e.target.value)} required placeholder='DNI'/>
            <input type="text" className={styles.Form_input} onChange={(e) => setTelefono(e.target.value)} required placeholder='Telefono'/>
            <input type="text" className={styles.Form_input} onChange={(e) => setEmail(e.target.value)} required placeholder='Email'/>
            <input type="password" className={styles.Form_input} onChange={(e) => setPassword(e.target.value)} required placeholder='Contraseña'/>
            <p className={styles.Form_Subtitle}>Datos del Vehiculo</p>
            <input type="text" className={styles.Form_input} onChange={(e) => setMarca(e.target.value)} required placeholder='Marca'/>
            <input type="text" className={styles.Form_input} onChange={(e) => setModelo(e.target.value)} required placeholder='Modelo'/>
            <input type="text" className={styles.Form_input} onChange={(e) => setKilometros(e.target.value)} required placeholder='Kilometros'/>
            <input type="text" className={styles.Form_input} onChange={(e) => setPatente(e.target.value)} required placeholder='Patente'/>
            <input type="text" className={styles.Form_input} onChange={(e) => setAsientos(e.target.value)} required placeholder='Cantidad Asientos'/>
  

          <button id={styles.Form_loginButton} type="submit">Enviar</button>

        </form>
      </div>    
    </div>
  )
}

export default DriverRegisterForm

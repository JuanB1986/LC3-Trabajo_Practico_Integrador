import styles from './PassengerRegisterForm.module.css'
import { useState } from 'react';

const DriverRegisterForm = () => {

  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dni, setDni] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const passengerData = {
      name,
      lastName,
      dni,
      phoneNumber,
      email,
      password,

    };

    try {
      const response = await fetch("https://localhost:7080/api/Passenger", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(passengerData),
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
        <h5 id={styles.Form_titulo}>Registro del Pasajero</h5>
        <form onSubmit={handleSubmit}>

          <input type="text" className={styles.Form_input} onChange={(e) => setName(e.target.value)} required placeholder='Nombre' />
          <input type="text" className={styles.Form_input} onChange={(e) => setLastName(e.target.value)} required placeholder='Apellido' />
          <input type="text" className={styles.Form_input} onChange={(e) => setDni(e.target.value)} required placeholder='DNI' />
          <input type="text" className={styles.Form_input} onChange={(e) => setPhoneNumber(e.target.value)} required placeholder='Número de teléfono' />
          <input type="text" className={styles.Form_input} onChange={(e) => setEmail(e.target.value)} required placeholder='Email' />
          <input type="password" className={styles.Form_input} onChange={(e) => setPassword(e.target.value)} required placeholder='Contraseña' />

          <button id={styles.Form_loginButton} type="submit">Enviar</button>

        </form>
      </div>
    </div>
  )
}

export default DriverRegisterForm

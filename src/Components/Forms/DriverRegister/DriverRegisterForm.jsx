import styles from './DriverRegisterForm.module.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "react-bootstrap";

const DriverRegisterForm = () => {

  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dni, setDni] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [kilometers, setKilometers] = useState('');
  const [licensePlate, setLicensePlate] = useState('');
  const [capacity, setCapacity] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const driverData = {
      name,
      lastName,
      dni,
      phoneNumber,
      email,
      password,
      car: {
        brand,
        model,
        kilometers,
        licensePlate,
        capacity,
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

      if (response.ok) {
        const data = await response.json();
        console.log('Datos enviados:', data);
        alert('¡Registro exitoso!');
        navigate("/iniciar-sesion");
      } else {
        throw new Error('Error en la red');
      }
    } catch (error) {
      console.error('Error al enviar los datos:', error);
    }
  };

  const handleHome = () => {
    navigate("/iniciar-sesion")
  }

  return (
    <div className={styles.Login_fondo}>
      <header className={styles.header}>
        <span className={styles.header_span}>TravelRos</span>
        <div>
          <Button onClick={handleHome} variant="outline-success">VOLVER</Button>
        </div>
      </header>
      <hr className={styles.linea} />

      <h1 className={styles.subtitulo} >Registro de conductor</h1>
      <div className={styles.Form_fondo}>
        <div className={styles.Form_contenedor}>
          <form onSubmit={handleSubmit}>

            <p className={styles.Form_Subtitle}>Datos del Conductor</p>
            <input type="text" className={styles.Form_input} onChange={(e) => setName(e.target.value)} required placeholder='Nombre' />
            <input type="text" className={styles.Form_input} onChange={(e) => setLastName(e.target.value)} required placeholder='Apellido' />
            <input type="text" className={styles.Form_input} onChange={(e) => setDni(e.target.value)} required placeholder='DNI' />
            <input type="text" className={styles.Form_input} onChange={(e) => setPhoneNumber(e.target.value)} required placeholder='Número de teléfono' />
            <input type="text" className={styles.Form_input} onChange={(e) => setEmail(e.target.value)} required placeholder='Email' />
            <input type="password" className={styles.Form_input} onChange={(e) => setPassword(e.target.value)} required placeholder='Contraseña' />
            <p className={styles.Form_Subtitle}>Datos del Vehiculo</p>
            <input type="text" className={styles.Form_input} onChange={(e) => setBrand(e.target.value)} required placeholder='Marca' />
            <input type="text" className={styles.Form_input} onChange={(e) => setModel(e.target.value)} required placeholder='Modelo' />
            <input type="text" className={styles.Form_input} onChange={(e) => setKilometers(e.target.value)} required placeholder='Kilometros' />
            <input type="text" className={styles.Form_input} onChange={(e) => setLicensePlate(e.target.value)} required placeholder='Patente' />
            <input type="text" className={styles.Form_input} onChange={(e) => setCapacity(e.target.value)} required placeholder='Cantidad de asientos' />

            <button className={styles.Form_loginButton} type="submit">Enviar</button>

          </form>
        </div>
      </div>
    </div>
  )
}

export default DriverRegisterForm

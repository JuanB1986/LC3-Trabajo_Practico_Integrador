import styles from './TravelCreateModifyForm.module.css'
import { useState } from 'react';

const TravelCreateModifyForm = () => {

  const [travelId, setTravelId] = useState('');
  const [driverId, setDriverId] = useState('');
  const [startDirection, setStartDirection] = useState('');
  const [endDirection, setEndDirection] = useState('');
  const [startTime, setTime] = useState('');
  const [price, setPrice] = useState('');
  const [option, setOption] = useState(false)
  const [inputIdType, setInputIdType]=useState("hidden")
  const [message, setMessage] = useState("");

  const route = "https://localhost:7080/api/Travel";

  const handleSubmit = async (event) => {
    event.preventDefault();

    setDriverId(1)      //Aca hay que pasar el Id del conductor que esta logueado.

    const travelDataModify = {
      travelId: travelId,
      startDirection: startDirection,
      endDirection: endDirection,
      startTime: startTime,
      price: price,
    };

    const travelDataCreate = {
      driverId: driverId,
      startDirection: startDirection,
      endDirection: endDirection,
      startTime: startTime,
      price: price,
    };

    try {
      console.log(travelDataModify)
      const response = await fetch(option == false ? route : route+"/"+travelId, 
      {
        method: option == false ? 'POST' : 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(option == false ? travelDataCreate : travelDataModify),
      });

      if (!response.ok) {
        messageHandler("Error del servidor")
        throw new Error('Error en la red');        
      }

      const data = await response.json();
      console.log('Datos enviados:', data);
      messageHandler("Modificado / Creado correctamente")

    } catch (error) {      
      messageHandler("Error al enviar los datos")
    }
  };

  const handlerOption1 = () =>{ //nuevo viaje sin ID
    setOption(false)
    setInputIdType("hidden")
  }

  const handlerOption2 = () =>{ //Modificar viaje con ID por path
    setOption(true)
    setInputIdType("text")
  }

  const messageHandler = (mens) =>{
    setMessage(mens)
    setTimeout(() => {   
      setMessage("")   
    }, 2500);    
  }

  return (
    <div className={styles.Form_fondo}>
      <div id={styles.Form_contenedor}>
        <h5 id={styles.Form_titulo}>Crear / Modificar viaje</h5>

        <form onSubmit={handleSubmit}>

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

        <input type={inputIdType} className={styles.Form_input} onChange={(e) => setTravelId(e.target.value)} required placeholder='Nº de Viaje' />
        <input type="text" className={styles.Form_input} onChange={(e) => setStartDirection(e.target.value)} required placeholder='Origen' />
        <input type="text" className={styles.Form_input} onChange={(e) => setEndDirection(e.target.value)} required placeholder='Destino' />
        <input type="text" className={styles.Form_input} onChange={(e) => setTime(e.target.value)} required placeholder='Fecha' />
        <input type="text" className={styles.Form_input} onChange={(e) => setPrice(e.target.value)} required placeholder='Precio' />
        <button id={styles.Form_loginButton} type="submit">Enviar</button>
        <p className={styles.Form_message}>{message}</p>
        </form>
      </div>
    </div>
  )
}
export default TravelCreateModifyForm

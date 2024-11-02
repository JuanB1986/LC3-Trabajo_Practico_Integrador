import React from 'react'
import styles from './SysAdmin.module.css'
import { Button } from "react-bootstrap";
import { useAutenticacion } from '../../Components/Contexts/ContextoAutenticacion.jsx';

const SysAdmin = () => {

    const handleSearch = (filters) => {
      console.log('Filtros aplicados:', filters);
  };

  const { login, logout } = useAutenticacion();

  const handleInicio = () =>{
    logout();
  }

  return (
    <>
        <header className={styles.header}>
          <span className={styles.header_span}>TravelRos</span>
          <div>
              <Button onClick={handleInicio} variant="outline-success">Cerrar Sesión</Button>
          </div>
        </header>
        
        <hr className={styles.linea} />

        <h1 id={styles.subtitulo} >Administrador</h1>

        <div className={styles.contenedor2}>
           
        </div>
        <footer className={styles.footer}>

        </footer>
    </>
)
}

export default SysAdmin

import styles from "./Mytravels.module.css";
import { Button } from "react-bootstrap";
import Travel from "../../Components/Travel/Travel.jsx";
import { useAutenticacion } from '../../Components/Contexts/AuthenticationContext.jsx';
import DriversTravels from "../../Components/getDriversTravels.jsx";
import TravelCreateModifyForm from "../../Components/Forms/TravelCreateModifyForm/TravelCreateModifyForm.jsx";


const MyReservations = () => { 

    const filterFields1 = [
        { name: 'Origen', type: 'text' },
        { name: 'Destino', type: 'text' },
        { name: 'Fecha', type: 'date' },
      ];

    const handleSearch = (filters) => {
        console.log('Filtros aplicados:', filters);
    };

    const { login, logout } = useAutenticacion();

    const handleInicio = () =>{
      logout();
    }


    return (
        <div>
            <header className={styles.header}>
              <span className={styles.header_span}>TravelRos</span>
              <div>
                  <Button onClick={handleInicio} variant="outline-success">Cerrar Sesión</Button>
              </div>
            </header>
            
            <hr className={styles.linea} />

            <h1 id={styles.subtitulo} >Mis Viajes</h1>

            <div className={styles.contenedor2}>
                <DriversTravels />
                <TravelCreateModifyForm />
            </div>

            <footer className={styles.footer}>

            </footer>
        </div>
    )
}

export default MyReservations

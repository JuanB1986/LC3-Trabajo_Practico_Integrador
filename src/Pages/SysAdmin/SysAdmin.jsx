import styles from './SysAdmin.module.css'
import { Button } from "react-bootstrap";
import { useAutenticacion } from '../../Components/Contexts/AuthenticationContext.jsx';
import DynamicFilter from "../../Components/DynamicFilter/DynamicFilter.jsx"
import UserList from '../../Components/getUserList.jsx';
import { useNavigate } from 'react-router-dom';

const SysAdmin = () => {

  const navigate = useNavigate();

  const filterFields1 = [
    { name: 'Nombre', type: 'text' },
    { name: 'Apellido', type: 'text' },
  ];

  const handleSearch = (filters) => {
    console.log('Filtros aplicados:', filters);
  };
  const { logout } = useAutenticacion();

  const handleInicio = () => {
    logout();
  }

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <span className={styles.header_span}>TravelRos</span>
        <div>
          <Button onClick={()=>{navigate("/driverRegister")}} variant="outline-primary">Registrar Conductor</Button>
          <Button onClick={handleInicio} variant="outline-success">Cerrar Sesión</Button>
        </div>
      </header>
      <main>
        <hr className={styles.linea} />
        <div className={styles.filter}>
          <h1>Lista de Usuarios Activos</h1>

          <DynamicFilter fields={filterFields1} onSearch={handleSearch} />
        </div>
        <hr className={styles.linea} />

        <div className={styles.contenedor2}>
          <UserList/>
        </div>

      </main>
      <footer className={styles.footer}>

      </footer>
    </div>
  )
}

export default SysAdmin

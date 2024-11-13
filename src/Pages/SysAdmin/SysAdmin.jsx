import styles from './SysAdmin.module.css'
import { Button } from "react-bootstrap";
import { useAutenticacion } from '../../Components/Contexts/AuthenticationContext.jsx';
import DynamicFilter from "../../Components/DynamicFilter/DynamicFilter.jsx"
import UserList from '../../Components/getUserList.jsx';
import { useNavigate } from 'react-router-dom';
import Footer from '../../Components/Footer/Footer.jsx';

const SysAdmin = () => {

  const navigate = useNavigate();
  const { logout } = useAutenticacion();

  // Definición de los campos para el filtro dinámico
  const filterFields1 = [
    { name: 'Nombre', type: 'text' },
    { name: 'Apellido', type: 'text' },
  ];

  // Manejar la búsqueda y aplicar filtros
  const handleSearch = (filters) => {
    console.log('Filtros aplicados:', filters);
  };

  // Cierra la sesión del administrador
  const handleInicio = () => {
    logout();
  }

  // Navega a la página de registro de conductor
  const handleRegisterDriver = () => {
    navigate("/driverRegister");
  }

  return (
    <div className={styles.dashboard}>

      {/* ENCABEZADO */}
      <header className={styles.header}>
        <span className={styles.header_span}>TravelRos</span>
        <div>
          <Button onClick={handleRegisterDriver} variant="outline-primary">Registrar Conductor</Button>
          <Button onClick={handleInicio} variant="outline-success">Cerrar Sesión</Button>
        </div>
      </header>

      {/* CONTENIDO PRINCIPAL */}
      <main>
        <hr className={styles.linea} />
        <div className={styles.filter}>
          <h1>Lista de Usuarios Activos</h1>

          <DynamicFilter fields={filterFields1} onSearch={handleSearch} />
        </div>
        <hr className={styles.linea} />

        <div className={styles.contenedor2}>
          <UserList />
        </div>
      </main>

      {/* PIE DE PÁGINA */}
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default SysAdmin

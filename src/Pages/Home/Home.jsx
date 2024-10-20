import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import useAutenticacion from '../../hooks/useAtenticacion.js';
import DynamicFilter from '../../Components/DynamicFilter/DynamicFilter.jsx';
import Travel from '../../Components/Travel.jsx';
import ListaPasajeros from '../../Components/getPassangerList.jsx';
import styles from './Home.module.css';

const travels = [
    {
      id: 1,
      origen: "Buenos Aires",
      destino: "Córdoba",
      fecha: new Date(2024, 9, 15), 
      hora: "14:30",
      asientos: 3,
      precio: 1500,
    },
    {
      id: 2,
      origen: "Rosario",
      destino: "Santa Fe",
      fecha: new Date(2024, 10, 20), 
      hora: "09:00",
      asientos: 5,
      precio: 800,
    },
    {
      id: 3, 
      origen: "Mendoza",
      destino: "San Juan",
      fecha: new Date(2024, 11, 5), 
      hora: "16:45",
      asientos: 4,
      precio: 1200,
    },
    {
      id: 4,
      origen: "La Plata",
      destino: "Mar del Plata",
      fecha: new Date(2024, 7, 22), 
      hora: "07:30",
      asientos: 2,
      precio: 1700,
    },
  ];
 

const Home = () => { 
    const filterFields1 = [
        { name: 'Origen', type: 'text' },
        { name: 'Destino', type: 'text' },
        { name: 'Fecha', type: 'date' },
      ];

  const handleSearch = (filters) => {
    console.log('Filtros aplicados:', filters);
  };

  return (
    <>
      <ListaPasajeros />
      <header className={styles.header}>
        <span className={styles.header_span}>TravelRos</span>
        <div>
          {isAuthenticated ? (
            <Button variant="outline-danger" onClick={handleLogout}>Cerrar Sesión</Button>
          ) : (
            <Button variant="outline-success" onClick={handleLogin}>Iniciar Sesión</Button>
          )}
        </div>
      </header>
      <hr className={styles.linea} />
      <div className={styles.filter}>
        <DynamicFilter fields={filterFields1} onSearch={handleSearch} />
      </div>
      <hr className={styles.linea} />
      <div className={styles.contenedor2}>
        <Travel travels={travels} />
      </div>
      <footer className={styles.footer}></footer>
    </>
  );
};

export default Home
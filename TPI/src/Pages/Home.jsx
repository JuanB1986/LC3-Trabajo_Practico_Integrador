import "./Css/Home.css";
import { Button } from "react-bootstrap";
import TravelItem from "../Components/TravelItem"
import DynamicFilter from "../Components/DynamicFilter";

const Home = () => {

    const filterFields1 = [
        { name: 'Origen', type: 'text' },
        { name: 'Destino', type: 'text' },
        { name: 'Fecha', type: 'date' },
      ];

    // Función para manejar la búsqueda
    const handleSearch = (filters) => {
        console.log('Filtros aplicados:', filters);
    };
    return (
        <>
            <header>
                <span>TravelRos</span>
                <div>
                    <a href="">Mis Reservas</a>
                    <Button variant="outline-success">Iniciar Sesión</Button>
                </div>
            </header>

            <hr className="linea" />
            <div className="filter">
                <DynamicFilter fields={filterFields1} onSearch={handleSearch} />
            </div>
            <hr className="linea" />

            <div className="contenedor2">
                <TravelItem />
                <TravelItem />
                <TravelItem />
                <TravelItem />
                <TravelItem />
                <TravelItem />
            </div>
            <footer>

            </footer>
        </>
    )
}

export default Home
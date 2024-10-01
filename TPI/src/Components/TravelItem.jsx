

import './Css/TravelItem.css';

const TravelItem = () => {
    return (
        <div className="contenedor">
            <div className='left'>
                    <span className='secundario'>Fecha: dd/mm/aaaa</span>
                    <span className='principal'>Origen - Destino</span>
                    <span className='secundario'>Horario: hh:mm</span>
                    <span className='secundario'>Asientos disponibles: X</span>
                    <span className='secundario'> ID del Viaje: #0000 </span>
            </div>

            <div className='right'>
                <div>$9999.99</div>
                <button className="delete-button">Reservar</button>
            </div>

        </div>
    );
}

export default TravelItem;

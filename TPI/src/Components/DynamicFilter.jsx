import "./Css/DynamicFilter.css"
import { useState } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Importar los estilos de react-datepicker

const DynamicFilter = ({ fields, onSearch }) => {

  const [filters, setFilters] = useState({});


  const handleChange = (field, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [field]: value,
    }));
  };

  // Manejar la acción de búsqueda
  const handleSearch = () => {
    onSearch(filters);
  };

  return (
    <>
      <h1>Buscá con quién compartir tu próximo viaje!</h1>
      <h6>¡Elegí fecha, origen o destino y encontralo!</h6>

      <div className='filter-container'>
        {fields.map(({ name, type }) => (
          <div key={name} className='field-container'>
            {type === 'date' ? (
              // Selector de fecha con react-datepicker
              <DatePicker
                selected={filters[name] || null}
                onChange={(date) => handleChange(name, date)}
                placeholderText={name}
                dateFormat="dd/MM/yyyy"
                className='date-picker' // Clase para aplicar estilos desde CSS
              />
            ) : (
              // Input de texto estándar
              <input
                type="text"
                placeholder={name}
                value={filters[name] || ''}
                onChange={(e) => handleChange(name, e.target.value)}
                className='text-input' // Clase para aplicar estilos desde CSS
              />
            )}
            <span>(opcional)</span>
          </div>
        ))}
        <button className='search-button' onClick={handleSearch}>
          BUSCAR
        </button>
      </div>
    </>
  );
};


DynamicFilter.propTypes = {
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      type: PropTypes.oneOf(['text', 'date']).isRequired,
    })).isRequired,
  onSearch: PropTypes.func.isRequired,
};

export default DynamicFilter;
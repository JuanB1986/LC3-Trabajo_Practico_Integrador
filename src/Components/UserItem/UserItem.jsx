import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './UserItem.module.css';

const UserItem = ({ userId, name, lastName, dni, phoneNumber, email, role }) => {
  const [userData, setUserData] = useState({ name, lastName, dni, phoneNumber, email });
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handlerEliminar = async(e) => {
    const token = localStorage.getItem('token');
    e.preventDefault();

    const endpoint = role === 'Driver' 
      ? `https://localhost:7080/api/Driver/${userId}` 
      : `https://localhost:7080/api/Passenger/${userId}`;

    try {
      const response = await fetch(endpoint, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        console.log("Eliminado con exito.")
      } else {
        console.error('Failed to update user');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  const handleCancel = () => {
    setIsEditing(false);
    setUserData({ name, lastName, dni, phoneNumber, email });
  };
  

  const handleSubmit = async (e) => {
    const token = localStorage.getItem('token');
    e.preventDefault();
    const endpoint = role === 'Driver' 
      ? `https://localhost:7080/api/Driver/${userId}` 
      : `https://localhost:7080/api/Passenger/${userId}`;

    try {
      const response = await fetch(endpoint, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        setIsEditing(false);
      } else {
        console.error('Failed to update user');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className={styles.contenedor}>
      {isEditing ? (
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.left}>
            <input
              type="text"
              name="name"
              placeholder={name}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder={lastName}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="dni"
              placeholder={dni}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="phoneNumber"
              placeholder={phoneNumber}
              onChange={handleInputChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder={email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className={styles.rightAlignedButtons}>
            <button type="submit" className={styles.save_button}>Guardar</button>
            <button type="button" onClick={handleCancel} className={styles.cancel_button}>Cancelar</button>
          </div>
        </form>
      ) : (
        <>
          <div className={styles.left}>
            <span className={styles.principal}>{name} {lastName} - {role}</span>
            <span className={styles.secundario}>Dni: {dni}</span>
            <span className={styles.secundario}>Teléfono: {phoneNumber}</span>
            <span className={styles.secundario}>Email: {email}</span>
            <span className={styles.secundario}> Nº de Usuario: {userId} </span>
          </div>
          <div className={styles.right}>
            <button onClick={handleEdit} className={styles.modify_button}>Modificar</button>
            {!isEditing && (
              <button onClick={handlerEliminar}  className={styles.delete_button}>Eliminar</button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

UserItem.propTypes = {
  userId: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  dni: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
};

export default UserItem;
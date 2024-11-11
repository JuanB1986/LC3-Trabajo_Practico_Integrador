import { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from "react-bootstrap";
import styles from './UserItem.module.css';

const UserItem = ({ userId, name, lastName, dni, phoneNumber, email, role, onUserUpdate }) => {
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

  const handlerEliminar = async (e) => {

    e.preventDefault();
    const token = localStorage.getItem('token');
    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este usuario?");
    if (!confirmDelete) {
      return;
    }

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
        onUserUpdate();
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
        onUserUpdate();
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
            <Button variant="success" type="submit">Guardar</Button>
            <Button variant="secondary" type="button" onClick={handleCancel}>Cancelar</Button>
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
            <Button variant="success" onClick={handleEdit}>Modificar</Button>
            {!isEditing && (
              <Button variant="danger" onClick={handlerEliminar}>Eliminar</Button>
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
  onUserUpdate: PropTypes.func.isRequired,
};

export default UserItem;
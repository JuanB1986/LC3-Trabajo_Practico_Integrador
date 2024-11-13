import { useEffect, useState } from 'react';
import User from "./User/User";

// Componente que maneja la lista de usuarios y su estado de carga
const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null)

  // Función para obtener la lista de usuarios desde la API
  const fetchUsers = () => {
    const token = localStorage.getItem('token');

    // Realiza la solicitud al servidor
    fetch("https://localhost:7080/api/Admin/all-users", {
      method: "GET",
      mode: "cors",
      headers: {
        Authorization: `Bearer ${token}`,
        accept: "application/json",
      },
    })
      .then((response) => {

        // Lanza un error si la respuesta de la API no es exitosa
        if (!response.ok) throw new Error('Network response was not ok')

        return response.json();
      })
      .then((users) => {

        // Mapea y ordena los usuarios obtenidos antes de almacenarlos en el estado
        const listadoUsers = users
          .map((user) => ({
            userId: user.id,
            name: user.name,
            lastName: user.lastName,
            dni: user.dni,
            phoneNumber: user.phoneNumber,
            email: user.email,
            role: user.role,
          }))
          .sort((a, b) => a.travelId - b.travelId);

        setUsers(listadoUsers);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching travels:", error);
        setError(error.message);
        setLoading(false);
      });
  };

  // Llama a `fetchUsers` una vez al montar el componente para obtener los datos iniciales
  useEffect(() => { fetchUsers() }, [])

  // Actualiza la lista de usuarios
  const handleUserUpdate = () => fetchUsers();

  // Muestra un mensaje de carga si los datos aún se están obteniendo
  if (loading) return <div>Cargando lista de viajes...</div>;

  // Muestra un mensaje de error si ocurre un problema durante la carga
  if (error) return <div>Error: {error}</div>;

  // Renderiza el componente `User` con la lista de usuarios obtenida y el manejador de actualizaciones
  return (
    <>
      <User users={users} onUserUpdate={handleUserUpdate} />
    </>
  );
};

export default UserList;

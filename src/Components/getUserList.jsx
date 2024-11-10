import { useEffect, useState } from 'react';
import User from "./User/User";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch("https://localhost:7080/api/Admin/all-users", {
      method: "GET",
      mode: "cors",
      headers: {
        accept: "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((users) => {
        const listadoUsers = users
          .map((user) => ({
            userId:user.id,
            name:user.name,
            lastName:user.lastName,
            dni:user.dni,
            phoneNumber:user.phoneNumber,
            email:user.email,
            role:user.role,
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
  }, []);

  if (loading) {
    return <div>Cargando lista de viajes...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <User users={users}/>
    </div>
  );
};

export default UserList;

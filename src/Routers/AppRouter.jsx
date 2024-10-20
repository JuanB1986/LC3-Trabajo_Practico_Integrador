import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import RutaPrivada from '../Components/RutaPrivada';
import Login from '../Pages/Login/Login';
import Home from '../Pages/Home/Home';
import MyTravels from '../Pages/MisViajes/MyTravels';
import MyReservations from '../Pages/MisReservas/Myreservations';
import SysAdmin from '../Pages/SysAdmin/SysAdmin'
import { useState, useEffect } from 'react';

const AppRouter = () => {

  const [role, setRole] = useState("")
  

  useEffect(() => {
    
    const storedRole = localStorage.getItem("UserRole");

    setRole(storedRole); 
}, []);
 

  return (   
    <Router>
        <Routes>
          <Route path="/iniciar-sesion" element={<Login />} />
          <Route path="/inicio" element={<RutaPrivada element={            
           
            role === 'admin' ? (<SysAdmin />) : 
            role === 'conductor' ? (<MyTravels />) : 
            role === 'pasajero' ? (<MyReservations />) : 
            (
              <Navigate to="/" />
            )}                
        
         />} />

          <Route path="/" element={<Home/>} />
        </Routes>
    </Router> 
  )
}

export default AppRouter


/*
          <Route path="/iniciar-sesion" element={<Login />} />
          <Route path="/inicio" element={<RutaPrivada element={<Home />} />} />
          <Route path="/" element={<Navigate to="/iniciar-sesion" />} />



            <RutaPrivada>
              {userRole === 'admin' ? (<SysAdmin />) : 
              userRole === 'conductor' ? (<MyTravels />) : 
              userRole === 'pasajero' ? (<MyReservations />) : 
              (
                <Navigate to="/" />
              )}
            </RutaPrivada>           
            



*/
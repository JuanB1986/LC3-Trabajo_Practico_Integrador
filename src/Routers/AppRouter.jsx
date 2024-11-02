import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import RutaPrivadaAdmin from '../Components/PrivateRoutes/RutaPrivadaAdmin';
import RutaPrivadaConductor from '../Components/PrivateRoutes/RutaPrivadaConductor';
import RutaPrivadaPasajero from '../Components/PrivateRoutes/RutaPrivadaPasajero';
import Login from '../Pages/Login/Login';
import Home from '../Pages/Home/Home';
import MyTravels from '../Pages/MisViajes/MyTravels';
import SysAdmin from '../Pages/SysAdmin/SysAdmin'
import MyReservations from '../Pages/MisReservas/MyReservations'

const AppRouter = () => {

  return (   
    <Router>
        <Routes>
          <Route path="/iniciar-sesion" element={<Login />} />
          <Route path="/conductor" element={<RutaPrivadaConductor element={<MyTravels />} />} />
          <Route path="/pasajero" element={<RutaPrivadaPasajero element={<MyReservations />} />} />
          <Route path="/admin" element={<RutaPrivadaAdmin element={<SysAdmin />} />} />
          <Route path="/" element={<Home/>} />
        </Routes>
    </Router> 
  )
}

export default AppRouter
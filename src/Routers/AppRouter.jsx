import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import RutaPrivada from '../Components/RutaPrivada';
import Login from '../Pages/Login/Login';
import Home from '../Pages/Home/Home';


const AppRouter = () => {
  return (   
    <Router>
        <Routes>
            <Route path="/iniciar-sesion" element={<Login />} />
            <Route path="/inicio" element={<RutaPrivada element={<Home />} />} />
            <Route path="/" element={<Navigate to="/iniciar-sesion" />} />
        </Routes>
    </Router> 
  )
}

export default AppRouter

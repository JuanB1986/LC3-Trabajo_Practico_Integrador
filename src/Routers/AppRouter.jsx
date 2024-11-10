import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import PrivateRoutes from '../Components/PrivateRoutes';
import Login from '../Pages/Login/Login';
import Home from '../Pages/Home/Home';
import MyTravels from '../Pages/MisViajes/MyTravels';
import SysAdmin from '../Pages/SysAdmin/SysAdmin'
import PassengerregisterForm from '../Components/Forms/PassengerRegister/PassengerRegisterForm.jsx'
import DriverRegisterForm from '../Components/Forms/DriverRegister/DriverRegisterForm.jsx'
import MyReservations from '../Pages/MisReservas/MyReservations.jsx'

const AppRouter = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/iniciar-sesion" element={<Login />} />
        <Route path="/driverRegister" element={<DriverRegisterForm />} />
        <Route path="/passengerRegister" element={<PassengerregisterForm />} />
        <Route path="/conductor" element={<PrivateRoutes element={<MyTravels />} requiredRole="Driver" />} />
        <Route path="/pasajero" element={<PrivateRoutes element={<Home />} requiredRole="Passenger" />} />
        <Route path="/mis-reservas" element={<MyReservations />} />
        <Route path="/admin" element={<PrivateRoutes element={<SysAdmin />} requiredRole="Admin" />} />
      </Routes>
    </Router>
  )
}

export default AppRouter
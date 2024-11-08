import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import PrivateRoutes from '../Components/PrivateRoutes';
import Login from '../Pages/Login/Login';
import Home from '../Pages/Home/Home';
import MyTravels from '../Pages/MisViajes/MyTravels';
import SysAdmin from '../Pages/SysAdmin/SysAdmin'

import PassengerregisterForm from '../Components/Forms/PassengerRegister/PassengerRegisterForm.jsx'
import DriverRegisterForm from '../Components/Forms/DriverRegister/DriverRegisterForm.jsx'


const AppRouter = () => {

  return (
    <Router>
      <Routes>
        <Route path="/driverRegister" element={<DriverRegisterForm />} />
        <Route path="/passengerRegister" element={<PassengerregisterForm />} />
        <Route path="/iniciar-sesion" element={<Login />} />
        <Route path="/conductor" element={<PrivateRoutes element={<MyTravels />} requiredRole="conductor" />} />
        <Route path="/pasajero" element={<PrivateRoutes element={<Home />} requiredRole="pasajero" />} />
        <Route path="/admin" element={<PrivateRoutes element={<SysAdmin />} requiredRole="admin" />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  )
}

export default AppRouter
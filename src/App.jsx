import { ProveedorAutenticacion } from './Components/ContextoAutenticacion';
import AppRouter from './Routers/AppRouter';
function App() {

  return (
    <ProveedorAutenticacion>
        <AppRouter />
    </ProveedorAutenticacion>
  )
}

export default App

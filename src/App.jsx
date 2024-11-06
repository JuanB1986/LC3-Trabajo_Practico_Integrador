import { AuthenticationProvider } from './Components/Contexts/AuthenticationContext';
import AppRouter from './Routers/AppRouter';
function App() {

  return (
    <AuthenticationProvider>
        <AppRouter />
    </AuthenticationProvider>
  )
}

export default App

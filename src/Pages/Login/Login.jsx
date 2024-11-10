import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "react-bootstrap";
import { useAutenticacion } from '../../Components/Contexts/AuthenticationContext.jsx';
import styles from './Login.module.css';

const Login = () => {
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAutenticacion();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (usuario === '' || password === '') {
            setError('Campos vacíos.');
            return;
        }

        try {
            const response = await fetch('https://localhost:7080/api/authentication/authenticate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: usuario, password: password }),
            });

            if (!response.ok) {
                setError('Usuario o contraseña incorrectos.');
                return;
            }

            // Obtenemos la respuesta como JSON para extraer el token, role e id
            const authResponse = await response.json();

            // Llamamos a la función login del contexto, pasando los datos extraidos anteriormente
            login(authResponse.token, authResponse.role, authResponse.id);

            const from = location.state?.from?.pathname;
            if (from) {
                navigate(from, { replace: true });
            } else {
                switch (authResponse.role) {
                    case "Driver":
                        navigate("/conductor", { replace: true });
                        break;
                    case "Passenger":
                        navigate("/pasajero", { replace: true });
                        break;
                    case "Admin":
                        navigate("/admin", { replace: true });
                        break;
                    default:
                        navigate("/", { replace: true });
                        break;
                }
            }

        } catch (error) {
            console.error('Error al autenticar:', error);
            setError('Ocurrió un error. Inténtalo de nuevo.');
        }
    };

    const handleHome = () => {
        navigate("/");
    };

    const handlesPassengerRegister = () => {
        navigate("/passengerRegister");
    };

    const handleDriverRegister = () => {
        navigate("/driverRegister");
    };

    return (
        <div className={styles.Login_fondo}>
            <header className={styles.header}>
                <span className={styles.header_span}>TravelRos</span>
                <div>
                    <Button onClick={handleHome} variant="outline-success">HOME</Button>
                </div>
            </header>

            <hr className={styles.linea} />

            <h1 className={styles.subtitulo}>Login</h1>

            <div className={styles.Login_contenedor}>
                <h5 className={styles.Login_titulo}>Iniciar sesión / Registrarse</h5>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        className={styles.Login_input}
                        placeholder='Usuario'
                        value={usuario}
                        onChange={(e) => setUsuario(e.target.value)}
                        required
                    />

                    <input
                        type="password"
                        className={styles.Login_input}
                        placeholder='Contraseña'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button className={styles.Login_loginButton} type="submit">Iniciar sesión</button>
                    <hr></hr>
                    <p className={styles.Login_tituloRegistro}>¿ No estás registrado ?</p>

                    <button
                        className={styles.Login_registerButton}
                        onClick={handlesPassengerRegister}
                        type="button">Registrarse como Pasajero
                    </button>

                    <button
                        className={styles.Login_registerButton}
                        onClick={handleDriverRegister}
                        type="button">Registrarse como Conductor
                    </button>

                    {error && <p className={styles.Login_errorLabel}>{error}</p>}
                </form>
            </div>
        </div>
    );
};

export default Login;

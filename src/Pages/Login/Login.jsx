import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAutenticacion } from '../../Components/ContextoAutenticacion';
import styles from './Login.module.css'

const Login = () => {
    const { login } = useAutenticacion();
    const navigate = useNavigate();
    const location = useLocation();
    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        if (usuario === '' || password === '') {
            setError('Campos vacíos.');
            return;
        }

        if (usuario === 'admin' && password === '123') {
            const fakeToken = '1234567890abcdef'; 
            login(fakeToken);
            
            localStorage.setItem("UserRole","admin");

            const from = location.state?.from?.pathname || '/inicio';
            navigate(from, { replace: true });
        } else {
            setError('Usuario o contraseña incorrectos.');
        }

        if (usuario === 'conductor' && password === '123') {
            const fakeToken = '1234567890abcdef'; 
            login(fakeToken);
            
            localStorage.setItem("UserRole","conductor");

            const from = location.state?.from?.pathname || '/inicio';
            navigate(from, { replace: true });
        } else {
            setError('Usuario o contraseña incorrectos.');
        }

        if (usuario === 'pasajero' && password === '123') {
            const fakeToken = '1234567890abcdef'; 
            login(fakeToken);
            
            localStorage.setItem("UserRole","pasajero");

            const from = location.state?.from?.pathname || '/inicio';
            navigate(from, { replace: true });
        } else {
            setError('Usuario o contraseña incorrectos.');
        }



    };

    return (
        
        <div className={styles.Login_fondo}>   

            <div id={styles.Login_contenedor}>
                <h3 id={styles.Login_titulo}>Login</h3>
                <form onSubmit={handleSubmit}>

                    <input type="text" className={styles.Login_input} placeholder='Usuario' value={usuario} onChange={(e) => setUsuario(e.target.value)} required />
                    <input type="password" className={styles.Login_input} placeholder='Contraseña' value={password} onChange={(e) => setPassword(e.target.value)} required />
                    
                    <button id ={styles.Login_loginButton} type="submit">Iniciar sesión</button>
                    
                    {error && <p id={styles.Login_errorLabel}>{error}</p>}

                </form>
            </div>    
        </div>
    );
};

export default Login;
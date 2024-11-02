import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from "react-bootstrap";
import { useAutenticacion } from '../../Components/Contexts/ContextoAutenticacion.jsx';
import styles from './Login.module.css'

const Login = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login, logout } = useAutenticacion();


    const handleSubmit = (event) => {
        event.preventDefault();

        if (usuario === '' || password === '') {
            setError('Campos vacíos.');
            return;
        }

        //Admin
        if (usuario === 'admin' && password === '123') {
            const fakeToken = '1234567890abcdef'; 
            login(fakeToken, "admin");            

            const from = location.state?.from?.pathname || '/admin';
            navigate(from, { replace: true });
        } else {
            setError('Usuario o contraseña incorrectos.');
        }

        //Conductor
        if (usuario === 'conductor' && password === '123') {
            const fakeToken = '1234567890abcdef'; 
            login(fakeToken, "conductor");

            const from = location.state?.from?.pathname || '/conductor';
            navigate(from, { replace: true });
        } else {
            setError('Usuario o contraseña incorrectos.');
        }

        //Pasajero
        if (usuario === 'pasajero' && password === '123') {
            const fakeToken = '1234567890abcdef'; 
            login(fakeToken, "pasajero");

            const from = location.state?.from?.pathname || '/pasajero';
            navigate(from, { replace: true });
        } else {
            setError('Usuario o contraseña incorrectos.');
        }

    };

    const handleHome = () =>{
        navigate("/")
    }

    return (
        
        <div className={styles.Login_fondo}>   

        
            <header className={styles.header}>
              <span className={styles.header_span}>TravelRos</span>
              <div>
                  <Button onClick={handleHome} variant="outline-success">HOME</Button>
              </div>
            </header>

            <hr className={styles.linea} />

            <h1 id={styles.subtitulo} >Login</h1>

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
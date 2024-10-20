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
            
            const from = location.state?.from?.pathname || '/inicio';
            navigate(from, { replace: true });
        } else {
            setError('Usuario o contraseña incorrectos.');
        }
    };

    return (
        
        <div className={styles.Login_fondo}>   

<<<<<<< Updated upstream
            <div id={styles.Login_contenedor}>
                <h2 id={styles.Login_titulo}>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label className={styles.Login_label} htmlFor="usuario">Usuario:</label>
                        <br></br>
                        <input
                            type="text"
                            className={styles.Login_input}
                            value={usuario}
                            onChange={(e) => setUsuario(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className={styles.Login_label} htmlFor="password">Contraseña:</label>
                        <br></br>
                        <input
                            type="password"
                            className={styles.Login_input}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>                
                    <button id ={styles.Login_loginButton} type="submit">Iniciar sesión</button>
                    {error && <p id='Login_errorLabel'>{error}</p>}
                </form>
            </div>    
        </div>
    );
=======
  return (
    <div className={styles.Form_fondo}>   
      <div id={styles.Form_contenedor}>
        <h2 id={styles.Form_titulo}>Login</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label className={styles.Form_label} htmlFor="usuario">Usuario:</label>
            <input
              type="text"
              className={styles.Form_input}
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              required
            />
          </div>
          <div>
            <label className={styles.Form_label} htmlFor="password">Contraseña:</label>
            <input
              type="password"
              className={styles.Form_input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>                
          <button id={styles.Form_loginButton} type="submit">Iniciar sesión</button>
          {error && <p id='Form_errorLabel'>{error}</p>}
        </form>
      </div>    
    </div>
  );
>>>>>>> Stashed changes
};

export default Login;
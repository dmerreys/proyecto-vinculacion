import { useState, useRef } from 'react';
import { gsap } from 'gsap';
import axios from 'axios';
import '../assets/css/Login.css';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [flipped, setFlipped] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const containerRef = useRef(null);
  const loginButtonRef = useRef(null);
  const navigate = useNavigate();

  const handleFlip = () => {
    if (!flipped) {
      gsap.to(loginButtonRef.current, {
        duration: 0.4,
        opacity: 0,
        ease: 'sine.inOut',
        onComplete: () => {
          setFlipped(true);
          gsap.fromTo(
            containerRef.current,
            { scale: 0 },
            {
              scale: 1,
              duration: 0.4,
              ease: 'sine.inOut',
              onStart: () => {
                containerRef.current.classList.add('visible');
              },
            }
          );
        },
      });
    } else {
      gsap.to(containerRef.current, {
        scale: 0,
        duration: 0.4,
        ease: 'sine.inOut',
        onComplete: () => {
          setFlipped(false);
          containerRef.current.classList.remove('visible');
          gsap.to(loginButtonRef.current, {
            duration: 0.4,
            opacity: 1,
            ease: 'sine.inOut',
          });
        },
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await axios.post('http://localhost:3000/api/auth/login', {
        username,
        password,
      });

      // Almacena el token en el localStorage
      localStorage.setItem('token', res.data.token);

      // Redirige a la página principal
      navigate('/main');
    } catch (err) {
      setError('Usuario o contraseña incorrectos');
    }
  };

  return (
    <div className="login">
      <div className="cabecera-siiu">
        <div className="cabecera-texto">
          <h1 className="titulosh1" data-wow-delay=".5s">
            UNIVERSIDAD CENTRAL DEL ECUADOR
          </h1>
          <h1 className="titulosh1" data-wow-delay="1s">
            SISTEMA ACADÉMICO
          </h1>
        </div>
      </div>

      <div>
        <div>
          <div
            id="login-button"
            className={flipped ? 'flipped wow flip' : 'wow flip'}
            data-wow-delay=".5s"
            onClick={handleFlip}
            ref={loginButtonRef}
          >
            <i className="fa fa-uce_academico"></i>
          </div>
        </div>

        <div id="container" ref={containerRef}>
          <h1 style={{ color: '#000', margin: '40px auto auto' }}>
            INICIAR SESIÓN
          </h1>
          <span className="close-btn" onClick={handleFlip}>
            <img
              src="https://cdn4.iconfinder.com/data/icons/miu/22/circle_close_delete_-128.png"
              alt="Cerrar"
            />
          </span>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="usuario">
              <i className="fa fa-user-secret"></i>
              <input
                type="text"
                id="j_username"
                name="j_username"
                placeholder="Usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="password">
              <i className="fa fa-key"></i>
              <input
                type="password"
                id="j_password"
                name="j_password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="ingresar">
              <input type="submit" value="Ingresar" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;

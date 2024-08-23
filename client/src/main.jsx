import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
//import 'bootstrap/dist/css/bootstrap.min.css';
//import './styles.css';
import './assets/css/general.css'; // Importa tus estilos generales
import './assets/css/fontStyles.css';
import './assets/css/animate.css';
import './assets/css/style.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

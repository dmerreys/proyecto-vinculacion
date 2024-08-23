import { useEffect } from 'react';
import '../assets/css/fontStyles.css';
//import '../assets/css/general.css';

const HeadComponent = () => {
  useEffect(() => {
    // Bloquear el botón F5
    const handleKeyDown = (e) => {
      if (e.keyCode === 116) {
        e.preventDefault();
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    // Bloquear el botón de regresar del navegador
    const nobackbutton = () => {
      window.location.hash = "no-back-button";
      window.onhashchange = function () {
        window.location.hash = "no-back-button";
      };
    };
    nobackbutton();

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <head>
      <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta httpEquiv="Expires" content="0" />
      <meta httpEquiv="Pragma" content="no-cache" />
      {/* Los estilos ya están importados arriba */}
    </head>
  );
};

export default HeadComponent;

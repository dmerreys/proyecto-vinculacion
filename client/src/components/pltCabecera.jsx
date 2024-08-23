const Cabecera = () => {
  // Deshabilitar el menú contextual (click derecho)
  // const disableContextMenu = (e) => {
  //   e.preventDefault();
  // };

  return (
    <div className="bannerCabecera">
      <div className="imagenCabecera">
        <div className="uce">
          <h2
            className="full-title"
            style={{ fontSize: "2.25em", important: true }}
          >
            Sistema Académico
          </h2>
          <h4
            className="sub-title"
            style={{ fontSize: "1.5em", important: true }}
          >
            UNIVERSIDAD CENTRAL DEL ECUADOR
          </h4>
        </div>
      </div>
    </div>
  );
};

export default Cabecera;

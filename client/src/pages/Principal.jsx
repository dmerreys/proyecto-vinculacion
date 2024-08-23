import logo from "../assets/img/uce.png";
import PltPrincipal from "../components/pltPrincipal";

const Principal = () => {
  return (
    <PltPrincipal>
      <section className="content-section">
        <br />
        <br />
        <p
          style={{
            marginLeft: "25px",
            color: "rgb(0,118,189)",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          Bienvenido al Sistema Académico
        </p>
        <br />
        <br />
        <div
          className="ui-panel ui-widget ui-widget-content ui-corner-all"
          style={{ marginLeft: "25px", marginRight: "25px" }}
        >
          <div className="ui-panel-content ui-widget-content">
            <table>
              <tbody>
                <tr>
                  <td>
                    <img
                      src={logo}
                      alt="U.C.E"
                      style={{ width: "180px", height: "180px" }}
                    />
                  </td>
                  <td>
                    <div
                      className="ui-panel ui-widget ui-widget-content ui-corner-all"
                      style={{ borderStyle: "none" }}
                    >
                      <div className="ui-panel-content ui-widget-content">
                        <p>
                          <br />
                          <br />
                          La Universidad Central del Ecuador le da una cordial
                          bienvenida al SISTEMA ACADÉMICO. Le comunicamos que
                          toda información será sujeta a verificación, nuestra
                          Institución de Educación Superior se reserva el
                          derecho de verificar la información proporcionada.
                          <br />
                          <br />
                          <br />
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </PltPrincipal>
  );
};

export default Principal;

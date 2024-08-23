import PropTypes from "prop-types";

const ProjectInfo = ({ selectedProject }) => {
  return (
    <>
      <p>
        <strong>ID: </strong>
        {selectedProject?.proyecto_info.proyecto_id}
      </p>
      <p>
        <strong>Nombre del Programa: </strong>
        {selectedProject?.proyecto_info.nombre_programa
          ? selectedProject.proyecto_info.nombre_programa
          : "No especificado"}
      </p>
      <p>
        <strong>Coordinador: </strong>
        {selectedProject?.proyecto_info.coordinador_programa
          ? selectedProject.proyecto_info.coordinador_programa
          : "No especificado"}
      </p>
      <p>
        <strong>Nombre del Proyecto: </strong>
        {selectedProject?.proyecto_info.nombre_proyecto
          ? selectedProject.proyecto_info.nombre_proyecto
          : "No especificado"}
      </p>
      <p>
        <strong>Objetivo General: </strong>
        {selectedProject?.proyecto_info.objetivo_general}
      </p>
      <p>
        <strong>Objetivos Específicos: </strong>
        {selectedProject?.proyecto_info.objetivos_especificos}
      </p>
      <p>
        <strong>Fecha de Inicio: </strong>
        {selectedProject?.proyecto_info.fecha_inicio}
      </p>
      <p>
        <strong>Fecha de Finalización: </strong>
        {selectedProject?.proyecto_info.fecha_finalizacion}
      </p>
      <p>
        <strong>Duración: </strong>
        {selectedProject?.proyecto_info.duracion
          ? selectedProject.proyecto_info.duracion === 1
            ? `${selectedProject.proyecto_info.duracion} mes`
            : `${selectedProject.proyecto_info.duracion} meses`
          : "No especificado"}
      </p>
      <p>
        <strong>Presupuesto por Semestre: </strong>
        {selectedProject?.proyecto_info.presupuesto_por_mes
          ? selectedProject.proyecto_info.presupuesto_por_mes
          : "No especificado"}
      </p>
      {/* FACULTADES Y CARRERAS */}
      <div
        style={{
          display: selectedProject?.carreras_info ? "block" : "none",
        }}
      >
        <h4>Facultades y Carreras</h4>
        <table>
          <thead>
            <tr>
              <th>Nombre de la Facultad</th>
              <th>Nombre de la Carrera</th>
            </tr>
          </thead>
          <tbody>
            {selectedProject?.carreras_info?.map((facultad) =>
              facultad.carreras.map((carrera) => (
                <tr key={carrera.id_carrera}>
                  {carrera.id_carrera === facultad.carreras[0].id_carrera ? (
                    <td rowSpan={facultad.carreras.length}>
                      {facultad.nombre_facultad}
                    </td>
                  ) : null}
                  <td>{carrera.nombre_carrera}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {/* UBICACIONES */}
      <div
        style={{
          display:
            selectedProject?.ubicaciones_info?.length > 0 ? "block" : "none",
        }}
      >
        <h4>Territorio</h4>
        <table>
          <thead>
            <tr>
              <th>Cantón</th>
              <th>Parroquia</th>
            </tr>
          </thead>
          <tbody>
            {selectedProject?.ubicaciones_info?.map((canton) =>
              canton.parroquias.length > 0 ? (
                canton.parroquias.map((parroquia, index) => (
                  <tr key={parroquia.id_parroquia}>
                    {index === 0 ? (
                      <td rowSpan={canton.parroquias.length}>
                        {canton.nombre_canton}
                      </td>
                    ) : null}
                    <td>{parroquia.nombre_parroquia}</td>
                  </tr>
                ))
              ) : (
                <tr key={canton.id_canton}>
                  <td>{canton.nombre_canton}</td>
                  <td>No hay parroquias</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
      {/* RESPONSABLES UCE */}
      <div
        style={{
          display: selectedProject?.proyecto_info?.responsables_uce
            ? "block"
            : "none",
        }}
      >
        <h4>Responsables Uce</h4>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Teléfono Celular</th>
              <th>Teléfono Convencional</th>
              <th>Correo Institucional</th>
            </tr>
          </thead>
          <tbody>
            {selectedProject?.proyecto_info?.responsables_uce?.map(
              (res_uce) => (
                <tr key={res_uce.id_responsable_uce}>
                  <td>{res_uce.nombre}</td>
                  <td>
                    {res_uce.tlf_celular
                      ? res_uce.tlf_celular
                      : "No especificado"}
                  </td>
                  <td>
                    {res_uce.tlf_convencional
                      ? res_uce.tlf_convencional
                      : "No especificado"}
                  </td>
                  <td>
                    {res_uce.correo_institucional
                      ? res_uce.correo_institucional
                      : "No especificado"}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
      {/* ORGANIZACION RESPONSABLE CONTRAPARTE */}
      <div
        style={{
          display: selectedProject?.org_res_contraparte ? "block" : "none",
        }}
      >
        <h4>Responsables Contraparte</h4>
        <table>
          <thead>
            <tr>
              <th>Nombre de la Organización</th>
              <th>Responsable</th>
              <th>Cargo</th>
              <th>Dirección</th>
              <th>Teléfono Celular</th>
              <th>Teléfono Convencional</th>
              <th>Correo Electrónico</th>
            </tr>
          </thead>
          <tbody>
            {selectedProject?.org_res_contraparte?.map((org) =>
              org.responsables.map((resp, index) => (
                <tr key={resp.id_responsable_contraparte}>
                  {index === 0 ? (
                    <>
                      <td rowSpan={org.responsables.length}>{org.nombre}</td>
                      <td>{resp.nombres}</td>
                      <td>{resp.cargo}</td>
                      <td>{resp.direccion}</td>
                      <td>{resp.tlf_celular}</td>
                      <td>{resp.tlf_convencional}</td>
                      <td>{resp.correo_electronico}</td>
                    </>
                  ) : (
                    <tr key={resp.id_responsable_contraparte}>
                      <td>{resp.nombres}</td>
                      <td>{resp.cargo}</td>
                      <td>{resp.direccion}</td>
                      <td>{resp.tlf_celular}</td>
                      <td>{resp.tlf_convencional}</td>
                      <td>{resp.correo_electronico}</td>
                    </tr>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {/* PARTICIPANTES */}
      <div
        style={{
          display: selectedProject?.proyecto_info?.participantes
            ? "block"
            : "none",
        }}
      >
        <h4>Participantes</h4>
        <table>
          <thead>
            <tr>
              <th>Nombres</th>
              <th>Fecha de Inicio</th>
              <th>Fecha de Finalización</th>
              <th>Rol</th>
              <th>Horas Asignadas</th>
            </tr>
          </thead>
          <tbody>
            {selectedProject?.proyecto_info?.participantes?.map(
              (participante) => (
                <tr key={participante.id_participante}>
                  <td>{participante.nombres}</td>
                  <td>
                    {participante.fecha_inicio
                      ? participante.fecha_inicio
                      : "No especificado"}
                  </td>
                  <td>
                    {participante.fecha_fin
                      ? participante.fecha_fin
                      : "No especificado"}
                  </td>
                  <td>{participante.rol_participante}</td>
                  <td>
                    {participante.horas_asignadas
                      ? participante.horas_asignadas
                      : "No especificado"}
                  </td>
                </tr>
              )
            )}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={1}>Total Docentes</td>
              <td>
                {selectedProject?.proyecto_info.cantidad_docentes
                  ? selectedProject.proyecto_info.cantidad_docentes
                  : "No especificado"}
              </td>
            </tr>
            <tr>
              <td colSpan={1}>Total Estudiantes</td>
              <td>
                {selectedProject?.proyecto_info.cantidad_estudiantes
                  ? selectedProject.proyecto_info.cantidad_estudiantes
                  : "No especificado"}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
      <p>
        <strong>Elaborado Por: </strong>
        {selectedProject?.proyecto_info.elaborado_por
          ? selectedProject.proyecto_info.elaborado_por
          : "No especificado"}
      </p>
      <p>
        <strong>Aprobado Por: </strong>
        {selectedProject?.proyecto_info.aprobado_por
          ? selectedProject.proyecto_info.aprobado_por
          : "No especificado"}
      </p>
      <p>
        <strong>Aprobado Por: </strong>
        {selectedProject?.proyecto_info.fecha_entrega_informe
          ? selectedProject.proyecto_info.fecha_entrega_informe
          : "No especificado"}
      </p>
    </>
  );
};

ProjectInfo.propTypes = {
  selectedProject: PropTypes.object.isRequired,
};

export default ProjectInfo;

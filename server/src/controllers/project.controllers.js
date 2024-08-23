import { pool } from "../db.js";

const ProjectController = {
  getProjects: async (req, res) => {
    try {
      const { rows } = await pool.query("SELECT * FROM proyecto");
      res.status(200).json(rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error getting projects." });
    }
  },
  getProjectPGestion: async (req, res) => {
    try {
      const { rows } = await pool.query("SELECT * FROM proceso_gestion;");
      res.status(200).json(rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error getting project gestion." });
    }
  },
  getProjectPImpacto: async (req, res) => {
    try {
      const { rows } = await pool.query("SELECT * FROM indicador_impacto;");
      res.status(200).json(rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error getting project impact" });
    }
  },
  getFacultades: async (req, res) => {
    try {
      const { rows } = await pool.query("SELECT * FROM facultad;");
      res.status(200).json(rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error getting facultad" });
    }
  },
  getCarrerasbyFacultad: async (req, res) => {
    try {
      const { rows } = await pool.query(
        "SELECT * FROM get_carreras_by_facultad_id($1);",
        [req.params.id]
      );
      res.status(200).json(rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error getting facultad" });
    }
  },
  getProvincias: async (req, res) => {
    try {
      const { rows } = await pool.query("SELECT * FROM provincia;");
      res.status(200).json(rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error getting provincia" });
    }
  },
  getCantonesbyProvincia: async (req, res) => {
    try {
      const { rows } = await pool.query(
        "SELECT * FROM get_cantones_by_provincia_id($1);",
        [req.params.id]
      );
      res.status(200).json(rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error getting cantones" });
    }
  },
  getParroquiasbyCanton: async (req, res) => {
    try {
      const { rows } = await pool.query(
        "SELECT * FROM get_parroquias_by_canton_id($1);",
        [req.params.id]
      );
      res.status(200).json(rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error getting parroquias" });
    }
  },
  getProjectById: async (req, res) => {
    try {
      const { rows } = await pool.query(
        "SELECT * FROM get_proyecto_by_id($1)",
        [req.params.id]
      );
      if (rows.length === 0) {
        res.status(404).json({ message: "Project not found." });
      } else {
        res.status(200).json(rows[0]);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error getting project." });
    }
  },
  getAllInfoProjectById: async (req, res) => {
    try {
      const { rows } = await pool.query(
        "SELECT * FROM get_all_info_project_by_id($1) AS info_project",
        [req.params.id]
      );
      if (!rows[0].info_project) {
        res.status(404).json({ message: "Project not found." });
      } else {
        res.status(200).json(rows[0].info_project);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error getting project." });
    }
  },
  getAllInfoProjects: async (req, res) => {
    try {
      const { rows } = await pool.query(
        "SELECT * FROM get_all_info_projects() AS info_projects"
      );
      res.status(200).json(rows[0].info_projects);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error getting project." });
    }
  },
  getNextProjectId: async (req, res) => {
    const { prefijo } = req.params;
    try {
      const result = await pool.query(
        "SELECT obtener_siguiente_id_proyecto($1) AS siguiente_id",
        [prefijo]
      );
      res.status(200).json(result.rows[0].siguiente_id);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error getting next id.");
    }
  },
  createProject: async (req, res) => {
    const {
      id,
      nombre_programa,
      coordinador_programa,
      nombre_proyecto,
      nombre_proyecto_corto,
      objetivo_general,
      objetivos_especificos,
      id_proceso_gestion,
      id_indicador_impacto,
      duracion,
      fecha_inicio,
      fecha_finalizacion,
      presupuesto_por_ano,
      presupuesto_por_mes,
      cantidad_docentes,
      cantidad_estudiantes,
      diagnostico_comunitario,
      antecedentes,
      justificacion,
      metodologia,
      beneficiarios_directos,
      beneficiarios_indirectos,
      problemas_a_resolver,
      elaborado_por,
      aprobado_por,
      fecha_entrega_informe,
      facultades,
      provincias,
    } = req.body;

    // Convertir IDs de facultades a enteros
    const facultadesConvertidas = facultades.map((facultad) => ({
      id_facultad: parseInt(facultad.id_facultad, 10),
      carreras: facultad.carreras.map((carrera) => parseInt(carrera, 10)),
    }));

    // Convertir IDs de provincias, cantones y parroquias a enteros
    const provinciasConvertidas = provincias.map((provincia) => ({
      id_provincia: parseInt(provincia.id_provincia, 10),
      cantones: provincia.cantones.map((canton) => ({
        id_canton: parseInt(canton.id_canton, 10),
        parroquias: canton.parroquias.map((parroquia) =>
          parseInt(parroquia, 10)
        ),
      })),
    }));

    console.log(facultadesConvertidas);
    console.log(provinciasConvertidas);

    try {
      await pool.query(
        `
            SELECT insert_proyecto(
                $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 
                $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, 
                $21, $22, $23, $24, $25, $26, $27, $28
            )
        `,
        [
          id,
          nombre_programa,
          coordinador_programa,
          nombre_proyecto,
          nombre_proyecto_corto,
          objetivo_general,
          objetivos_especificos,
          id_proceso_gestion,
          id_indicador_impacto,
          duracion,
          fecha_inicio,
          fecha_finalizacion,
          presupuesto_por_ano,
          presupuesto_por_mes,
          cantidad_docentes,
          cantidad_estudiantes,
          diagnostico_comunitario,
          antecedentes,
          justificacion,
          metodologia,
          beneficiarios_directos,
          beneficiarios_indirectos,
          problemas_a_resolver,
          elaborado_por,
          aprobado_por,
          fecha_entrega_informe,
          JSON.stringify(facultadesConvertidas),
          JSON.stringify(provinciasConvertidas),
        ]
      );
      res.status(200).send("Proyecto insertado correctamente");
    } catch (error) {
      console.error(error);
      res.status(500).send("Error al insertar el proyecto");
    }
  },
  deleteProjectById: async (req, res) => {
    try {
      await pool.query("BEGIN");
      const result = await pool.query(
        "SELECT delete_proyecto_by_id($1) AS project_deleted",
        [req.params.id]
      );
      await pool.query("COMMIT");
      if (result.rows[0].project_deleted) {
        res.sendStatus(204);
      } else {
        res.status(404).json({ message: "Project not found." });
      }
    } catch (error) {
      await pool.query("ROLLBACK");
      console.error(error);
      res.status(500).json({ message: "Error deleting project." });
    }
  },
  updateProjectById: (req, res) => {
    res.send(`Updating project ${req.params.id}`);
  },
};

export default ProjectController;

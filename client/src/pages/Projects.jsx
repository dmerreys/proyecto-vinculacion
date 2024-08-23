import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useRef, useState } from "react";
import { Box, Button } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import CircularProgress from "@mui/material/CircularProgress";
import Modal from "../components/Modal";
import PltPrincipal from "../components/pltPrincipal";
import "../styles.css";
import axios from "axios";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import ProjectInfo from "../components/ProjectInfo";
import ExpandableCell from "../components/ExpandableCell";
import CustomToolbar from "../components/CustomToolbar";
import { columnNames } from "../utils/projectColumns";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState({});
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const cacheRef = useRef({});

  const [isProyectsLoading, setIsProjectsLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [isProjectInfoLoading, setIsProjectInfoLoading] = useState(false);

  const columns = [
    { field: columnNames.ID, headerName: "ID Proyecto", width: 100 },
    {
      field: columnNames.NOMBRE_PROYECTO,
      headerName: "Nombre del Proyecto",
      width: 250,
      renderCell: (params) => (
        <>
          {params.value === null ? (
            "No especificado"
          ) : (
            <ExpandableCell value={params.value} />
          )}
        </>
      ),
    },
    {
      field: columnNames.NOMBRE_PROGRAMA,
      headerName: "Nombre Programa",
      width: 250,
      renderCell: (params) => (
        <>
          {params.value === null ? (
            "No especificado"
          ) : (
            <ExpandableCell value={params.value} />
          )}
        </>
      ),
    },
    {
      field: columnNames.COORDINADOR_PROGRAMA,
      headerName: "Coordinador",
      width: 250,
      renderCell: (params) => (
        <>{params.value === null ? "No especificado" : params.value}</>
      ),
    },
    {
      field: columnNames.OBJETIVO_GENERAL,
      headerName: "Objetivo General",
      width: 250,
      renderCell: (params) => (
        <>
          {params.value === null ? (
            "No especificado"
          ) : (
            <ExpandableCell value={params.value} />
          )}
        </>
      ),
    },
    {
      field: columnNames.OBJETIVOS_ESPECIFICOS,
      headerName: "Objetivos Específicos",
      width: 250,
      renderCell: (params) => (
        <>
          {params.value === null ? (
            "No especificado"
          ) : (
            <ExpandableCell value={params.value} />
          )}
        </>
      ),
    },
    {
      field: columnNames.NOMBRE_PROCESO_GESTION,
      headerName: "Proceso Gestión",
      width: 250,
      renderCell: (params) => (
        <>{params.value === null ? "No especificado" : params.value}</>
      ),
    },
    {
      field: columnNames.DURACION,
      headerName: "Duración (meses)",
      width: 150,
      renderCell: (params) => (
        <>{params.value === null ? "No especificado" : params.value}</>
      ),
    },
    {
      field: columnNames.PRESUPUESTO_POR_MES,
      headerName: "Presupuesto por Semestre",
      width: 200,
      renderCell: (params) => (
        <>{params.value === null ? "No especificado" : params.value}</>
      ),
    },
    {
      field: columnNames.FECHA_INICIO,
      headerName: "Fecha de Inicio",
      width: 200,
      renderCell: (params) => (
        <>{params.value === null ? "No especificado" : params.value}</>
      ),
    },
    {
      field: columnNames.FECHA_FINALIZACION,
      headerName: "Fecha de Finalización",
      width: 200,
      renderCell: (params) => (
        <>{params.value === null ? "No especificado" : params.value}</>
      ),
    },
    {
      field: columnNames.NOMBRE_FACULTAD,
      headerName: "Nombre de la Facultad",
      width: 300,
    },
    {
      field: columnNames.CARRERAS,
      headerName: "Carreras",
      width: 200,
      renderCell: (params) => (
        <>
          {params.value.length > 0 ? (
            <ExpandableCell value={params.value.join(", ")} />
          ) : (
            "No especificado"
          )}
        </>
      ),
    },
    {
      field: columnNames.CANTONES,
      headerName: "Cantones",
      width: 200,
      renderCell: (params) => (
        <>
          <ExpandableCell value={params.value} />
        </>
      ),
    },
    {
      field: columnNames.NOMBRE_PARROQUIA,
      headerName: "Parroquias",
      width: 200,
      renderCell: (params) => (
        <>
          {params.value.length > 0 ? (
            <ExpandableCell value={params.value.join(", ")} />
          ) : (
            "No especificado"
          )}
        </>
      ),
    },
    {
      field: columnNames.RESPONSABLES_UCE,
      headerName: "Responsables Uce",
      width: 200,
    },
    {
      field: columnNames.NOMBRE_ORG_RES_CONTRAPARTE,
      headerName: "Organización Contraparte",
      width: 300,
    },
    {
      field: columnNames.RESPONSABLES_CONTRAPARTE,
      headerName: "Responsables Contraparte",
      width: 300,
      renderCell: (params) => (
        <>
          <ExpandableCell value={params.value} />
        </>
      ),
    },

    {
      field: columnNames.PARTICIPANTES,
      headerName: "Participantes",
      width: 400,
      renderCell: (params) => (
        <>
          {params.value.length > 0 ? (
            <ExpandableCell value={params.value.join(", ")} />
          ) : (
            "No especificado"
          )}
        </>
      ),
    },
    {
      field: columnNames.CANTIDAD_DOCENTES,
      headerName: "Cantidad Docentes",
      width: 250,
      renderCell: (params) => (
        <>{params.value === null ? "No especificado" : params.value}</>
      ),
    },
    {
      field: columnNames.CANTIDAD_ESTUDIANTES,
      headerName: "Cantidad Estudiantes",
      width: 250,
      renderCell: (params) => (
        <>{params.value === null ? "No especificado" : params.value}</>
      ),
    },
    {
      field: columnNames.BENEFICIARIOS_DIRECTOS,
      headerName: "Beneficiarios Directos",
      width: 250,
      renderCell: (params) => (
        <>
          {params.value === null ? (
            "No especificado"
          ) : (
            <ExpandableCell value={params.value} />
          )}
        </>
      ),
    },
    {
      field: columnNames.BENEFICIARIOS_INDIRECTOS,
      headerName: "Beneficiarios Indirectos",
      width: 250,
      renderCell: (params) => (
        <>
          {params.value === null ? (
            "No especificado"
          ) : (
            <ExpandableCell value={params.value} />
          )}
        </>
      ),
    },
    {
      field: columnNames.ANTECEDENTES,
      headerName: "Antecedentes",
      width: 250,
      renderCell: (params) => (
        <>
          {params.value === null ? (
            "No especificado"
          ) : (
            <ExpandableCell value={params.value} />
          )}
        </>
      ),
    },
    {
      field: columnNames.METODOLOGIA,
      headerName: "Metodología",
      width: 250,
      renderCell: (params) => (
        <>
          {params.value === null ? (
            "No especificado"
          ) : (
            <ExpandableCell value={params.value} />
          )}
        </>
      ),
    },
    {
      field: columnNames.JUSTIFICACION,
      headerName: "Justificacion",
      width: 250,
      renderCell: (params) => (
        <>
          {params.value === null ? (
            "No especificado"
          ) : (
            <ExpandableCell value={params.value} />
          )}
        </>
      ),
    },
    {
      field: columnNames.PROBLEMAS_A_RESOLVER,
      headerName: "Problemas a resolver",
      width: 250,
      renderCell: (params) => (
        <>
          {params.value === null ? (
            "No especificado"
          ) : (
            <ExpandableCell value={params.value} />
          )}
        </>
      ),
    },
    {
      field: columnNames.DIAGNOSTICO_COMUNITARIO,
      headerName: "Diagnóstico Comunitario",
      width: 250,
      renderCell: (params) => (
        <>
          {params.value === null ? (
            "No especificado"
          ) : (
            <ExpandableCell value={params.value} />
          )}
        </>
      ),
    },
    {
      field: columnNames.ELABORADO_POR,
      headerName: "Elaborado por",
      width: 250,
      renderCell: (params) => (
        <>{params.value === null ? "No especificado" : params.value}</>
      ),
    },
    {
      field: columnNames.APROBADO_POR,
      headerName: "Aprobado por",
      width: 250,
      renderCell: (params) => (
        <>{params.value === null ? "No especificado" : params.value}</>
      ),
    },
    {
      field: columnNames.FECHA_ENTREGA_INFORME,
      headerName: "Fecha de entrega del informe",
      width: 200,
      renderCell: (params) => (
        <>{params.value === null ? "No especificado" : params.value}</>
      ),
    },
    {
      field: "action",
      headerName: "Acciones",
      width: 300,
      renderCell: (params) => (
        <Box sx={{ display: "flex", gap: 2 }}>
          <LoadingButton
            loading={isProjectInfoLoading}
            variant="contained"
            color="primary"
            onClick={() => handleOpenModal(params.row)}
          >
            Ver Detalles
          </LoadingButton>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleOpenDeleteProjectModal(params.row)}
          >
            Borrar Proyecto
          </Button>
        </Box>
      ),
    },
  ];

  const handleOpenModal = (row) => {
    if (cacheRef.current[row.proyecto_id]) {
      setSelectedProject(cacheRef.current[row.proyecto_id]);
      setIsModalOpen(true);
    } else {
      setIsProjectInfoLoading(true);
      fetch(`http://localhost:3000/api/projects/all-info/${row.proyecto_id}`)
        .then((response) => response.json())
        .then((data) => {
          cacheRef.current[row.proyecto_id] = data;
          setSelectedProject(data);
          setIsModalOpen(true);
        })
        .catch((error) =>
          console.error("Error fetching project details: ", error)
        )
        .finally(() => setIsProjectInfoLoading(false));
    }
  };

  const handleCloseModal = () => {
    setSelectedProject({});
    setIsModalOpen(false);
  };

  const handleOpenDeleteProjectModal = (row) => {
    setSelectedProjectId(row.proyecto_id);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDeleteProject = async (id) => {
    try {
      setIsDeleteLoading(true);
      const res = await axios.delete(
        `http://localhost:3000/api/projects/${id}`
      );
      if (res.status === 204) {
        setProjects(projects.filter((project) => project.proyecto_id !== id));
      }
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleteLoading(false);
    }
  };

  const handleCloseDeleteProjectModal = () => {
    setSelectedProjectId("");
    setIsDeleteModalOpen(false);
  };

  useEffect(() => {
    setIsProjectsLoading(true);
    fetch("http://localhost:3000/api/projects/all")
      .then((response) => response.json())
      .then((data) => {
        const processedData = data.map((project, index) => {
          const nombre_facultad = Array.isArray(project.carreras_info)
            ? project.carreras_info
                .map((facultad) => facultad.nombre_facultad)
                .join(", ")
            : "No especificado";

          const carreras = Array.isArray(project.carreras_info)
            ? project.carreras_info.flatMap((facultad) =>
                Array.isArray(facultad.carreras) && facultad.carreras.length > 0
                  ? facultad.carreras.map((carrera) => carrera.nombre_carrera)
                  : []
              )
            : [];

          const cantones = Array.isArray(project.ubicaciones_info)
            ? project.ubicaciones_info
                .map((canton) => canton.nombre_canton)
                .join(", ")
            : "No especificado";

          const nombre_parroquia = project.ubicaciones_info
            ? project.ubicaciones_info.flatMap((canton) =>
                Array.isArray(canton.parroquias) && canton.parroquias.length > 0
                  ? canton.parroquias.map(
                      (parroquia) => parroquia.nombre_parroquia
                    )
                  : []
              )
            : [];

          const nombre_org_res_contraparte = Array.isArray(
            project.org_res_contraparte
          )
            ? project.org_res_contraparte.map((org) => org.nombre).join(", ")
            : "No especificado";

          const responsables_contraparte = project.org_res_contraparte
            ? project.org_res_contraparte
                .map((org) => {
                  if (org.responsables && org.responsables.length > 0) {
                    return org.responsables
                      .map((responsable) => responsable.nombres)
                      .join(", ");
                  } else {
                    return "No especificado";
                  }
                })
                .join(", ")
            : "No especificado";

          project.proyecto_info.participantes =
            Array.isArray(project.proyecto_info.participantes) &&
            project.proyecto_info.participantes.length > 0
              ? project.proyecto_info.participantes.map(
                  (participante) =>
                    `${participante.nombres}: ${
                      participante.horas_asignadas
                        ? participante.horas_asignadas
                        : "No especifica"
                    } horas`
                )
              : [];

          project.proyecto_info.responsables_uce =
            Array.isArray(project.proyecto_info.responsables_uce) &&
            project.proyecto_info.responsables_uce.length > 0
              ? project.proyecto_info.responsables_uce
                  .map(
                    (responsable) => responsable.nombre && responsable.nombre
                  )
                  .join(", ")
              : "No especificado";

          return {
            id: index, // Asignar un id único basado en el índice
            ...project?.proyecto_info,
            nombre_facultad,
            carreras,
            cantones,
            nombre_parroquia,
            nombre_org_res_contraparte,
            responsables_contraparte,
          };
        });
        setProjects(processedData);
      })
      .catch((error) => console.error("Error fetching projects: ", error))
      .finally(() => setIsProjectsLoading(false));
  }, []);

  return (
    <PltPrincipal>
      {isProyectsLoading ? (
        <CircularProgress />
      ) : (
        <DataGrid
          columns={columns}
          rows={projects}
          checkboxSelection
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[10, 20, 30]}
          getRowHeight={() => "auto"}
          getEstimatedRowHeight={() => 100}
          slots={{ toolbar: CustomToolbar }}
          sx={{
            "&.MuiDataGrid-root--densityCompact .MuiDataGrid-cell": {
              py: 1,
            },
            "&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell": {
              py: "15px",
            },
            "&.MuiDataGrid-root--densityComfortable .MuiDataGrid-cell": {
              py: "22px",
            },
          }}
        />
      )}

      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          <ProjectInfo selectedProject={selectedProject} />
        </Modal>
      )}

      {isDeleteModalOpen && (
        <ConfirmDeleteModal
          onClose={handleCloseDeleteProjectModal}
          onConfirm={handleConfirmDeleteProject}
          projectId={selectedProjectId}
          loading={isDeleteLoading}
        />
      )}
    </PltPrincipal>
  );
};

export default Projects;

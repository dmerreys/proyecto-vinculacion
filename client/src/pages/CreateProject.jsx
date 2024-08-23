import { useEffect, useState } from "react";
import { useForm, useFieldArray, useWatch } from "react-hook-form";
import PltPrincipal from "../components/pltPrincipal";
import axios from "axios";
import { Box, Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import Divider from "@mui/material/Divider";

const CreateProyectoForm = () => {
  const [prefijo, setPrefijo] = useState("");
  const [idProyecto, setIdProyecto] = useState("");

  const [procesosGestion, setProcesosGestion] = useState([]);
  const [indicadoresImpacto, setIndicadoresImpacto] = useState([]);
  const [facultades, setFacultades] = useState([]);
  const [provincias, setProvincias] = useState([]);
  const [cantonesByProvincia, setCantonesByProvincia] = useState({});
  const [parroquiasByCanton, setParroquiasByCanton] = useState({});
  const [carrerasByFacultad, setCarrerasByFacultad] = useState({});
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm({
    defaultValues: {
      facultades: [{ id_facultad: "", carreras: [] }],
      provincias: [
        { id_provincia: "", cantones: [{ id_canton: "", parroquias: [] }] },
      ],
    },
  });

  // Manejo de arrays dinámicos
  const {
    fields: facultadesFields,
    append: appendFacultad,
    remove: removeFacultad,
  } = useFieldArray({
    control,
    name: "facultades",
  });

  const {
    fields: provinciasFields,
    append: appendProvincia,
    remove: removeProvincia,
  } = useFieldArray({
    control,
    name: "provincias",
  });

  const facultadesValues = useWatch({ control, name: "facultades" });
  const provinciasValues = useWatch({ control, name: "provincias" });

  useEffect(() => {
    // Obtener datos para los selectores desde el backend
    const fetchProcesosGestion = async () => {
      const response = await axios.get(
        "http://localhost:3000/api/projects/gestion"
      );
      setProcesosGestion(response.data);
    };

    const fetchIndicadoresImpacto = async () => {
      const response = await axios.get(
        "http://localhost:3000/api/projects/impacto"
      );
      setIndicadoresImpacto(response.data);
    };

    const fetchData = async () => {
      try {
        const [facultadResponse, provinciaResponse] = await Promise.all([
          axios.get("http://localhost:3000/api/projects/facultad"),
          axios.get("http://localhost:3000/api/projects/provincia"),
        ]);
        setFacultades(facultadResponse.data);
        setProvincias(provinciaResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchProcesosGestion();
    fetchIndicadoresImpacto();
    fetchData();
  }, []);

  useEffect(() => {
    facultadesValues.forEach(async (facultad) => {
      if (facultad.id_facultad && !carrerasByFacultad[facultad.id_facultad]) {
        try {
          const response = await axios.get(
            `http://localhost:3000/api/projects/carrera/${facultad.id_facultad}`
          );
          setCarrerasByFacultad((prev) => ({
            ...prev,
            [facultad.id_facultad]: response.data,
          }));
        } catch (error) {
          console.error("Error fetching carreras:", error);
        }
      }
    });
  }, [facultadesValues]);

  useEffect(() => {
    provinciasValues.forEach(async (provincia) => {
      if (
        provincia.id_provincia &&
        !cantonesByProvincia[provincia.id_provincia]
      ) {
        try {
          const response = await axios.get(
            `http://localhost:3000/api/projects/canton/${provincia.id_provincia}`
          );
          setCantonesByProvincia((prev) => ({
            ...prev,
            [provincia.id_provincia]: response.data,
          }));
        } catch (error) {
          console.error("Error fetching cantones:", error);
        }
      }
    });
  }, [provinciasValues]);

  useEffect(() => {
    provinciasValues.forEach((provincia) => {
      provincia.cantones.forEach(async (canton) => {
        if (canton.id_canton && !parroquiasByCanton[canton.id_canton]) {
          try {
            const response = await axios.get(
              `http://localhost:3000/api/projects/parroquia/${canton.id_canton}`
            );
            setParroquiasByCanton((prev) => ({
              ...prev,
              [canton.id_canton]: response.data,
            }));
          } catch (error) {
            console.error("Error fetching parroquias:", error);
          }
        }
      });
    });
  }, [cantonesByProvincia]);

  const handlePrefijoChange = async (e) => {
    const nuevoPrefijo = e.target.value.toUpperCase(); // Convertir a mayúsculas si es necesario
    setPrefijo(nuevoPrefijo);
    console.log(nuevoPrefijo);
    if (nuevoPrefijo.length > 2) {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/projects/next-id/${nuevoPrefijo}`
        );
        setIdProyecto(response.data);
      } catch (error) {
        console.error("Error al obtener el siguiente ID", error);
      }
    } else {
      setIdProyecto("");
    }
  };

  const handleFacultadChange = (index, value) => {
    setValue(`facultades.${index}.id_facultad`, value);
    if (value) {
      fetchCarreras(value, index);
    }
  };

  const fetchCarreras = async (facultadId) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/projects/carrera/${facultadId}`
      );
      setCarrerasByFacultad((prev) => ({
        ...prev,
        [facultadId]: response.data,
      }));
    } catch (error) {
      console.error("Error fetching carreras:", error);
    }
  };

  const handleCarreraChange = (index, carreraIndex, value) => {
    const currentCarreras = facultadesValues[index]?.carreras || [];
    currentCarreras[carreraIndex] = value;
    setValue(`facultades.${index}.carreras`, currentCarreras);
  };

  const handleCarreraRemove = (index, carreraIndex) => {
    const currentCarreras = facultadesValues[index]?.carreras || [];
    currentCarreras.splice(carreraIndex, 1);
    setValue(`facultades.${index}.carreras`, currentCarreras);
  };

  const handleProvinciaChange = (index, value) => {
    setValue(`provincias.${index}.id_provincia`, value);
    if (value) {
      fetchCantones(value, index);
    }
  };

  const fetchCantones = async (provinciaId, index) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/projects/canton/${provinciaId}`
      );
      setCantonesByProvincia((prev) => ({
        ...prev,
        [provinciaId]: response.data,
      }));
      // Resetea cantones si la provincia cambia
      //setValue(`provincias.${index}.cantones`, []);
    } catch (error) {
      console.error("Error fetching cantones:", error);
    }
  };

  const handleCantonChange = (provinciaIndex, cantonIndex, value) => {
    const currentCantones = provinciasValues[provinciaIndex]?.cantones || [];
    currentCantones[cantonIndex] = value;
    setValue(`provincias.${provinciaIndex}.cantones`, currentCantones);
    if (value) {
      fetchParroquias(value, provinciaIndex, cantonIndex);
    }
  };

  const fetchParroquias = async (cantonId, provinciaIndex, cantonIndex) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/projects/parroquia/${cantonId}`
      );
      setParroquiasByCanton((prev) => ({
        ...prev,
        [cantonId]: response.data,
      }));
      // Resetea parroquias si el cantón cambia
      setValue(
        `provincias.${provinciaIndex}.cantones.${cantonIndex}.parroquias`,
        []
      );
    } catch (error) {
      console.error("Error fetching parroquias:", error);
    }
  };

  const handleCantonAdd = (provinciaIndex) => {
    const currentCantones = provinciasValues[provinciaIndex]?.cantones || [];
    setValue(`provincias.${provinciaIndex}.cantones`, [
      ...currentCantones,
      { id_canton: "", parroquias: [] },
    ]);
  };

  const handleCantonRemove = (provinciaIndex, cantonIndex) => {
    const currentCantones = provinciasValues[provinciaIndex]?.cantones || [];
    currentCantones.splice(cantonIndex, 1);
    setValue(`provincias.${provinciaIndex}.cantones`, currentCantones);
  };

  const handleParroquiaChange = (
    provinciaIndex,
    cantonIndex,
    parroquiaIndex,
    value
  ) => {
    const currentParroquias =
      provinciasValues[provinciaIndex]?.cantones[cantonIndex]?.parroquias || [];
    currentParroquias[parroquiaIndex] = value;
    setValue(
      `provincias.${provinciaIndex}.cantones.${cantonIndex}.parroquias`,
      currentParroquias
    );
  };

  const handleParroquiaRemove = (
    provinciaIndex,
    cantonIndex,
    parroquiaIndex
  ) => {
    const currentParroquias =
      provinciasValues[provinciaIndex]?.cantones[cantonIndex]?.parroquias || [];
    currentParroquias.splice(parroquiaIndex, 1);
    setValue(
      `provincias.${provinciaIndex}.cantones.${cantonIndex}.parroquias`,
      currentParroquias
    );
  };

  const handleParroquiaAdd = (provinciaIndex, cantonIndex) => {
    const currentParroquias =
      provinciasValues[provinciaIndex]?.cantones[cantonIndex]?.parroquias || [];
    setValue(
      `provincias.${provinciaIndex}.cantones.${cantonIndex}.parroquias`,
      [...currentParroquias, ""]
    );
  };

  const onSubmit = async (data) => {
    try {
      console.log(data);
      const response = await axios.post(
        "http://localhost:3000/api/projects",
        data
      );
      console.log("Proyecto creado:", response.data);
    } catch (error) {
      console.error("Error al crear el proyecto:", error);
    }
  };
  console.log(facultadesValues);
  return (
    <PltPrincipal>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box minWidth={500} marginTop={2} marginBottom={2}>
          <Button
            type="button"
            startIcon={<AddIcon />}
            onClick={() => appendFacultad({ id_facultad: "", carreras: [] })}
          >
            Facultad
          </Button>
          {facultadesFields.map((facultadField, index) => (
            <div key={facultadField.id}>
              <label>Facultad</label>
              <select
                {...register(`facultades.${index}.id_facultad`, {
                  required: "Este campo es obligatorio",
                })}
                onChange={(e) => handleFacultadChange(index, e.target.value)}
                style={{ width: "100%" }}
              >
                <option value="">Selecciona una facultad</option>
                {facultades.map((facultad) => (
                  <option key={facultad.id} value={facultad.id}>
                    {facultad.nombre}
                  </option>
                ))}
              </select>
              {errors.facultades?.[index]?.id_facultad && (
                <span>{errors.facultades[index].id_facultad.message}</span>
              )}

              <div>
                {facultadesValues[index]?.carreras?.map(
                  (carrera, carreraIndex) => (
                    <div key={carreraIndex}>
                      <label
                        style={{
                          display: carreraIndex === 0 ? "block" : "none",
                        }}
                      >
                        Carreras
                      </label>
                      <select
                        {...register(
                          `facultades.${index}.carreras.${carreraIndex}`,
                          { required: "Este campo es obligatorio" }
                        )}
                        onChange={(e) =>
                          handleCarreraChange(
                            index,
                            carreraIndex,
                            e.target.value
                          )
                        }
                        style={{ minWidth: "90%" }}
                      >
                        <option value="">Selecciona una carrera</option>
                        {carrerasByFacultad[
                          facultadesValues[index]?.id_facultad
                        ]?.map((carrera) => (
                          <option key={carrera.id} value={carrera.id}>
                            {carrera.nombre}
                          </option>
                        ))}
                      </select>
                      <IconButton
                        type="button"
                        color="secondary"
                        style={{ paddingTop: 0, paddingBottom: 0 }}
                        onClick={() => handleCarreraRemove(index, carreraIndex)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  )
                )}
                <Box
                  marginTop={1}
                  display={"flex"}
                  justifyContent={"space-between"}
                >
                  <Button
                    type="button"
                    startIcon={<AddIcon />}
                    onClick={() => {
                      const currentCarreras =
                        facultadesValues[index]?.carreras || [];
                      setValue(`facultades.${index}.carreras`, [
                        ...currentCarreras,
                        "",
                      ]);
                    }}
                  >
                    Carrera
                  </Button>
                  <Button
                    type="button"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => removeFacultad(index)}
                  >
                    Facultad
                  </Button>
                </Box>
              </div>
            </div>
          ))}
        </Box>
        <Divider />
        <div>
          <label>
            Prefijo del Proyecto:
            <input
              type="text"
              value={prefijo}
              onChange={handlePrefijoChange}
              maxLength={3} // Si deseas limitar el prefijo a una longitud específica
            />
          </label>
          <br />
          <label>
            ID del Proyecto:
            <input {...register("id")} type="text" value={idProyecto} readOnly />
          </label>
        </div>
        <Divider />
        <Box minWidth={500} marginTop={2} marginBottom={2}>
          <Button
            type="button"
            startIcon={<AddIcon />}
            onClick={() =>
              appendProvincia({
                id_provincia: "",
                cantones: [{ id_canton: "", parroquias: [] }],
              })
            }
          >
            Provincia
          </Button>
          {provinciasFields.map((provinciaField, index) => (
            <div key={provinciaField.id}>
              <label>Provincia</label>
              <select
                {...register(`provincias.${index}.id_provincia`, {
                  required: "Este campo es obligatorio",
                })}
                onChange={(e) => handleProvinciaChange(index, e.target.value)}
                style={{ width: "100%" }}
              >
                <option value="">Selecciona una provincia</option>
                {provincias.map((provincia) => (
                  <option key={provincia.id} value={provincia.id}>
                    {provincia.nombre}
                  </option>
                ))}
              </select>
              {errors.provincias?.[index]?.id_provincia && (
                <span>{errors.provincias[index].id_provincia.message}</span>
              )}

              {provinciasValues[index]?.cantones?.map((canton, cantonIndex) => (
                <div key={cantonIndex}>
                  <label
                    style={{
                      display: cantonIndex === 0 ? "block" : "none",
                    }}
                  >
                    Cantón
                  </label>
                  <select
                    {...register(
                      `provincias.${index}.cantones.${cantonIndex}.id_canton`,
                      { required: "Este campo es obligatorio" }
                    )}
                    onChange={(e) =>
                      handleCantonChange(index, cantonIndex, e.target.value)
                    }
                    style={{ minWidth: "90%" }}
                  >
                    <option value="">Selecciona un cantón</option>
                    {cantonesByProvincia[
                      provinciasValues[index]?.id_provincia
                    ]?.map((canton) => (
                      <option key={canton.id} value={canton.id}>
                        {canton.nombre}
                      </option>
                    ))}
                  </select>
                  <IconButton
                    type="button"
                    color="secondary"
                    style={{ paddingTop: 0, paddingBottom: 0 }}
                    onClick={() => handleCantonRemove(index, cantonIndex)}
                  >
                    <DeleteIcon />
                  </IconButton>

                  {provinciasValues[index]?.cantones?.[
                    cantonIndex
                  ]?.parroquias?.map((parroquia, parroquiaIndex) => (
                    <div key={parroquiaIndex}>
                      <label
                        style={{
                          display: parroquiaIndex === 0 ? "block" : "none",
                        }}
                      >
                        Parroquia
                      </label>
                      <select
                        {...register(
                          `provincias.${index}.cantones.${cantonIndex}.parroquias.${parroquiaIndex}`,
                          { required: "Este campo es obligatorio" }
                        )}
                        onChange={(e) =>
                          handleParroquiaChange(
                            index,
                            cantonIndex,
                            parroquiaIndex,
                            e.target.value
                          )
                        }
                        style={{ minWidth: "90%" }}
                      >
                        <option value="">Selecciona una parroquia</option>
                        {parroquiasByCanton[
                          provinciasValues[index]?.cantones?.[cantonIndex]
                            ?.id_canton
                        ]?.map((parroquia) => (
                          <option key={parroquia.id} value={parroquia.id}>
                            {parroquia.nombre}
                          </option>
                        ))}
                      </select>
                      <IconButton
                        type="button"
                        color="secondary"
                        style={{ paddingTop: 0, paddingBottom: 0 }}
                        onClick={() =>
                          handleParroquiaRemove(
                            index,
                            cantonIndex,
                            parroquiaIndex
                          )
                        }
                      >
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  ))}

                  <Button
                    type="button"
                    startIcon={<AddIcon />}
                    onClick={() => handleCantonAdd(index)}
                  >
                    Cantón
                  </Button>
                  <Button
                    type="button"
                    startIcon={<AddIcon />}
                    onClick={() => handleParroquiaAdd(index, cantonIndex)}
                  >
                    Parroquia
                  </Button>
                </div>
              ))}

              <Button
                type="button"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={() => removeProvincia(index)}
              >
                Provincia
              </Button>
            </div>
          ))}
        </Box>

        <div>
          <label>Nombre del Programa</label>
          <input
            type="text"
            {...register("nombre_programa", { required: true })}
          />
          {errors.nombre_programa && <span>Este campo es obligatorio</span>}
        </div>

        <div>
          <label>Coordinador del Programa</label>
          <input
            type="text"
            {...register("coordinador_programa", { required: true })}
          />
          {errors.coordinador_programa && (
            <span>Este campo es obligatorio</span>
          )}
        </div>

        <div>
          <label>Nombre del Proyecto</label>
          <input
            type="text"
            {...register("nombre_proyecto", { required: true })}
          />
          {errors.nombre_proyecto && <span>Este campo es obligatorio</span>}
        </div>

        <div>
          <label>Nombre Corto del Proyecto</label>
          <input
            type="text"
            {...register("nombre_proyecto_corto", { required: true })}
          />
          {errors.nombre_proyecto_corto && (
            <span>Este campo es obligatorio</span>
          )}
        </div>

        <div>
          <label>Objetivo General</label>
          <textarea {...register("objetivo_general", { required: true })} />
          {errors.objetivo_general && <span>Este campo es obligatorio</span>}
        </div>

        <div>
          <label>Objetivos Específicos</label>
          <textarea
            {...register("objetivos_especificos", { required: true })}
          />
          {errors.objetivos_especificos && (
            <span>Este campo es obligatorio</span>
          )}
        </div>

        <div>
          <label>Proceso de Gestión</label>
          <select {...register("id_proceso_gestion", { required: true })}>
            {procesosGestion.map((proceso) => (
              <option key={proceso.id} value={proceso.id}>
                {proceso.nombre}
              </option>
            ))}
          </select>
          {errors.id_proceso_gestion && <span>Este campo es obligatorio</span>}
        </div>

        <div>
          <label>Indicador de Impacto</label>
          <select {...register("id_indicador_impacto", { required: true })}>
            {indicadoresImpacto.map((indicador) => (
              <option key={indicador.id} value={indicador.id}>
                {indicador.nombre}
              </option>
            ))}
          </select>
          {errors.id_indicador_impacto && (
            <span>Este campo es obligatorio</span>
          )}
        </div>

        <div>
          <label>Duración (meses)</label>
          <input type="number" {...register("duracion", { required: true })} />
          {errors.duracion && <span>Este campo es obligatorio</span>}
        </div>

        <div>
          <label>Fecha de Inicio</label>
          <input
            type="date"
            {...register("fecha_inicio", { required: true })}
          />
          {errors.fecha_inicio && <span>Este campo es obligatorio</span>}
        </div>

        <div>
          <label>Fecha de Finalización</label>
          <input
            type="date"
            {...register("fecha_finalizacion", { required: true })}
          />
          {errors.fecha_finalizacion && <span>Este campo es obligatorio</span>}
        </div>

        <div>
          <label>Presupuesto por Año</label>
          <input
            type="number"
            step="0.01"
            {...register("presupuesto_por_ano", { required: true })}
          />
          {errors.presupuesto_por_ano && <span>Este campo es obligatorio</span>}
        </div>

        <div>
          <label>Presupuesto por Mes</label>
          <input
            type="number"
            step="0.01"
            {...register("presupuesto_por_mes", { required: true })}
          />
          {errors.presupuesto_por_mes && <span>Este campo es obligatorio</span>}
        </div>

        <div>
          <label>Presupuesto Total</label>
          <input
            type="number"
            step="0.01"
            {...register("presupuesto_total", { required: true })}
          />
          {errors.presupuesto_total && <span>Este campo es obligatorio</span>}
        </div>

        <div>
          <label>Cantidad de Docentes</label>
          <input
            type="number"
            {...register("cantidad_docentes", { required: true })}
          />
          {errors.cantidad_docentes && <span>Este campo es obligatorio</span>}
        </div>

        <div>
          <label>Cantidad de Estudiantes</label>
          <input
            type="number"
            {...register("cantidad_estudiantes", { required: true })}
          />
          {errors.cantidad_estudiantes && (
            <span>Este campo es obligatorio</span>
          )}
        </div>

        <div>
          <label>Diagnóstico Comunitario</label>
          <textarea
            {...register("diagnostico_comunitario", { required: true })}
          />
          {errors.diagnostico_comunitario && (
            <span>Este campo es obligatorio</span>
          )}
        </div>

        <div>
          <label>Antecedentes</label>
          <textarea {...register("antecedentes", { required: true })} />
          {errors.antecedentes && <span>Este campo es obligatorio</span>}
        </div>

        <div>
          <label>Justificación</label>
          <textarea {...register("justificacion", { required: true })} />
          {errors.justificacion && <span>Este campo es obligatorio</span>}
        </div>

        <div>
          <label>Metodología</label>
          <textarea {...register("metodologia", { required: true })} />
          {errors.metodologia && <span>Este campo es obligatorio</span>}
        </div>

        <div>
          <label>Beneficiarios Directos</label>
          <textarea
            {...register("beneficiarios_directos", { required: true })}
          />
          {errors.beneficiarios_directos && (
            <span>Este campo es obligatorio</span>
          )}
        </div>

        <div>
          <label>Beneficiarios Indirectos</label>
          <textarea
            {...register("beneficiarios_indirectos", { required: true })}
          />
          {errors.beneficiarios_indirectos && (
            <span>Este campo es obligatorio</span>
          )}
        </div>

        <div>
          <label>Problemas a Resolver</label>
          <textarea {...register("problemas_a_resolver", { required: true })} />
          {errors.problemas_a_resolver && (
            <span>Este campo es obligatorio</span>
          )}
        </div>

        <div>
          <label>Elaborado por</label>
          <input
            type="text"
            {...register("elaborado_por", { required: true })}
          />
          {errors.elaborado_por && <span>Este campo es obligatorio</span>}
        </div>

        <div>
          <label>Aprobado por</label>
          <input
            type="text"
            {...register("aprobado_por", { required: true })}
          />
          {errors.aprobado_por && <span>Este campo es obligatorio</span>}
        </div>

        <div>
          <label>Fecha de Entrega del Informe</label>
          <input
            type="date"
            {...register("fecha_entrega_informe", { required: true })}
          />
          {errors.fecha_entrega_informe && (
            <span>Este campo es obligatorio</span>
          )}
        </div>

        <button type="submit">Crear Proyecto</button>
      </form>
    </PltPrincipal>
  );
};

export default CreateProyectoForm;

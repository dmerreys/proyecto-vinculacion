import { Router } from "express";
import ProjectController from "../controllers/project.controllers.js";

const router = Router();

router.get("/", ProjectController.getProjects);
router.post("/", ProjectController.createProject);
router.get("/all", ProjectController.getAllInfoProjects);
router.get("/gestion", ProjectController.getProjectPGestion);
router.get("/impacto", ProjectController.getProjectPImpacto);
router.get("/facultad", ProjectController.getFacultades);
router.get("/carrera/:id",ProjectController.getCarrerasbyFacultad);
router.get("/provincia", ProjectController.getProvincias);
router.get("/canton/:id",ProjectController.getCantonesbyProvincia);
router.get("/parroquia/:id",ProjectController.getParroquiasbyCanton);
router.get("/next-id/:prefijo", ProjectController.getNextProjectId);

router.get("/:id", ProjectController.getProjectById);

router.get("/all-info/:id", ProjectController.getAllInfoProjectById);

router.delete("/:id", ProjectController.deleteProjectById);
router.patch("/:id", ProjectController.updateProjectById);

export default router;

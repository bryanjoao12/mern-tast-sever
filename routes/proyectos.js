// Rutas auticcar usuarios
const express = require("express");

const router = express.Router();
const proyectoController = require("../controllers/proyectoController");
const auth = require("../middleware/auth");
const { check } = require("express-validator");
// Crea un proyecto
// api/proyectos

router.post(
  "/",
  auth,
  [check("nombre", "Nombre de proyecto es obligatorio").not().isEmpty()],

  proyectoController.crearProyecto
);
// Obtener proyectos
router.get(
  "/",
  auth,

  proyectoController.obtenerPRoyectos
);

// Acutualizar proyectos

router.put(
  "/:id",
  auth,
  [check("nombre", "Nombre de proyecto es obligatorio").not().isEmpty()],
  proyectoController.actualizarProyecto
);

// Eliminar proyecto

router.delete("/:id", auth, proyectoController.eliminarProyectos);
module.exports = router;

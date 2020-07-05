const Proyecto = require("../models/Proyecto");
const { validationResult } = require("express-validator");

exports.crearProyecto = async (req, res) => {
  // Revisar si hay errores

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    //  Creacr un nuevo proyecto
    const proyecto = new Proyecto(req.body);

    // Guardar el creadr via jwt
    proyecto.creador = req.usuario.id;
    // Guardar protyecto
    proyecto.save();
    res.json(proyecto);
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

// Obtener todos los proyectos del usuario autenticado

exports.obtenerPRoyectos = async (req, res) => {
  // Revisar si hay errores

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const proyectos = await Proyecto.find({ creador: req.usuario.id }).sort({
      creado: -1,
    });
    res.json(proyectos);
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

// Actualizar proyectos
exports.actualizarProyecto = async (req, res) => {
  // Revisar si hay errores

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // extraer la informacion de

  const { nombre } = req.body;
  const nuevoProyecto = {};
  if (nombre) {
    nuevoProyecto.nombre = nombre;
  }
  try {
    // Revisar el _id
    let proyecto = await Proyecto.findById(req.params.id);

    // Si hay un proyecto
    if (!proyecto) {
      return res.status(404).json({ msg: "Proyecto no encontrado" });
    }

    // Verificar creador del proyecto
    if (proyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "No autorizado" });
    }

    // Actualizar
    proyecto = await Proyecto.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: nuevoProyecto },
      {
        new: true,
      }
    );

    res.json({ proyecto });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

// Eliminar proyectos

exports.eliminarProyectos = async (req, res) => {
  try {
    // Revisar el _id
    let proyecto = await Proyecto.findById(req.params.id);

    // Si hay un proyecto
    if (!proyecto) {
      return res.status(404).json({ msg: "Proyecto no encontrado" });
    }

    // Verificar creador del proyecto
    if (proyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "No autorizado" });
    }
    // Elimnar el Proyecto

    await Proyecto.findByIdAndRemove({ _id: req.params.id });
    res.json({ msg: "Proyecto Eliminado" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

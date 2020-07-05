// Rutas crear usuarios
const express = require("express");

const router = express.Router();
const usuarioController = require("../controllers/usersController");
const { check } = require("express-validator");

// Crea un usuario
// api/users
router.post(
  "/",

  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("email", "Agrega un email valido").isEmail(),
    check("password", "Contraseña minimo 8 caracteres").isLength({ min: 8 }),
  ],
  usuarioController.CrearUsuario
);
module.exports = router;

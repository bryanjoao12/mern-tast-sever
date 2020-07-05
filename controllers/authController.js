const User = require("../models/User");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.autenticarUsuario = async (req, res) => {
  // Revisar so hay errores
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    // Revisar Si el usuario esta registra
    let usuario = await User.findOne({ email });
    if (!usuario) {
      return res.status(400).json({ msg: "El usuario no existe" });
    }

    // Revisar password
    const pass = await bcryptjs.compare(password, usuario.password);

    if (!pass) {
      return res.status(400).json({ msg: "Password incorrecto" });
    }
    const payload = {
      usuario: {
        id: usuario.id,
      },
    };
    // Firmar token

    jwt.sign(
      payload,
      process.env.SECRET_KEY,
      {
        expiresIn: 3600,
      },
      (err, token) => {
        if (err) throw err;

        // Mensaje de confirmacion
        res.json({ token });
      }
    );
  } catch (error) {
    console.log(error);
  }
};

// Obtiene el usuario esta autenticado

exports.usuarioAutenticado = async (req, res) => {
  try {
    const usuario = await User.findById(req.usuario.id).select("-password");
    res.json({ usuario });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

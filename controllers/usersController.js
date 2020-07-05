const User = require("../models/User");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.CrearUsuario = async (req, res) => {
  // Revisar so hay errores
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // extrae email y password
  const { email, password } = req.body;

  try {
    // Validad datos

    let usuario = await User.findOne({ email });

    if (usuario) {
      return res.status(400).json({ msg: "User Ya existente" });
    }

    // Guardar el nuevo usario
    usuario = new User(req.body);
    // Hasear el password
    const salt = await bcryptjs.genSalt(10);
    usuario.password = await bcryptjs.hash(password, salt);

    // Guardar usuario
    await usuario.save();

    // Crear y firma JWT

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
    res.status(400).send("Error al guardar datos");
  }
};

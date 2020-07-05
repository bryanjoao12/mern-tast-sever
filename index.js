const express = require("express");
const conectDb = require("./config/db");
const cors = require("cors");

// crear el servidor

const app = express();
// Conectar la base de datos

conectDb();

// Habilitar cors
app.use(cors());
// Habilitar express.json
app.use(express.json({ extended: true }));
// pruerto de la app
const PORT = process.env.PORT ||5000;

//Import rutas
app.use("/api/usuarios", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/proyectos", require("./routes/proyectos"));
app.use("/api/tareas", require("./routes/tareas"));
// Definir pagina principal

// arrancar servidor
app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});

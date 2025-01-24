const admin = require("../models/admin");
const adminRouter = require("express").Router();
const bcrypt = require("bcrypt");

adminRouter.get("/getAdmin", async (req, res) => {
  const { username, password } = req.query;
  const consulta = await admin.findOne({
    username: username,
  });
  if (consulta) {
    const comparacion = await bcrypt.compare(password, consulta.password);
    if (comparacion) {
      res.status(200).json({ route: "/admin" });
    } else {
      res.status(401).json({ message: "Contraseña inválida" });
    }
  } else {
    res.status(404).json({ message: "No se encontro el usuario" });
  }
});

module.exports = adminRouter;

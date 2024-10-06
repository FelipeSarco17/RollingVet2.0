const express = require("express");
const Router = express.Router();
const { get, getOne, create, update, del, disable, enable, login,verificarSesion } = require("../controllers/controladorPaciente")

Router.get("/obtenerTodos", get)

Router.get("/obtenerUno/:id", getOne)

Router.get("/verificar",verificarSesion)

Router.post("/crearPaciente", create)

Router.put("/:id", update)

Router.post("/desactivarPaciente/:id", disable)

Router.delete("/:id", del)

Router.post("/activarPaciente/:id", enable)

Router.post("/ingresar",login)



module.exports = Router;
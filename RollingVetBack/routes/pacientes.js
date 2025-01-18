const express = require("express");
const Router = express.Router();
const { get, getOne, create, update, del, disable, enable, login,verificarSesion, sendEmail, sendEmailContacto } = require("../controllers/controladorPaciente")
const validateSchema = require("../middlewares/validarDatos")
const { userSchema } = require("../validations/userSchema");

Router.get("/obtenerTodos", get)

Router.get("/obtenerUno/:id", getOne)

Router.get("/verificar",verificarSesion)

Router.post("/crearPaciente", validateSchema(userSchema),create)

Router.put("/:id", update)

Router.post("/desactivarPaciente/:id", disable)

Router.delete("/:id", del)

Router.post("/activarPaciente/:id", enable)

Router.post("/ingresar",login)

Router.post("/enviarPlan",sendEmail);

Router.post("/contacto",sendEmailContacto)


module.exports = Router;
const express = require("express");
const Router = express.Router();
const { get, getOne, create, update, del, disable, enable, getMascotasUsuario } = require("../controllers/controladorMascota")
const validarPeticion = require("../middlewares/validarToken");

Router.get("/obtenerTodas", get)

Router.get("/obtenerUna/:id", getOne)

Router.post("/crearMascota", create)

Router.put("/:id", update)

Router.post("/desactivarMascota/:id", disable)

Router.delete("/:id", del)

Router.post("/activarMascota/:id", enable)

Router.get("/obtenerMascotasUsuario/:propietarioID",getMascotasUsuario)

module.exports = Router;
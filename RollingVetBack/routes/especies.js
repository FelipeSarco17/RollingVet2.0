const express = require("express");
const Router = express.Router();
const { get, getOne, create, del, disable, enable } = require("../controllers/controladorEspecies")

Router.get("/obtenerTodas", get)

Router.get("/obtenerUna/:id", getOne)

Router.post("/crearEspecie", create)

Router.post("/desactivarEspecie/:id", disable)

Router.delete("/:id", del)

Router.post("/activarEspecie/:id", enable)



module.exports = Router;
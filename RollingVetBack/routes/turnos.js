const express = require("express");
const Router = express.Router();
const { get, getOne, create, update, del, obtenerTurnosUsuario } = require("../controllers/controladorTurnos")
const { turnSchema } = require("../validations/turnSchema");
const validateSchema = require("../middlewares/validarDatos")

Router.get("/obtenerTodos", get)

Router.get("/obtenerUno/:id", getOne)

Router.post("/crearTurno", validateSchema(turnSchema),create)

Router.put("/:id", update)

Router.delete("/:id", del)

Router.get("/obtenerTurnosUsuario/:cliente",obtenerTurnosUsuario)


module.exports = Router;

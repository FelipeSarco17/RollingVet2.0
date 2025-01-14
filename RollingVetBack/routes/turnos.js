const express = require("express");
const Router = express.Router();
const { get, getOne, create, update, del } = require("../controllers/controladorTurnos");
const { turnSchema } = require("../validations/turnSchema");
const validateSchema = require("../middlewares/validarDatos")

Router.get("/", get)

Router.get("/:id", getOne)

Router.post("/crearTurno", validateSchema(turnSchema),create)

Router.put("/:id", update)

Router.delete("/:id", del)



module.exports = Router;

const express = require("express");
const Router = express.Router();
const { get, getOne, create, update, del } = require("../controllers/controladorTurnos")

Router.get("/", get)

Router.get("/:id", getOne)

Router.post("/crearTurno", create)

Router.put("/:id", update)

Router.delete("/:id", del)



module.exports = Router;
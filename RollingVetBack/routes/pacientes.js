const express = require("express");
const Router = express.Router();
const { get, getOne, create, update, del, disable, enable } = require("../controllers/controladorPaciente")

Router.get("/", get)

Router.get("/:id", getOne)

Router.post("/crearPaciente", create)

Router.put("/:id", update)

Router.post("/desactivarPaciente/:id", disable)

Router.delete("/:id", del)

Router.post("/activarPaciente/:id", enable)

module.exports = Router;
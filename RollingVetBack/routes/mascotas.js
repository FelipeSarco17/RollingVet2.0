const express = require("express");
const Router = express.Router();
const { get, getOne, create, update, del, disable, enable } = require("../controllers/controladorMascota")

Router.get("/", get)

Router.get("/:id", getOne)

Router.post("/crearMascota", create)

Router.put("/:id", update)

Router.post("/desactivarMascota/:id", disable)

Router.delete("/:id", del)

Router.post("/activarMascota/:id", enable)

module.exports = Router;
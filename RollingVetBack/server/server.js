const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dbConnection = require("../database/config");

class Server {
    constructor(){
        this.app = express();
        this.port = 8080;
        this.rutaPacientes = "/api/pacientes";
        this.rutaMascotas = "/api/mascotas";
        this.rutaTurnos = "/api/turnos";
        this.rutaEspecies = "/api/especies";

        this.conectarDb();
        this.middlewares();
        this.rutas();
    }
    async conectarDb(){
        await dbConnection()
    }
    middlewares(){
        this.app.use(cors({origin:true,credentials:true,optionsSuccessStatus:200}))
        this.app.use(express.json());
        this.app.use(cookieParser());
    }
    rutas(){
        this.app.use(this.rutaPacientes , require("../routes/pacientes"));
        this.app.use(this.rutaMascotas , require("../routes/mascotas"));
        this.app.use(this.rutaTurnos , require("../routes/turnos"));
        this.app.use(this.rutaEspecies , require("../routes/especies"));
    }
    listen(){
        this.app.listen(this.port, ()=>{
            console.log("Servidor está activo en el puerto:",this.port);
        })
    }
}

module.exports = Server
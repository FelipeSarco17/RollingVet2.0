const { Schema, model } = require("mongoose");
const SchemaTurno = Schema({
    paciente: {
        type:Number,
        required:[true,"Este campo es obligatorio"]
    },
    propietario: {
        type:String,
        required:[true, "Este campo es obligatorio"]
    },
    telefono: {
        type:String,
        required:[true, "Este campo es obligatorio"]
    },
    sucursal: {
        type:String,
        required:[true, "Este campo es obligatorio"]
    },
    motivoConsulta: {
        type:String,
        required:[true, "Este campo es obligatorio"]
    },
    fecha: {
        type:String,
        required:[true, "Este campo es obligatorio"]
    },
    hora: {
        type:String,
        required:[true, "Este campo es obligatorio"]
    },
    estado: {
        type:Boolean,
        required:true
    }
})
SchemaTurno.methods.toJSON = function () {
    const {__v, ...turno} = this.toObject()
    return turno
}
module.exports = model("Turno", SchemaTurno);
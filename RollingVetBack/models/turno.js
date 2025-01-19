const { Schema, model } = require("mongoose");
const SchemaTurno = Schema({
    mascota: {
        type:Schema.Types.ObjectId,
        required:[true,"Este campo es obligatorio"]
    },
    cliente: {
        type:Schema.Types.ObjectId,
        required:[true, "Este campo es obligatorio"]
    },
    sucursal: {
        type:String,
        required:[true, "Este campo es obligatorio"]
    },
    veterinario:{
        type:String,
        required:[true,"Este campo es obligatorio"]
    },
    fecha: {
        type:String,
        required:[true, "Este campo es obligatorio"]
    },
    hora: {
        type:String,
        required:[true, "Este campo es obligatorio"]
    },
    detalleCita:{
        type:String,
        required:[true,"Este campo es obligatorio"]
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
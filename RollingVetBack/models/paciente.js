const { Schema, model } = require("mongoose");
const SchemaPaciente = Schema({
    nombre: {
        type:String,
        required:[true,"Este campo es obligatorio"]
    },
    apellido: {
        type:String,
        required:[true, "Este campo es obligatorio"]
    },
    email: {
        type:String,
        required:[true, "Este campo es obligatorio"]
    },
    telefono: {
        type:String,
        required:[true, "Este campo es obligatorio"]
    },
    clave: {
        type:String,
        required:[true, "Este campo es obligatorio"]
    },
    admin: {
        type:Boolean,
        default:false
    },
    mascotasIDs: {
        type:Array,
        default:[]
    },
    estado: {
        type:Boolean,
        default:true
    }
})
SchemaPaciente.methods.toJSON = function () {
    const {__v, _id, ...paciente} = this.toObject()
    paciente.uid = _id;
    return paciente
}
module.exports = model("Paciente", SchemaPaciente);

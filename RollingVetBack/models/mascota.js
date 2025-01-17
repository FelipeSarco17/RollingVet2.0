const { Schema, model } = require("mongoose");
const SchemaMascota = Schema({
    nombre: {
        type:String,
        required:[true,"Este campo es obligatorio"]
    },
    especie: {
        type:String,
        required:[true, "Este campo es obligatorio"]
    },
    descripcion: {
        type:String,
        required:[true, "Este campo es obligatorio"]
    },
    propietarioID: {
        type:String,
        required: true,
    },
    state: {
        type:Boolean,
        default:true
    }
})
SchemaMascota.methods.toJSON = function () {
    const {__v, _id, ...mascota} = this.toObject()
    mascota.uid = _id;
    return mascota
}
module.exports = model("Mascota", SchemaMascota);
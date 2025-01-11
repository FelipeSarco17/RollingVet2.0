const { Schema, model } = require("mongoose");
const SchemaEspecie = Schema({
    especie: {
        type:String,
        required:[true,"Este campo es obligatorio"]
    },
    estado: {
        type:Boolean,
        default:true
    }
})
SchemaEspecie.methods.toJSON = function () {
    const {__v, _id, ...especie} = this.toObject()
    especie.eid = _id;
    return especie
}
module.exports = model("Especie", SchemaEspecie);
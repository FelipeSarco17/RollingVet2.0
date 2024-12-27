const Paciente = require("../models/paciente");
// Validar email
const emailExiste = async (email) => {
    const existeEmail = await Paciente.findOne({email:email});
    if (existeEmail) {
        throw new Error(`El email ${email} ya está registrado.`)
    }
}
module.exports = {
    emailExiste
}
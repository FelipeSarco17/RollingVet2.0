const Paciente = require("../models/paciente");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken")
const firma = process.env.JWT_SECRET_KEY;

const get = async (req, res) => {
    let Pacientes = await Paciente.find({})
    return res.status(200).json({ Pacientes })
    
}

const getOne = async (req, res) => {
    let { id } = req.params;
    let paciente = await Paciente.findById({ _id: id })
    return res.status(200).json({ paciente });
}

const login = async (req, res) => {
    
    
    try{
        let { email, password } = req.body;
        let usuario = await Paciente.findOne({ email })
         
        if (password == usuario.clave) {
            
            
            const usuarioLogueado = {
                id: usuario._id,
                nombre: usuario.nombre,
                apellido: usuario.apellido,
                email: usuario.email,
                telefono: usuario.telefono,
                admin: usuario.admin,
                mascotasIDs: usuario.mascotasIDs,
                estado: usuario.estado
            }

            const tokenPayload = usuarioLogueado;
            const token = jwt.sign(tokenPayload,firma);
            res.cookie("jwt",token);
            return res.status(200).json(tokenPayload);
        }

    }catch(error){
        return res.status(500).json({message:"Error del servidor"});
    }
}        

const create = async (req, res) => {
    const { nombre, apellido, email, telefono, clave } = req.body;
    const nuevoPaciente = new Paciente({ nombre, apellido, email, telefono, clave });
    await nuevoPaciente.save();
    return res.status(201).json({ msg: "Paciente registrado exitosamente.", paciente: nuevoPaciente })
}

const update = async (req, res) => {
    let { id } = req.params;
    let obj = req.body;
    let paciente = await Paciente.findByIdAndUpdate(id, obj, { new: true })
    return res.status(203).json({ paciente });

}

const disable = async (req, res) => {
    let { id } = req.params;
    let paciente = await Paciente.findById(id)

    if (!paciente.estado) {
        return res.json({ msg: "El paciente ya está inhabilitado del sistema." })
    }
    let pacienteInactivo = await Paciente.findByIdAndUpdate(id, { estado: false }, { new: true })
    return res.send({ paciente: pacienteInactivo })
}
const del = async (req, res) => {
    let { id } = req.params;
    await Paciente.findByIdAndDelete({ _id: id })
    return res.send({ msg: "Paciente eliminado del sistema exitosamente." })
}
const enable = async (req, res) => {
    let { id } = req.params;
    let paciente = await Paciente.findById(id)
    let pacienteActivo = await Paciente.findByIdAndUpdate(id, { estado: true }, { new: true })
    return res.send({ paciente: pacienteActivo })
}
module.exports = {
    get,
    getOne,
    create,
    update,
    del,
    disable,
    enable,
    login
}

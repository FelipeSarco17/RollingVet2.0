const Paciente = require("../models/paciente");

const get = async (req, res) => {
    let Pacientes = await Paciente.find({})
    return res.status(200).json({Pacientes})
}
const getOne = async (req, res) => {
    let {id} = req.params;
    let paciente = await Paciente.findById({_id:id})
    return res.status(200).json({paciente});
}
const create = async (req, res) => {
    const { nombre, apellido, email, telefono, clave } = req.body;
    const nuevoPaciente = new Paciente({nombre, apellido, email, telefono, clave});
    await nuevoPaciente.save();
    return res.status(201).json({msg: "Paciente registrado exitosamente.", paciente:nuevoPaciente})
}
const update = async (req, res) => {
    let {id} = req.params;
    let obj = req.body;
    let paciente = await Paciente.findByIdAndUpdate(id, obj, {new:true})
    return res.status(203).json({paciente});
    
}
const disable = async (req, res) => {
    let {id} = req.params;
    let paciente = await Paciente.findById(id)
    
    if (!paciente.estado) {
        return res.json({msg:"El paciente ya está inhabilitado del sistema."})
    }
    let pacienteInactivo = await Paciente.findByIdAndUpdate(id, {estado:false}, {new:true})
    return res.send({paciente:pacienteInactivo})   
}
const del = async (req, res) => {
    let {id} = req.params;
    await Paciente.findByIdAndDelete({_id:id})
    return res.send({msg:"Paciente eliminado del sistema exitosamente."})
}
const enable = async (req, res) => {
    let {id} = req.params;
    let paciente = await Paciente.findById(id)
    let pacienteActivo = await Paciente.findByIdAndUpdate(id, {estado:true}, {new:true})
    return res.send({paciente:pacienteActivo})
}
module.exports = {
    get,
    getOne,
    create,
    update,
    del,
    disable,
    enable
}

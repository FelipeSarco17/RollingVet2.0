const Mascota = require("../models/mascota");


const get = async (req, res) => {
    let mascotas = await Mascota.find({})
    return res.status(200).json({mascotas})
}
const getOne = async (req, res) => {
    let {id} = req.params;
    let mascota = await Mascota.findById({_id:id})
    return res.status(200).json({mascota});
}

const create = async (req, res) => {
    const { nombre, especie, descripcion, propietarioID } = req.body;
    const mascotaNueva = new Mascota({ nombre, especie, descripcion, propietarioID });
    await mascotaNueva.save();
    return res.status(201).json({msg: "Mascota registrada exitosamente.", mascota:mascotaNueva})
}

const update = async (req, res) => {
    let {id} = req.params;
    let obj = req.body;
    let mascota = await Mascota.findByIdAndUpdate(id, obj, {new:true})
    return res.status(203).json({mascota});
    
}

const disable = async (req, res) => {
    let {id} = req.params;
    let mascota = await Mascota.findById(id)
    
    if (!mascota.state) {
        return res.json({msg:"La mascota ya está inhabilitada del sistema."})
    }
    let mascotaInactiva = await Mascota.findByIdAndUpdate(id, {state:false}, {new:true})
    return res.send({mascota:mascotaInactiva})   
}

const del = async (req, res) => {
    let {id} = req.params;
    await Mascota.findByIdAndDelete({_id:id})
    return res.send({msg:"Mascota eliminada exitosamente."})
}

const enable = async (req, res) => {
    let {id} = req.params;
    let mascota = await Mascota.findById(id)
    let mascotaActiva = await Mascota.findByIdAndUpdate(id, {state:true}, {new:true})
    return res.send({mascota:mascotaActiva})
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
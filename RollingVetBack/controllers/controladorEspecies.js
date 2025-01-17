const Especie = require("../models/especie");


const get = async (req, res) => {
    let especies = await Especie.find({})
     
    return res.status(200).json([...especies])
}
const getOne = async (req, res) => {
    let {id} = req.params;
    let especie = await Especie.findById({_id:id})
    return res.status(200).json({especie});
}

const create = async (req, res) => {
    const { especie } = req.body;
    const especieNueva = new Especie({ especie });
    await especieNueva.save();
    return res.status(201).json({msg: "Especie registrada exitosamente.", especie:especieNueva})
}

const disable = async (req, res) => {
    let {id} = req.params;
    let especie = await Especie.findById(id)
    
    if (!especie.state) {
        return res.json({msg:"La especie ya está inhabilitada del sistema."})
    }
    let especieInactiva = await Especie.findByIdAndUpdate(id, {state:false}, {new:true})
    return res.send({especie:especieInactiva})   
}

const del = async (req, res) => {
    let {id} = req.params;
    await Especie.findByIdAndDelete({_id:id})
    return res.send({msg:"Especie eliminada exitosamente."})
}

const enable = async (req, res) => {
    let {id} = req.params;
    let especie = await Especie.findById(id)
    let especieActiva = await Especie.findByIdAndUpdate(id, {state:true}, {new:true})
    return res.send({especie:especieActiva})
}

module.exports = {
    get,
    getOne,
    create,
    del,
    disable,
    enable
}
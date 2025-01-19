const Turno = require("../models/turno");



const get = async (req, res) => {
  let Turnos = await Turno.find({});
  return res.status(200).json({ Turnos });
};
const getOne = async (req, res) => {
  let { id } = req.params;
  let turno = await Turno.findById({ _id: id });
  return res.status(200).json({ turno });
};

const create = async (req, res) => {
  const {
    mascota,
    cliente,
    veterinario,
    sucursal,
    fecha,
    hora,
    detalleCita,
    estado,
  } = req.body;


  const turnoOcupado = await Turno.findOne({ fecha, hora, sucursal,veterinario, estado: true });

  try {
    if (turnoOcupado) {
      return res
        .status(400)
        .json({ msg: "Este turno ya se encuentra ocupado." });
    }
    const nuevoTurno = new Turno({
      mascota,
      cliente,
      veterinario,
      sucursal,
      fecha,
      hora,
      detalleCita,
      estado: true,
    });
    await nuevoTurno.save();
    return res
      .status(201)
      .json({ msg: "Turno registrado exitosamente.", turno: nuevoTurno });
  } catch (err) {
    return res.status(500).json({msg:err.message});
   }

};

const update = async (req, res) => {
  let { id } = req.params;
  let obj = req.body;
  let turno = await Turno.findByIdAndUpdate(id, obj, { new: true });
  return res.status(203).json({ turno });
};

const del = async (req, res) => {
  let { id } = req.params;
  
  try {
    await Turno.findByIdAndDelete({ _id: id });
    return res.status(200).json("Turno eliminado con éxito.");
  } catch (error) {
    
    return res.status(500).json(`Algo salio mal: ${error.message}`);
  }
  
  
};

const obtenerTurnosUsuario = async(req,res) =>{

  const {cliente} = req.params;
  try {
          const turnos = await Turno.find({ cliente, estado: true });
          console.log(turnos);
          
          if (!turnos || turnos.length == 0) {
              return res.status(404).json({ message: "Este usuario no tiene turnos reservados" });
          }
          return res.status(200).json([...turnos]);
      } catch (error) {
          console.error("Error al obtener turnos:", error);
          return res.status(500).json({ message: error.message });
      }


}


module.exports = {
  get,
  getOne,
  create,
  update,
  del,
  obtenerTurnosUsuario
};

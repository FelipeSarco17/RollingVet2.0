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
    servicio,
    sucursal,
    fecha,
    hora,
    estado,
  } = req.body;


  const turnoOcupado = await Turno.findOne({ fecha, hora, sucursal, estado: true });

  try {
    if (turnoOcupado) {
      return res
        .status(400)
        .json({ msg: "Este turno ya se encuentra ocupado." });
    }
    const nuevoTurno = new Turno({
      mascota,
      cliente,
      servicio,
      sucursal,
      fecha,
      hora,
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
  await Turno.findByIdAndDelete({ _id: id });
  return res.send({ msg: "Turno eliminado con éxito." });
};

module.exports = {
  get,
  getOne,
  create,
  update,
  del,
};

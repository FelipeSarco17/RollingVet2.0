const Paciente = require("../models/paciente");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken")
const firma = process.env.JWT_SECRET_KEY;




const get = async (req, res) => {
    let Pacientes = await Paciente.find({})
    return res.status(200).json({ Pacientes })

}

const getOne = async (req, res) => {
    let { id } = req.params;
    let paciente = await Paciente.findById({ _id: id })
    console.log(paciente);
    
    return res.status(200).json({ paciente });
}

const verificarSesion = async (req, res) => {

    const { access_token } = req.cookies;

    if (!access_token) return res.status(401).json({ mensaje: "No autorizado" });

    jwt.verify(access_token, process.env.JWT_SECRET_KEY, async (err, validPayload) => {
        if (err) return res.status(401).json({ Mensaje: 'Token expirado' });

        return res.status(200).json({
            id: validPayload.id,
            nombre: validPayload.nombre,
            apellido: validPayload.apellido,
            email: validPayload.email,
            telefono: validPayload.telefono,
            admin: validPayload.admin,
            mascotasIDs: validPayload.mascotasIDs,
            estado: validPayload.estado
        });

    });

}


const login = async (req, res) => {


    try {
        let { email, password } = req.body;
        let usuario = await Paciente.findOne({ email })

        if (!usuario) return res.status(400).json({ mensaje: "Usuario no encontrado." })

        const contraseñaValida = bcryptjs.compareSync(password, usuario.clave);


        if (!contraseñaValida) return res.status(400).json({ mensaje: "Contraseña incorrecta" })



        const tokenPayload = {
            id: usuario._id,
            nombre: usuario.nombre,
            apellido: usuario.apellido,
            email: usuario.email,
            telefono: usuario.telefono,
            admin: usuario.admin,
            mascotasIDs: usuario.mascotasIDs,
            estado: usuario.estado
        }

        const token = jwt.sign(tokenPayload, firma, {
            expiresIn: '3d'
        });

        res.cookie("access_token", token, {
            sameSite: 'none',
            httpOnly: false,
            secure: true,
            priority: "high",
        });

        return res.status(200).json({  ...tokenPayload });


    } catch (error) {
        return res.status(500).json({ message: "Error del servidor" });
    }
}

const create = async (req, res) => {

    try {
        const { nombre, apellido, email, telefono, clave } = req.body;

        const usuarioRepetido = await Paciente.findOne({ email });
        if (usuarioRepetido) return res.status(400).json({ message: "Ya existe un usuario con este Email." })

        const claveEncriptada = bcryptjs.hashSync(clave, 10);

        const nuevoPaciente = new Paciente({ nombre, apellido, email, telefono, clave:claveEncriptada });
        const pacienteGuardado = await nuevoPaciente.save();
        
        return res.status(201).json({ message: "Usuario registrado con exito." });
    } catch (error) {
        return res.status(500).json({message:error.message})
    }



    // const usuario = await Paciente.findOne(email);
    // const usuarioLogueado = {
    //     id: usuario._id,
    //     nombre: usuario.nombre,
    //     apellido: usuario.apellido,
    //     email: usuario.email,
    //     telefono: usuario.telefono,
    //     admin: usuario.admin,
    //     mascotasIDs: usuario.mascotasIDs,
    //     estado: usuario.estado
    // }
    // const tokenPayload = usuarioLogueado;
    // const token = jwt.sign(tokenPayload,firma);
    // res.cookie("jwt",token);
    return res.status(201).json(usuarioLogueado);
}

const update = async (req, res) => {
    
    try{
        let { id } = req.params;
        let obj = req.body;
        let paciente = await Paciente.findByIdAndUpdate(id, obj, { new: true })
        const tokenPayload = {
            id: paciente._id,
            nombre: paciente.nombre,
            apellido: paciente.apellido,
            email: paciente.email,
            telefono: paciente.telefono,
            admin: paciente.admin,
            mascotasIDs: paciente.mascotasIDs,
            estado: paciente.estado
        }
    
        const token = jwt.sign(tokenPayload, firma, {
            expiresIn: '3d'
        });
    
        res.cookie("access_token", token, {
            sameSite: 'none',
            httpOnly: false,
            secure: true,
            priority: "high",
        });

        
        return res.status(203).json({ ...tokenPayload });
    }catch(error){
        return res.status(500).json({message:error.message})
    }
    

   


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
    login,
    verificarSesion
}

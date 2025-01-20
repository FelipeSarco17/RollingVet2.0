const Paciente = require("../models/paciente");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken")
const firma = process.env.JWT_SECRET_KEY;
const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.email',
    port: 587,
    auth: {
        user: process.env.USEREMAIL,
        pass: process.env.APIKEY
    }
})

const createMailWithTemplate = () => {
    return `
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email Veterinaria</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f4f4f4; padding: 20px 0;">
    <tr>
      <td align="center">
        <table width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
          <!-- Encabezado -->
          <tr>
            <td align="center" style="background-color: #00bcd4; padding: 20px;">
              <img src="https://www.zarla.com/images/zarla-carevet-1x1-2400x2400-20220323-t7b98tfcjcvqdcqwkpq3.png?crop=1:1,smart&width=250&dpr=2" alt="Logo Carevet" style="width: 100px;  display: block;">
            
            </td>
          </tr>
          <!-- Cuerpo -->
          <tr>
            <td style="padding: 20px;">
              <h2 style="color: #333333; text-align: center; font-size: 22px; margin-bottom: 10px;">¡Conoce nuestros planes!</h2>
              <p style="color: #555555; text-align: center; font-size: 16px; line-height: 1.5; margin-bottom: 20px;">En Carevet tenemos opciones diseñadas para cuidar de tus mascotas de la mejor manera. Pronto nos contactaremos contigo para darte toda la informacion que necesitas.</p>
              
            </td>
          </tr>
          
          <!-- Pie de página -->
          <tr>
            <td align="center" style="background-color: #333333; padding: 10px; color: #ffffff; font-size: 14px;">
              <p style="margin: 0;">Carevet © 2025 | Todos los derechos reservados.</p>
              <p style="margin: 0;">Tucumán, Argentina</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>

    `
}



const sendEmail = async(req,res) => {

    const {email} = req.body;

    const info = await transporter.sendMail({
        from: ' "Carevet" <rollingvet7@gmail.com>',
        to: email,
        subject: "Contacto sobre planes",
        html: createMailWithTemplate()
    });

    return res.status(200).json(info);

}

const sendEmailContacto = async(req,res) =>{

    const {cliente,email,texto} = req.body;

    const info = await transporter.sendMail({
        from: `"${cliente} <${email}>"`,
        to: "raegan23@ethereal.email",
        subject: `Mensaje del cliente ${cliente} <${email}>`,
        text: texto
    });

    if(info.rejected.length != 0) return res.status(500).json(info)
    return res.status(200).json(info)
}


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
        console.log(email, password);
        
        let usuario = await Paciente.findOne({ email })

        console.log(usuario);
        
        if (!usuario) return res.status(400).json({ mensaje: "Usuario no encontrado." })

        const contraseñaValida = bcryptjs.compareSync(password, usuario.clave);

        console.log(contraseñaValida);
        

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

        return res.status(200).json({ ...tokenPayload });


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

        const nuevoPaciente = new Paciente({ nombre, apellido, email, telefono, clave: claveEncriptada });
        const pacienteGuardado = await nuevoPaciente.save();

        return res.status(201).json({ message: "Usuario registrado con exito." });
    } catch (error) {
        return res.status(500).json({ message: error.message })
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

    try {
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
    } catch (error) {
        return res.status(500).json({ message: error.message })
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
    verificarSesion,
    sendEmail,
    sendEmailContacto
}

const {z} = require('zod')

const telefonoInvalido = "Telefono Invalido";
const claveInvalida = "Debe empezar con mayuscula. Contener al menos una minuscula, un numero y un simbolo."
const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/

const userSchema = z.object({
    nombre: z.string().min(3,{message:"Debe contener al menos 3 caracteres."}),
    apellido: z.string().min(3,{message:"Debe contener al menos 3 caracteres."}),
    telefono: z.number().gt(999999999,{message:"El telefono debe tener minimo 10 digitos"}).lt(9999999999,{message:"El telefono debe contener maximo 10 digitos"}).int({message:telefonoInvalido}).positive({message:telefonoInvalido}),
    email: z.string().email({message:"E-mail invalido"}),
    clave: z.string().min(8,{message:"Debe contener al menos 8 caracteres."}).max(15,{message:"Debe tener maximo 15 caracteres"}).regex(regex,{message:claveInvalida})
});


module.exports = {
    userSchema
}
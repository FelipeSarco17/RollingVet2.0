import {z} from "zod"

const regexNombre = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
const telefonoRegex = /^\+?(\d{1,3})?[\s.-]?(\(?\d{1,4}\)?)?[\s.-]?\d{1,4}[\s.-]?\d{1,4}[\s.-]?\d{1,9}$/;


export const contactSchema = z.object({
    cliente: z.string({required_error:"El nombre es requerido."}).trim().min(2,{message:"El nombre debe tener mínimo 2 letras."}).max(30,{message:"El nombre debe tener maximo 30 letras."}).regex(regexNombre,{message:"El nombre solo debe contener letras."}),
    email: z.string({required_error:"El email es requerido"}).email({message:"Ingrese un email valido."}),
    texto: z.string({required_error:"El mensaje es requerido"}).min(15,{message:"El mensaje debe contener mínimo 15 caracteres"}).max(200,{message:"El mensaje debe tener máximo 200 caracteres"})
})


export const planSchema = z.object({

    nombre: z.string({required_error:"El nombre es requerido."}).trim().min(2,{message:"El nombre debe tener mínimo 2 letras."}).max(30,{message:"El nombre debe tener maximo 30 letras."}).regex(regexNombre,{message:"El nombre solo debe contener letras."}),
    email: z.string({required_error:"El email es requerido"}).email({message:"Ingrese un email valido."}),
    telefono: z.string({required_error:"El mensaje es requerido"}).regex(telefonoRegex,{message:"Ingrese un telefono valido"})

})

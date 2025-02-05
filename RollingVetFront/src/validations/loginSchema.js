import {z} from "zod"


export const loginSchema = z.object({

    email: z.string({required_error:"El email es requerido"}).email({message:"Ingrese un email valido"}),
    password:z.string({required_error:"La contraseña es requerida"})

})
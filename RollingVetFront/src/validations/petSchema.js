import {z} from 'zod';

export const petSchema = z.object({
    nombre: z.string().min(2,{message: "El nombre de la mascota debe contener al menos 2 caracteres"}),
    especia: z.

})
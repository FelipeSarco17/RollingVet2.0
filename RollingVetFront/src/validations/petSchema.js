import {z} from 'zod';

const regexNombre = /^[A-Za-z]+$/;

export const petSchema = z.object({
    nombre: z.string().min(2,{message: "El nombre de la mascota debe contener al menos 2 caracteres"}).max(25, {message: "El nombre de la mascota no debe superar los 25 caracteres"}).regex(regexNombre, {
        message: "El nombre solo debe incluir letras",
      }),
    especie: z.string().refine(async (especie) => {validarEspecie(especie)})
        
    })
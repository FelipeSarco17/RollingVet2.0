import { z } from 'zod';
import { leerEspecies } from '../utils/utils';

const regexNombre = /^[A-Za-z]+$/;

const validarEspecie = async (especie) => {
  const especiesData = await leerEspecies();
  let { especies } = especiesData;

  especies = especies.map(e => e.especie); // Evitar sobreescribir `especie` como variable.
  return especies.includes(especie);
};

export const petSchema = z.object({
  nombre: z.string()
    .min(2, { message: "El nombre de la mascota debe contener al menos 2 caracteres" })
    .max(25, { message: "El nombre de la mascota no debe superar los 25 caracteres" })
    .regex(regexNombre, { message: "El nombre solo debe incluir letras" }),
  especie: z.string().refine(
    async (especie) => await validarEspecie(especie),
    { message: "Debes seleccionar una especie" }
  ),
  descripcion: z.string().max(150, {message: "la descripción no puede superar los 150 caracteres"}).optional(),
});
export const modificarPetSchema = z.object({
    nombre: z.string().min(2,{message: "El nombre de la mascota debe contener al menos 2 caracteres"}).max(25, {message: "El nombre de la mascota no debe superar los 25 caracteres"}).regex(regexNombre, {
        message: "El nombre solo debe incluir letras",
      }),
    especie: z.string().refine(async (especie) => {validarEspecie(especie)})
        
    })
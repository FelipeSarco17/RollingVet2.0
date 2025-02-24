import { z } from 'zod';
import { leerEspecies } from '../utils/utils';

// Expresión regular para nombres válidos.
const regexNombre = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

// Mensajes comunes para validaciones.
const mensajesValidacion = {
  nombreMin: "El nombre de la mascota debe contener al menos 2 caracteres",
  nombreMax: "El nombre de la mascota no debe superar los 25 caracteres",
  nombreRegex: "El nombre solo debe incluir letras",
  especieInvalida: "Debes seleccionar una especie válida",
  descripcionMax: "La descripción no puede superar los 150 caracteres",
  errorSistemaPropietario: "Lo sentimos, hay un error con el sistema. Por favor, vuelve a intentarlo más tarde."
};


const validarEspecie = async (especie) => {
  const especies = await leerEspecies();
  console.log(especies);
  return especies.some((e) => e.especie === especie);
};

// Base schema para campos comunes.
const baseSchema = z.object({
  nombre: z
    .string()
    .min(2, { message: mensajesValidacion.nombreMin })
    .max(25, { message: mensajesValidacion.nombreMax })
    .regex(regexNombre, { message: mensajesValidacion.nombreRegex }),
  descripcion: z
    .string()
    .max(150, { message: mensajesValidacion.descripcionMax })
    .optional(),
});

// Esquema para crear mascotas, extendiendo `baseSchema`.
export const petSchema = baseSchema.extend({
  especie: z
    .string()
    .refine(
      async (especie) => await validarEspecie(especie),
      { message: mensajesValidacion.especieInvalida }
    ),
});

// Esquema para modificar mascotas, basado en `baseSchema`.
export const modificarPetSchema = baseSchema;
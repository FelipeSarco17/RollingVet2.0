import { z } from "zod";
import { emailOriginal } from "../utils/estadosCompartidos";
import { leerPacientes } from "../utils/utils";

// Centralización de mensajes de error
const mensajesDeError = {
  telefonoInvalido: "Teléfono inválido",
  claveInvalida:
    "Debe empezar con mayúscula, contener al menos una minúscula, un número y un símbolo.",
  emailEnUso: "El correo ya está en uso",
  nombreCorto: "Debe contener al menos 3 caracteres.",
  nombreLargo: "No puede contener más de 30 caracteres",
  contraseñasNoCoinciden: "Las contraseñas deben coincidir",
};

const regexClave = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;

// Función para validar email
const validarEmail = async (email, original = null) => {
  const pacientesData = await leerPacientes();
  const { Pacientes } = pacientesData;

  // Verifica si el email ya existe, ignorando el original
  return !Pacientes.some(
    (paciente) => paciente.email === email && paciente.email !== original
  );
};

// Esquema base común
const baseSchema = z.object({
  nombre: z
    .string()
    .min(3, { message: mensajesDeError.nombreCorto })
    .max(30, { message: mensajesDeError.nombreLargo }),
  apellido: z
    .string()
    .min(3, { message: mensajesDeError.nombreCorto })
    .max(30, { message: mensajesDeError.nombreLargo }),
  telefono: z
    .string()
    .transform((data) => parseInt(data))
    .pipe(
      z
        .number()
        .gt(999999999, { message: "El teléfono debe tener mínimo 10 dígitos" })
        .lt(9999999999, { message: "El teléfono debe contener máximo 10 dígitos" })
        .int({ message: mensajesDeError.telefonoInvalido })
        .positive({ message: mensajesDeError.telefonoInvalido })
    ),
  email: z
    .string()
    .email({ message: "E-mail inválido" })
    .refine(async (email) => await validarEmail(email, emailOriginal), {
      message: mensajesDeError.emailEnUso,
    }),
});

// Esquema para registro de usuario
export const userSchema = baseSchema
  .extend({
    clave: z
      .string()
      .min(8, { message: "Debe contener al menos 8 caracteres." })
      .max(15, { message: "Debe tener máximo 15 caracteres" })
      .regex(regexClave, { message: mensajesDeError.claveInvalida }),
    confirmClave: z.string(),
  })
  .refine((data) => data.clave === data.confirmClave, {
    message: mensajesDeError.contraseñasNoCoinciden,
    path: ["confirmClave"],
  });

// Esquema para modificar usuario
export const modificarUserSchema = baseSchema.extend({
  admin: z.string().min(2, { message: "Debes seleccionar una opción" })
});
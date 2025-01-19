const { z } = require("zod")


const maxDate = new Date();
maxDate.setFullYear(maxDate.getFullYear() + 1);

const turnSchema = z.object({
    cliente: z.string({ required_error: "El ID del cliente es requerido." }),
    mascota: z.string({ required_error: "El ID de la mascota es requerido." }),
    fecha: z.string({ required_error: "La fecha es requerida" }).date().superRefine((val, ctx) => {
        if (new Date(val) < new Date()) {
            ctx.addIssue({
                code: z.ZodIssueCode.invalid_date,
                message: "La fecha mínima es hoy",
                fatal: true
            })
            return z.NEVER;
        }

        if (new Date(val) > maxDate) {
            ctx.addIssue({
                code: z.ZodIssueCode.invalid_date,
                message: "La fecha máxima es a un año",
            })
        }
    }).refine((dateString) => {
        const date = new Date(dateString);
        const day = date.getDay();
        // Validar que el día no sea sábado (6) ni domingo (0)
        return day !== 5 && day !== 6;
      }, {
        message: "La fecha no puede ser un sábado o domingo."
      }),
    hora:z.string({required_error:'La Hora es requerida'}),
    sucursal:z.string({required_error:"La sucursal es requerida"}),
    veterinario:z.string({required_error:"El veterinario es requerido"}),
    detalleCita:z.string({required_error:"El detalle de la cita es requerido"}).min(15,{message:"El detalle debe tener mínimo 15 caracteres"}).max(200,{message:"El detalle debe tener máximo 200 caracteres"})
})


module.exports = {
    turnSchema
}
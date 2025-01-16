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
    }),
    hora:z.string({required_error:'La Hora es requerida'}),
    sucursal:z.string({required_error:"La sucursal es requerida"}),
    servicio:z.string({required_error:"El servicio es requerido"})
})


module.exports = {
    turnSchema
}
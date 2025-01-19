import { date, z } from "zod";

const today = new Date().toISOString().split("T")[0];
const maxDate = new Date();
maxDate.setFullYear(maxDate.getFullYear() + 1);
const maxDateString = maxDate.toISOString().split("T")[0];

export const turnSchema = z.object({
    fecha: z.string().date().superRefine((val,ctx)=> {
        if(new Date(val)< new Date()){
            ctx.addIssue({
                code: z.ZodIssueCode.invalid_date,
                message: "La fecha mínima es hoy",
                fatal:true
            })
            return z.NEVER;
        }

        if(new Date(val) > maxDate){
            ctx.addIssue({
                code: z.ZodIssueCode.invalid_date,
                message: "La fecha máxima es a un año",
            })
        }
    }),
    mascota: z.string({required_error:"La mascota es requerida."}),
    veterinario: z.string({required_error:"El veterinario es requerido."}),
    sucursal: z.string({required_error:"La sucursal es requerida."}),
    detalleCita:z.string({required_error:"El detalle de la cita es requerido"}).min(15,{message:"El detalle debe tener mínimo 15 caracteres"}).max(200,{message:"El detalle debe tener máximo 200 caracteres"}),
    hora: z.string({required_error:"La hora es requerida."})
})

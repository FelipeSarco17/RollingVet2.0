import { date, z } from "zod";

const today = new Date().toISOString().split("T")[0];
const maxDate = new Date();
maxDate.setFullYear(maxDate.getFullYear() + 1);
const maxDateString = maxDate.toISOString().split("T")[0];

export const turnSchema = z.object({
    fecha: z.string({required_error:"La fecha es requerida."}).date().superRefine((val,ctx)=> {
        const fecha = new Date(val);
        if(fecha< new Date()){
            ctx.addIssue({
                code: z.ZodIssueCode.invalid_date,
                message: "La fecha mínima es hoy",
                fatal:true
            })
            return z.NEVER;
        }
        console.log(fecha.getDay());
        
        // if(fecha.getDay() == 6 || fecha.getDay() == 5){
        //     ctx.addIssue({
        //         code: z.ZodIssueCode.invalid_date,
        //         message: "La fecha no puede ser un sábado o domingo."
        //     })
        // }

        if(fecha > maxDate){
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
    mascota: z.string({required_error:"La mascota es requerida."}).min(1,{message:"La mascota es requerida."}),
    veterinario: z.string({required_error:"El veterinario es requerido."}).min(1,{message:"El veterinario es requerida."}),
    sucursal: z.string({required_error:"La sucursal es requerida."}).min(1,{message:"La sucursal es requerida."}),
    detalleCita:z.string({required_error:"El detalle de la cita es requerido"}).min(15,{message:"El detalle debe tener mínimo 15 caracteres"}).max(200,{message:"El detalle debe tener máximo 200 caracteres"}),
    hora: z.string({required_error:"La hora es requerida."}).min(1,{message:"La hora es requerida."})
})

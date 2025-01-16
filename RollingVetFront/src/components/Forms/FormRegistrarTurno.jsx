import React, { useState } from 'react'
import Input from "../FormComponents/Input"
import { useForm } from 'react-hook-form'
import Select from '../FormComponents/Select'
import { turnSchema } from '../../validations/turnSchema'
import { registrarTurno } from '../../utils/utils'
import AlertaConfirmacion from '../../common/AlertaConfirmacion'
import { zodResolver } from '@hookform/resolvers/zod'
import Swal from 'sweetalert2'
import {useAuth} from "../../contexts/AuthProvider"

const FormRegistrarTurno = () => {
    const [turno, setTurno] = useState();
    const {user} = useAuth();

    const { register, handleSubmit, formState: { errors }, watch } = useForm({ resolver: zodResolver(turnSchema) })
    const mascotasCliente = ["Pedro", "Juana", "Lionel"]
    const servicios = [
        "Peluqueria",
        "Consulta Veterinaria",
        "Baño"
    ]
    const horarios = ["9:00", "10:00", "11:00", "17:00", "18:00", "19:00", "20:00"];
    const reservar = (obj) => {
            console.log(obj);
            
            const nuevoTurno = {cliente:user.id,...obj}
            console.log(nuevoTurno);
            
            Swal.fire({
                title: "¿Desea reservar este turno?",
                icon: 'question',
                background: '#393939',
                color: '#fafafa',
                confirmButtonColor: "#197600",
                cancelButtonColor: "#a40000",
                confirmButtonText: "Aceptar",
                denyButtonText: "Cancelar",
                showConfirmButton: true,
                showDenyButton: true
            }).then(async (result) => {
                if (result.isConfirmed) {
                    let res = await registrarTurno(nuevoTurno);
                    console.log(res);
                    
                }
            })

    }

    
    const today = new Date().toISOString().split("T")[0];
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 1);
    const maxDateString = maxDate.toISOString().split("T")[0];
    return (
        <form onSubmit={handleSubmit(reservar)}
            className="flex flex-col gap-12 w-full max-w-lg p-6">
            <Input label="Fecha del Turno" type="date" min={today} max={maxDateString} name="fecha" register={register} error={errors.fechaTurno?.message} />
            <Select label="Mascota" name="mascota" options={mascotasCliente} register={register} error={errors.mascotas?.message} />
            <Select label="Servicio" name="servicio" options={servicios} register={register} error={errors.servicios?.message} />
            <Select label="Horario" name="hora" options={horarios} register={register} error={errors.horaTurno?.message} />
            <Select label="Sucursal" name="sucursal" options={["Sucursal 1", "Sucursal 2"]} register={register} error={errors.sucursal?.message}/>
            <button type='submit' className='p-1.5 text-black font-semibold bg-rose-500 rounded-md p-1 mt-2 '>Reservar</button>
        </form>
    )
}

export default FormRegistrarTurno
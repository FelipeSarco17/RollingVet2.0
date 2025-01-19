import React, { useEffect, useState } from 'react'
import Input from "../FormComponents/Input"
import { useForm } from 'react-hook-form'
import Select from '../FormComponents/Select'
import { turnSchema } from '../../validations/turnSchema'
import { registrarTurno } from '../../utils/utils'
import AlertaConfirmacion from '../../common/AlertaConfirmacion'
import { zodResolver } from '@hookform/resolvers/zod'
import Swal from 'sweetalert2'
import { useAuth } from "../../contexts/AuthProvider"
import SelectMascotas from '../FormComponents/SelectMascotas'
import { traerMascotasUsuario } from '../../utils/utils'
import { useParams } from 'react-router-dom'
import TextArea from "../FormComponents/TextArea"

const FormRegistrarTurno = () => {
    const {id} = useParams();
    const [turno, setTurno] = useState();
    const [mascotasCliente, setMascotasCliente] = useState([])
    const [mascotasError,setMascotasError] = useState();
    const {user} = useAuth()
    const { register, handleSubmit, formState: { errors }, watch } = useForm({ resolver: zodResolver(turnSchema) })

    const servicios = [
        "Peluqueria",
        "Consulta Veterinaria",
        "Baño"
    ]
    const horarios = ["9:00", "10:00", "11:00", "17:00", "18:00", "19:00", "20:00"];
    console.log(user);
    

    useEffect(() => {

        async function obtenerMascotasUsuario(id) {
            try {
                const mascotasUs = await traerMascotasUsuario(id);
                setMascotasCliente(mascotasUs.mascotas);
            } catch (error) {
                setMascotasError(error.response.data.message);
            }
        }

        obtenerMascotasUsuario(id)

    }, []);

    const reservar = (obj) => {
        console.log(obj);

        const nuevoTurno = { cliente: id, ...obj }
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
                
                try{
                    let res = await registrarTurno(nuevoTurno);
                    Swal.fire({
                        title: res.msg,
                        icon: "success",
                        background: '#393939',
                        color: '#fafafa',
                    })
                }catch(error){
                    Swal.fire({
                        title: error.response.data.msg,
                        icon:"error",
                        background: '#393939',
                        color: '#fafafa',
                    })
                }
                

            }
        })

    }

    console.log(watch());
    
    const today = new Date().toISOString().split("T")[0];
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 1);
    const maxDateString = maxDate.toISOString().split("T")[0];
    return (
        <form onSubmit={handleSubmit(reservar)}
            className="flex flex-col gap-12 w-full max-w-lg p-6">
            <Input label="Fecha del Turno" type="date" min={today} max={maxDateString} name="fecha" register={register} error={errors.fecha?.message} />
            <SelectMascotas label="Mascota" name="mascota" options={mascotasCliente} register={register} error={errors.mascota?.message} />
            <Select label="Veterinario" name="veterinario" options={["Dr.Juan Lopez" ,"Dr.Eugenia Rodriguez","Dr.Leandro Perez"]} register={register} error={errors.veterinario?.message} />
            <Select label="Horario" name="hora" options={horarios} register={register} error={errors.hora?.message} />
            <Select label="Sucursal" name="sucursal" options={["Sucursal 1", "Sucursal 2"]} register={register} error={errors.sucursal?.message} />
            <TextArea label="Detalle de cita" name="detalleCita" register={register} error={errors.detalleCita?.message}/>
            <button type='submit' className='p-1.5 text-black font-semibold bg-rose-500 rounded-md p-1 mt-2 '>Reservar</button>
        </form>
    )
}

export default FormRegistrarTurno
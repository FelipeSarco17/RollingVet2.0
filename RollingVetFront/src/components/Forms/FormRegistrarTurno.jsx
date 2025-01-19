import React, { useEffect, useState } from 'react';
import Input from "../FormComponents/Input";
import { useForm } from 'react-hook-form';
import Select from '../FormComponents/Select';
import { turnSchema } from '../../validations/turnSchema';
import { registrarTurno } from '../../utils/utils';
import Swal from 'sweetalert2';
import { useAuth } from "../../contexts/AuthProvider";
import SelectMascotas from '../FormComponents/SelectMascotas';
import { traerMascotasUsuario } from '../../utils/utils';
import { useParams } from 'react-router-dom';
import TextArea from "../FormComponents/TextArea";

const FormRegistrarTurno = () => {
    const { id } = useParams();
    const [mascotasCliente, setMascotasCliente] = useState([]);
    const [mascotasError, setMascotasError] = useState();
    const { user } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(turnSchema) });

    const servicios = ["Peluquería", "Consulta Veterinaria", "Baño"];
    const horarios = ["9:00", "10:00", "11:00", "12:00", "17:00", "18:00", "19:00", "20:00"];

    useEffect(() => {
        async function obtenerMascotasUsuario(id) {
            try {
                const mascotasUs = await traerMascotasUsuario(id);
                setMascotasCliente(mascotasUs.mascotas);
            } catch (error) {
                setMascotasError(error.response.data.message);
            }
        }

        obtenerMascotasUsuario(id);
    }, [id]);

    // Función para verificar si una fecha es sábado o domingo
    const esFinDeSemana = (fecha) => {
        const dia = new Date(fecha).getDay();
        return dia === 0 || dia === 6; // 0 = domingo, 6 = sábado
    };

    // Configuración del rango de fechas
    const hoy = new Date().toISOString().split("T")[0];
    const fechaMaxima = new Date();
    fechaMaxima.setFullYear(new Date().getFullYear() + 1);
    const maxFecha = fechaMaxima.toISOString().split("T")[0];

    // Validación para deshabilitar fines de semana
    const manejarCambioFecha = (event) => {
        const valorFecha = event.target.value;
        if (esFinDeSemana(valorFecha)) {
            event.target.setCustomValidity("Los días sábado y domingo no están disponibles.");
        } else {
            event.target.setCustomValidity("");
        }
    };

    const reservar = (datos) => {
        const nuevoTurno = { cliente: id, ...datos };

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
                try {
                    let res = await registrarTurno(nuevoTurno);
                    Swal.fire({
                        title: res.msg,
                        icon: "success",
                        background: '#393939',
                        color: '#fafafa',
                    });
                } catch (error) {
                    Swal.fire({
                        title: error.response.data.msg,
                        icon: "error",
                        background: '#393939',
                        color: '#fafafa',
                    });
                }
            }
        });
    };

    return (
        <form onSubmit={handleSubmit(reservar)}
            className="flex flex-col gap-12 w-full max-w-lg p-6">
            <Input label="Fecha del Turno" type="date" min={today} max={maxDateString} name="fecha" register={register} error={errors.fecha?.message} />
            <SelectMascotas label="Mascota" name="mascota" options={mascotasCliente} register={register} error={errors.mascotas?.message} />
            <Select label="Veterinario" name="veterinario" options={["Dr.Juan Lopez" ,"Dr.Eugenia Rodriguez","Dr.Leandro Perez"]} register={register} error={errors.veterinario?.message} />
            <Select label="Horario" name="hora" options={horarios} register={register} error={errors.horaTurno?.message} />
            <Select label="Sucursal" name="sucursal" options={["Sucursal 1", "Sucursal 2"]} register={register} error={errors.sucursal?.message} />
            <TextArea label="Detalle de cita" name="detalleCita" register={register} error={errors.detalleCita?.message}/>
            <button type='submit' className='p-1.5 text-black font-semibold bg-rose-500 rounded-md p-1 mt-2 '>Reservar</button>
        </form>
    );
};

export default FormRegistrarTurno;
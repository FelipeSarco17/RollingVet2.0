import axios from './axios';
import Cookies from "js-cookie"

// const urlPacientes = import.meta.env.VITE_URL_PACIENTES;
// const urlMascotas = import.meta.env.VITE_URL_MASCOTAS;
// const urlTurnos = import.meta.env.VITE_URL_TURNOS;

const urlPacientes = "http://localhost:8080/api/pacientes"
const urlMascotas = "http://localhost:8080/api/mascotas"

//FUNCIONES PACIENTE

export const ingresoUsuario = async(obj)=>{

    let res = await axios.post(`/pacientes/ingresar`,obj);    
    return res;
}

export const leerPacientes = async()=>{
    let pacientes = await axios.get(`/pacientes/obtenerTodos`);
    return pacientes.data;
}

export const capturarUnPaciente = async (id) => {
    let paciente = await axios.get(`/pacientes/obtenerUno/${id}`);
    return paciente.data;
}

export const modificarPaciente = async(id, obj) => {
    let paciente = await axios.put(`/pacientes/${id}`, obj);
    return paciente
}

export const eliminarPaciente = async (id) => {
    let paciente = await axios.delete(`/pacientes/${id}`)
}

export const registrarUsuario = async(obj)=>{
    let res = await axios.post(`/pacientes/crearPaciente`,obj);
    return res;
}

export const verificarSesionIniciada = async()=>{
    let res = await axios.get(`/pacientes/verificar`);
    return res;
}



//FUNCIONES TOKEN


//////


//FUNCIONES MASCOTAS

export const leerMascotas = async () => {
    let mascotas = await axios.get(`/mascotas/obtenerTodas`);
    return mascotas.data;
}

export const capturarUnaMascota = async (id) => {
    let mascota = await axios.get(`/mascotas/obtenerUna/${id}`);
    console.log(mascota);
    return mascota.data;
}

export const modificarMascota = async (id, obj) => {
    let mascota = await axios.put(`/mascotas/${id}`, obj);
    return mascota;
}

export const eliminarMascota = async (id) => {
    let mascota = await axios.delete(`/mascotas/${id}`)
}

export const registrarMascota = async(obj)=>{
    let res = await axios.post(`/pacientes/crearPaciente`,obj);
    return res;
}
import axios from './axios';
import Cookies from "js-cookie"

// const urlPacientes = import.meta.env.VITE_URL_PACIENTES;
// const urlMascotas = import.meta.env.VITE_URL_MASCOTAS;
// const urlTurnos = import.meta.env.VITE_URL_TURNOS;

const urlPacientes = "http://localhost:8080/api/pacientes"


//FUNCIONES PACIENTE

export const ingresoUsuario = async(obj)=>{

    let res = await axios.post(`/pacientes/ingresar`,obj);    
    return res;
}

export const leerPacientes = async()=>{
    let pacientes = await axios.get(`/pacientes`);
    return pacientes.data;
}


export const registrarUsuario = async(obj)=>{

    let res = await axios.post(`/pacientes/crearPaciente`,obj);
    return res.data;

}





//FUNCIONES TOKEN


export const verificarToken = (token) =>{
    // let res = await axios.get("")
}






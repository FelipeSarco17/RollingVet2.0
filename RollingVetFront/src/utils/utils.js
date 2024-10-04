import axios from 'axios';


// const urlPacientes = import.meta.env.VITE_URL_PACIENTES;
// const urlMascotas = import.meta.env.VITE_URL_MASCOTAS;
// const urlTurnos = import.meta.env.VITE_URL_TURNOS;

const urlPacientes = "http://localhost:8080/api/pacientes"


export const ingresoUsuario = async(obj)=>{

    let res = await axios.post(`${urlPacientes}/ingresar`,obj);    
    return res.data;
}

export const leerPacientes = async()=>{
    let pacientes = await axios.get(`${urlPacientes}`);
    return pacientes.data;
}


export const registrarUsuario = async(obj)=>{

    let res = await axios.post(`${urlPacientes}/crearPaciente`,obj);
    return res.data;

}










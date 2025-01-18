import axios from './axios';
import Cookies from "js-cookie"

// const urlPacientes = import.meta.env.VITE_URL_PACIENTES;
// const urlMascotas = import.meta.env.VITE_URL_MASCOTAS;
// const urlTurnos = import.meta.env.VITE_URL_TURNOS;

const urlPacientes = "http://localhost:8080/api/pacientes"
const urlMascotas = "http://localhost:8080/api/mascotas"
const urlEspecies = "http://localhost:8080/api/especies"
//FUNCIONES PACIENTE

export const ingresoUsuario = async (obj) => {

    let res = await axios.post(`/pacientes/ingresar`, obj);
    return res;
}

export const leerPacientes = async () => {
    let pacientes = await axios.get(`/pacientes/obtenerTodos`);
    return pacientes.data;
}

export const capturarUnPaciente = async (id) => {
    let paciente = await axios.get(`/pacientes/obtenerUno/${id}`);
    return paciente.data;
}

export const modificarPaciente = async(id, obj) => {
    let paciente = await axios.put(`/pacientes/${id}`, obj);
    return paciente.data;
}

export const eliminarPaciente = async (id) => {
    let paciente = await axios.delete(`/pacientes/${id}`)
}

export const registrarUsuario = async (obj) => {

    let res = await axios.post(`/pacientes/crearPaciente`, obj);
    return res;
}

export const verificarSesionIniciada = async () => {
    let res = await axios.get(`/pacientes/verificar`);
    return res;
}



export const getClima = async () => {
  if (navigator.geolocation) {
    
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      const { latitude, longitude } = position.coords;
      const apiKey = "d1258136badc440788a220548250801";
      const url = `https://api.weatherapi.com/v1/current.json?q=${latitude},${longitude}&lang=es&key=${apiKey}`;
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (res.ok) {
        return data;
      } else {
        throw new Error("Error al obtener los datos del clima");
      }

  } else {
    throw new Error("La geolocalización no es soportada en este navegador")
  }
};


export const enviarEmailCliente = async(obj) =>{

    const res = await axios.post("/pacientes/contacto",obj);
    return res.data;



}

//FUNCIONES TOKEN


//////


//FUNCIONES MASCOTAS

export const leerMascotas = async () => {
    let mascotas = await axios.get(`/mascotas/obtenerTodas`);
    if(!mascotas.data) throw new Error("No hay mascotas guardadas.");
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
    let res = await axios.post(`/mascotas/crearMascota`,obj);
    console.log(res);
    return res;
}

export const traerMascotasUsuario = async (id) => {

      let mascotas = await axios.get(`/mascotas/obtenerMascotasUsuario/${id}`);
      console.log(mascotas.data);
      return mascotas.data;
   
  };



//FUNCIONES ESPECIES
export const leerEspecies = async () => {
    let especies = await axios.get(`/especies/obtenerTodas`);
   return especies.data;
}

export const capturarUnaEspecie = async (id) => {
    let especie = await axios.get(`/especies/obtenerUna/${id}`);
    console.log(especie);
    return especie.data;
}

export const modificarEspecie = async (id, obj) => {
    let especie = await axios.put(`/especies/${id}`, obj);
    return especie;
}

export const eliminarEspecie = async (id) => {
    let especie = await axios.delete(`/especies/${id}`)
}

export const registrarEspecie = async(obj)=>{
    let res = await axios.post(`/especies/crearEspecie`,obj);
    return res;
}


//FUNCIONES TURNO

export const registrarTurno = async(obj) =>{

    let res = await axios.post(`/turnos/crearTurno`,obj);
    return res.json();
}
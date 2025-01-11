import axios from './axios';
import Cookies from "js-cookie"

// const urlPacientes = import.meta.env.VITE_URL_PACIENTES;
// const urlMascotas = import.meta.env.VITE_URL_MASCOTAS;
// const urlTurnos = import.meta.env.VITE_URL_TURNOS;

const urlPacientes = "http://localhost:8080/api/pacientes"


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
    return paciente
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


//FUNCIONES TOKEN

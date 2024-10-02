import axios from 'axios';
var bcrypt = require('bcryptjs');
const urlUsuarios = "";


export const ingresoUsuario = async(obj)=>{

    let usuarios = await axios.get(`${urlUsuarios}`);
    let usuario = usuarios.find((usuario)=>{
        if(usuario.email == obj.email) return usuario;
    }); 

    if(bcrypt.compareSync(obj.clave,usuario.clave)){
        return true;
    }


}

export const leerPacientes = async()=>{
    let pacientes = await axios.get(`${urlUsuarios}`);
    let {data} = pacientes;
    return data;
}







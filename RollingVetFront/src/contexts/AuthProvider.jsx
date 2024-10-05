import React, { Children, useEffect, useState } from 'react'
import { useContext,createContext } from 'react'
import { ingresoUsuario,leerPacientes,registrarUsuario } from '../utils/utils';
import Cookies from "js-cookie"

const authContext = createContext();
export const useAuth = () => {
    const context = useContext(authContext)
    if (!context) {
        throw new Error("useAuth debe usarse dentro de un AuthProvider")
    }
    return context
}


const AuthProvider = ({children}) => {

    const [user,setUser] = useState(null);
    const [authenticated,setAuthenticated] = useState(false);

    // useEffect(()=>{
    //     const token = Cookies.get("access_token");

    // },[])

    const validarUsuario = async(obj) =>{
        try{
            let usuarioLogueado = await ingresoUsuario(obj);
          
            setUser(usuarioLogueado.data);
            setAuthenticated(true);
            console.log(usuarioLogueado);
              
            
        }catch(error){
            console.log(error.message);
        }
        
    }

    const registroUsuario = async(obj) =>{
        try {
            let usuarioNuevo = await registrarUsuario(obj);
            setUser(usuarioNuevo);
            setAuthenticated(true);
        } catch (error) {
            console.log(error.message);
        }
    }


    return (
    <authContext.Provider value={{validarUsuario,setUser,user,authenticated}}>
        {children}
    </authContext.Provider>
  )
}

export default AuthProvider
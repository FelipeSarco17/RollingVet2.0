import React, { Children, useState } from 'react'
import { useContext,createContext } from 'react'
import { ingresoUsuario,leerPacientes } from '../utils/utils';

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

    const validarUsuario = async(obj) =>{
        let usuarioLogueado = await ingresoUsuario(obj);
        setUser(usuarioLogueado);
    }


    return (
    <authContext.Provider value={{validarUsuario,setUser,user}}>
        {children}
    </authContext.Provider>
  )
}

export default AuthProvider
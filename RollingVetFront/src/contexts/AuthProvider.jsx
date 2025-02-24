import React, { Children, useEffect, useState } from 'react'
import { useContext, createContext } from 'react'
import { ingresoUsuario, leerPacientes, modificarPaciente, registrarUsuario, verificarSesionIniciada } from '../utils/utils';
import Cookies from "js-cookie"
import Swal from 'sweetalert2'

const authContext = createContext();
export const useAuth = () => {
    const context = useContext(authContext)
    if (!context) {
        throw new Error("useAuth debe usarse dentro de un AuthProvider")
    }
    return context
}


    //////////////////// ERROR NO SE PUDO HACER QUE LA MODIFICACIÓN DEL USUARIO SE EFECTÚE EN LA COOKIE A LA HORA DE REALIZAR UN CAMBIO.


const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        async function verificarSesion() {
            const token = Cookies.get("access_token");
            if (!token) {
                setUser(null);
                setAuthenticated(false);
            }

            const res = await verificarSesionIniciada();
            if (res.status == 200) {
                
                setUser(res.data);
                setAuthenticated(true);
            }
            else
            {
                setUser(null);
                setAuthenticated(false);
            }
        }

        verificarSesion();

    }, [])


    const validarUsuario = async (obj) => {
        try {
            let usuarioLogueado = await ingresoUsuario(obj);
            setUser(usuarioLogueado.data);
            setAuthenticated(true);
            Swal.fire({
                title: "Sesión Iniciada Exitosamente",
                icon: "success"
              });
            navigate("/");
        } catch (error) {
            console.log(error)
            Swal.fire({
                title: "Hubo un error al iniciar sesion",
                text: error.response.data.mensaje,
                icon: "error",
                background: '#393939',
                color: '#fafafa',
              })
        }

    }

    const registroUsuario = async (obj) => {
        try {
            let res = await registrarUsuario(obj);
            return res.data;
        } catch (error) {
            console.log(error.message);
        }
    }

    const modificarUsuario = async (obj) => {
        try {
            console.log("Modificando usuario:", obj);
            await modificarPaciente(obj.id, obj);

            const res = await verificarSesionIniciada();
    
            if (res.status === 200) {
                setUser(res.data);
            } else {
                console.error("Error al obtener los datos actualizados del usuario.");
            }
        } catch (error) {
            console.error("Error al modificar el usuario:", error.message);
        }
    };

    const cerrarSesion = () =>{
        Swal.fire({
            title: "¿Seguro que quieres cerrar sesion?",
            icon: "warning",
            showCancelButton: true,
            cancelButtonColor: "#a40000",
            confirmButtonText: "Cerrar sesion",
            confirmButtonColor: "#197600",
            cancelButtonText: "Cancelar",
            reverseButtons: true,
            background: '#fafafa',
            color: '#393939'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Su sesion ha sido cerrada",
                    icon: "success",
                    background: '#fafafa',
                    color: '#393939'

                });
                Cookies.remove("token");
                setAuthenticated(false)
                setUser(null)
            }
        });
    }

    const editarUsuario = async(id,obj) =>{
        try{
            const usuarioModificado = await modificarPaciente(id,obj);
            setUser(usuarioModificado) 
        }catch(error){
            console.log(error.message);
            
        }
    }


    return (
        <authContext.Provider value={{ cerrarSesion,registroUsuario,editarUsuario,validarUsuario, setUser, user, authenticated}}>
            {children}
        </authContext.Provider>
    )
}

export default AuthProvider
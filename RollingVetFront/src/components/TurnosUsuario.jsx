import React, { useEffect, useState } from 'react'
import { traerTurnosUsuario,eliminarTurnoUsuario } from '../utils/utils';
import { useAuth } from '../contexts/AuthProvider';
import Swal from 'sweetalert2';


const TurnosUsuario = () => {
    
    const [turnosUsuario,setTurnosUsuario] = useState([]);
    const [error,setError] = useState()
    const {user} = useAuth();
    useEffect(()=>{
       async function obtenerTurnosUsuario(id) {
             try {
               const turnos = await traerTurnosUsuario(id);
               setTurnosUsuario(turnos);
             } catch (error) {
               setError(error.response.data.message);
             }
           }
           obtenerTurnosUsuario(user.id);
    },[])
    console.log(turnosUsuario);
    
    const cargarTurnosUsuario = async(id) =>{
        try {
            const turnos = await traerTurnosUsuario(id);
            setTurnosUsuario(turnos);
        } catch (error) {
            setError(error.response.data.message)
        }
    }

    const eliminarTurno = async(idTurno) =>{
      try {
        const res = await eliminarTurnoUsuario(idTurno);
        Swal.fire({
          title:res,
          icon:"success",
          background: '#393939',
            color: '#fafafa',
        })
        await cargarTurnosUsuario(user.id)
        
      } catch (error) {
        Swal.fire({
          title:error.res,
          icon:"error",
          background: '#393939',
            color: '#fafafa',
        })
      }

    }

    return (
        <div className="w-full">
                <h2 className="text-lg font-medium my-5">Mis Turnos</h2>
                {error ?
                  <div className="mt-4 text-center">
                    <p className="text-gray-600">{error}</p>
                  </div> :
                  <div className="mt-4">
                    <ul className="space-y-2">
                      {turnosUsuario.map((t, index) => (
                        <li
                          key={`turno${index}`}
                          className="flex justify-between items-center p-2 bg-gray-100 rounded-md"
                        >
                          <span>{t.fecha} / {t.servicio}</span>
                          <button
                            onClick={() => eliminarTurno(t._id)}
                            className="bg-red-500 hover:bg-red-600 text-white text-sm px-2 py-1 rounded-md"
                          >
                            Eliminar
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                }
              </div>
    )
}

export default TurnosUsuario
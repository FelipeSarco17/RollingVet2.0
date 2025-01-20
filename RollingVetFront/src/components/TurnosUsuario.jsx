import React, { useEffect, useState } from 'react'
import { traerTurnosUsuario, eliminarTurnoUsuario } from '../utils/utils';
import { useAuth } from '../contexts/AuthProvider';
import Swal from 'sweetalert2';


const TurnosUsuario = () => {

  const [turnosUsuario, setTurnosUsuario] = useState([]);
  const [error, setError] = useState()
  const { user } = useAuth();
  useEffect(() => {
    async function obtenerTurnosUsuario(id) {
      try {
        const turnos = await traerTurnosUsuario(id);
        setTurnosUsuario(turnos);
      } catch (error) {
        setError(error.response.data.message);
      }
    }
    obtenerTurnosUsuario(user.id);
  }, [])
  console.log(turnosUsuario);

  const cargarTurnosUsuario = async (id) => {
    try {
      const turnos = await traerTurnosUsuario(id);
      setTurnosUsuario(turnos);
      console.log(turnos);

    } catch (error) {
      setError(error.response.data.message)
    }
  }

  const handleEliminarTurno = async (idTurno) => {
    const result = await Swal.fire({
      title: "¿Deseas eliminar esta mascota?",
      text: "Esta acción es permanente",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#008000",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    });
  
    if (result.isConfirmed) {
      try {
        const res = await eliminarTurnoUsuario(idTurno);
        await Swal.fire({
          title: res,
          icon: "success",
          background: '#393939',
          color: '#fafafa',
        });
        await cargarTurnosUsuario(user.id);
      } catch (error) {
        await Swal.fire({
          title: error.res || "Ocurrió un error",
          icon: "error",
          background: '#393939',
          color: '#fafafa',
        });
      }
    }
  };

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
              <span>{t.fecha} / {t.hora}</span>
              <button
                onClick={() => handleEliminarTurno(t._id)}
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
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthProvider'

const Administrador = () => {

  const { user } = useAuth();
  const [hora, setHora] = useState(new Date().toLocaleTimeString());
  const navigate = useNavigate()

  useEffect(() => {
    const intervalo = setInterval(() => {

      setHora(new Date().toLocaleTimeString([], {hour12:false}));
    }, 1000);

    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(intervalo);
  }, []);

  return (
    <main className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-center sm:text-left mb-4 sm:mb-0">
          Portal del Administrador
        </h1>
      </div>
        <div className=" gap-4">
        <h2 className="text-xl sm:text-2xl font-bold text-center sm:text-left mb-4 sm:mb-0">
          Bienvenido, {user.nombre} {user.apellido}
        </h2>
        <h2 className="text-xl sm:text-2xl font-bold text-center sm:text-left mb-4 sm:mb-0">
          Hora Local: {hora}
        </h2>
        <li className='list-none my-4'>
        <button
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
            onClick={() => navigate("/admin/gestionPacientes")}
          >
            Gestionar Pacientes
          </button>
        </li>
        
        <li className='list-none my-4'>
        <button
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
            onClick={() => navigate("/admin/gestionMascotas")}
          >
            Gestionar Mascotas
          </button>
        </li>


          <li className='list-none my-4'>
          <button
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
            onClick={() => navigate("/admin/gestionTurnos")}
          >
            Gestionar Turnos
          </button>
          </li>


          <li className='list-none my-4'>
          <button
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
            onClick={() => navigate("/admin/gestionEspecies")}
          >
            Gestionar Especies
          </button>
          </li>

        </div>
    </main>
  )
}

export default Administrador
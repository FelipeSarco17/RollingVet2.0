import React from 'react'
import FormRegistrarTurno from '../components/Forms/FormRegistrarTurno'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

const RegistrarTurno = () => {

    const navigate = useNavigate()

  const handleRegresar = () => {
    Swal.fire({
      title: "¿Deseas regresar?",
      text: "Advertencia: No se guardarán los cambios.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#008000",
      cancelButtonColor: "#d33",
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/user/userpage");
      }
    });
  }

    return (
        <main className='bg-gray-100 flex justify-center items-center min-h-screen'>
            <article className="flex flex-col gap-12 my-12 w-full max-w-lg bg-white shadow-md rounded-lg p-6">
                <h3 className='text-center font-bold text-3xl'>Reservá tu turno</h3>
                {/* Botón de regresar */}
                <button
                    onClick={() => handleRegresar()}
                    className="flex items-center gap-2 mb-6 py-2 px-4 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="22.703" height="21.928">
                        <path transform="scale(-0.8, 0.8) translate(-22.703, 3)" d="M1.056 21.928c0-6.531 5.661-9.034 10.018-9.375V18.1L22.7 9.044 11.073 0v4.836a10.5 10.5 0 0 0-7.344 3.352C-.618 12.946-.008 21 .076 21.928z" />
                    </svg>
                    Regresar
                </button>
                <FormRegistrarTurno />
            </article>


        </main>
    )
}

export default RegistrarTurno
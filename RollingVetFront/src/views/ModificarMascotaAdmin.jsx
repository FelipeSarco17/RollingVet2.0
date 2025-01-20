import { useNavigate, useParams } from "react-router-dom";
import FormModificarMascota from "../components/FormModificarMascota";
import Swal from "sweetalert2";

const ModificarMascotaAdmin = () => {
  const navigate = useNavigate();
  const { id } = useParams();

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
        navigate(-1);
      }
    });
  }
  
  return (
    <main className="flex justify-center items-center py-8">
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg">
        <h1 className="mb-5 text-4xl font-bold text-black">Modificar Mascota</h1>
        <button
          onClick={() => handleRegresar()}
          className="flex items-center gap-2 mb-6 py-2 px-4 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="22.703" height="21.928">
            <path
              transform="scale(-0.8, 0.8) translate(-22.703, 3)"
              d="M1.056 21.928c0-6.531 5.661-9.034 10.018-9.375V18.1L22.7 9.044 11.073 0v4.836a10.5 10.5 0 0 0-7.344 3.352C-.618 12.946-.008 21 .076 21.928z"
            />
          </svg>
          Regresar
        </button>

        <FormModificarMascota
          id={id}
          redirigir={() => navigate(-1)}
        />
      </div>
    </main>
  );
};

export default ModificarMascotaAdmin;
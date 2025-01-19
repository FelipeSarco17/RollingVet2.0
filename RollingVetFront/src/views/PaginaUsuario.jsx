import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { traerMascotasUsuario, eliminarMascota, modificarPaciente } from "../utils/utils";
import { useAuth } from "../contexts/AuthProvider";
import TurnosUsuario from "../components/TurnosUsuario";
import Swal from "sweetalert2";

// HAY QUE ARREGLAR: EL USUARIO NO SE ACTUALIZA CORRECTAMENTE AL ENVIAR EL FORMULARIO PARA REGRISTRAR UNA MASCOTA O AL ELIMINAR UNA MASCOTA

const PaginaUsuario = () => {
  const [mascotasUsuario, setMascotasUsuario] = useState([]);
  const { user, modificarUsuario } = useAuth();
  const [error, setError] = useState()
  const [turnosUsuario, setTurnosUsuario] = useState();

  async function obtenerMascotasUsuario(id) {
    try {
      const mascotasUs = await traerMascotasUsuario(id);
      setMascotasUsuario(mascotasUs.mascotas);
    } catch (error) {
      setError(error.response.data.message);
    }
  }

  useEffect(() => {
    obtenerMascotasUsuario(user.id);
  }, []);

  const handleEliminarMascota = async (id) => {
    Swal.fire({
                      title: "¿Deseas eliminar esta mascota?",
                      text: "Esta acción es permanente",
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonColor: "#008000",
                      cancelButtonColor: "#d33",
                      confirmButtonText: "Eliminar",
                      cancelButtonText: "Cancelar"
                    }).then((result) => {
                      if (result.isConfirmed) {
                        eliminarMascota(id).then(() => {
                          obtenerMascotasUsuario(user.id)
                          Swal.fire({
                                        title: "¡Mascota Eliminada Exitosamente!",
                                        icon: "success"
                                      });
                        });
                      }
                    });
  }


  if (!user) {
    return (
      <main className="bg-gray-100 w-full min-h-screen flex justify-center items-center">
        <p className="text-lg text-gray-700">Cargando datos de usuario...</p>
      </main>
    );
  }

  return (
    <main className="bg-gray-100 w-full min-h-screen py-8">
      <div className="mx-auto max-w-screen-xl p-4 bg-white rounded-lg shadow-lg">
        <div className="text-left">
          <h1 className="text-4xl font-semibold">Mi Cuenta</h1>
          <p className="text-xl text-gray-700">{`${user.nombre} ${user.apellido}`}</p>
        </div>

        <div className="mt-6">
          <ul className="space-y-4">
            {/* Email */}
            <li className="flex justify-between items-center p-4 border-b border-gray-200">
              <p className="text-lg font-medium">EMAIL</p>
              <p className="text-lg text-gray-600">{`${user.email}`}</p>
            </li>

            {/* Teléfono */}
            <li className="flex justify-between items-center p-4 border-b border-gray-200">
              <p className="text-lg font-medium">NÚMERO DE TELÉFONO</p>
              <p className="text-lg text-gray-600">{`${user.telefono}`}</p>
            </li>

            {/* Dropdown - Mis mascotas */}
            <li className="p-4 border-b border-gray-200">
              <div className="w-full">
                <h2 className="text-lg font-medium">Mis Mascotas</h2>

                {error ? <div className="mt-4 text-center">
                  <p className="text-gray-600">{error}</p>
                </div> :
                  <div className="mt-4">
                    <ul className="space-y-2">
                      {mascotasUsuario.map((m) => (
                        <li
                          key={`mascota${m.uid}`}
                          className="flex justify-between items-center p-2 bg-gray-100 rounded-md"
                        >
                          <span>{m.nombre}</span>
                          <button
                            onClick={() => handleEliminarMascota(m.uid)}
                            className="bg-red-500 hover:bg-red-600 text-white text-sm px-2 py-1 rounded-md"
                          >
                            Eliminar
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                }

                <Link
                  to={`/user/registrarMascota/${user.id}`}
                  className="inline-block mt-4 py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
                >
                  Agregar Mascota
                </Link>
              </div>
            </li>
            <li className="p-4 border-b border-gray-200">
              {/* <div className="w-full">
                <h2 className="text-lg font-medium my-5">Mis Turnos</h2>
                {!turnosUsuario || turnosUsuario.length == 0 ?
                  <div className="mt-4 text-center">
                    <p className="text-gray-600">No hay turnos reservados.</p>
                  </div> :
                  <div className="mt-4">
                    <ul className="space-y-2">
                      {turnosUsuario.map((t, index) => (
                        <li
                          key={`turno${index}`}
                          className="flex justify-between items-center p-2 bg-gray-100 rounded-md"
                        >
                          <span>{t.fecha}</span>
                          <button
                            onClick={() => handleEliminarTurno(t.uid)}
                            className="bg-red-500 hover:bg-red-600 text-white text-sm px-2 py-1 rounded-md"
                          >
                            Eliminar
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                }
              </div> */}
              <TurnosUsuario/>
              <Link
                  to={`/registrarTurno/${user.id}`}
                  className="inline-block mt-4 py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
                >
                  Agendar Turno
                </Link>
              
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
};

export default PaginaUsuario;
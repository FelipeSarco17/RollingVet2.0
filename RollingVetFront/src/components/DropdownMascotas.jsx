import React, { useState, useRef, useEffect } from 'react';
import { capturarUnPaciente, traerMascotasUsuario } from '../utils/utils';

const DropdownMascotas = ({ id, label }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState([])

  const dropdownRef = useRef(null);
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const obtenerMascotas = async (id) => {
    try {
      const data = await capturarUnPaciente(id);
      console.log(data.paciente);
      
      const mascotas = await traerMascotasUsuario(data.paciente.mascotasIDs);
      console.log(mascotas);
      
      setOptions(mascotas);
    } catch (error) {
      console.error("Error al obtener las mascotas del paciente:", error.message);
    }
  }

  useEffect(() => {
    if (id) {

      obtenerMascotas(id);

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };

    }

  }, [id]);

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      <button
        type="button"
        onClick={toggleDropdown}
        className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {label}
        <svg
          className="-mr-1 ml-2 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4 4a.75.75 0 01-1.06 0l-4-4a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          <div className="py-1">
            {options.length > 0 ? (
              options.map((option, index) => (
                <a
                  key={index}
                  href={`/admin/modificarMascota/${option.uid}` || '#'}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                >
                  {option.nombre}
                </a>
              ))
            ) : (
              <p className="block px-4 py-2 text-sm text-gray-500">No hay opciones disponibles.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMascotas;
import React, { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const DropdownPerfil = ({ user, userIcon, desloguear }) => {
    const [menuDrop, setMenuDrop] = useState(false);
    const dropdownRef = useRef(null);

    const handleMenuDrop = () => {
        setMenuDrop(prevState => !prevState);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setMenuDrop(false); // Cierra el dropdown si se hace clic fuera
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative text-black w-16 h-16">
            {/* Botón del usuario */}
            <button
                onClick={handleMenuDrop}
                id="imgUser"
                className={`rounded-full lg:transform lg:transition ${menuDrop ? 'lg:scale-150' : ''
                    } absolute right-0 lg:right-0 w-10 z-20 mx-3 mt-2 lg:me-6`}
            >
                <img className="rounded-full w-10 lg:me-4" src={userIcon} alt="logoUser" />
            </button>

            {menuDrop && (
                <div
                    ref={dropdownRef}
                    className="absolute right-full translate-x-[-10px] flex flex-col bg-white shadow-lg rounded-lg border border-gray-300 z-20 min-w-[12rem]"
                >
                    {/* Contenedor de datos del usuario */}
                    <div className="p-5 text-black">
                        <p>{user.nombre} {user.apellido}</p>
                    </div>

                    {/* Contenedor de acciones del usuario */}
                    <ul className="flex flex-col border-t border-gray-300 w-full">
                        <li className="text-center p-0.5 cursor-pointer bg-green-500 hover:bg-green-600 transition duration-300">
                            <NavLink
                                to="/perfil"
                                className="block w-full text-white p-2"
                            >
                                Ver Perfil
                            </NavLink>
                        </li>

                        <li className="text-center p-0.5 cursor-pointer bg-red-500 hover:bg-red-600 transition duration-300">
                            <button
                                onClick={desloguear}
                                className="block w-full text-white p-2"
                            >
                                Cerrar Sesión
                            </button>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default DropdownPerfil;
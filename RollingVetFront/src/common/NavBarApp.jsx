import React, { useState } from 'react'
import { Navbar, Nav } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import collapseIcon from "../assets/collapseIcon.svg"
import calendarEditIcon from "../assets/calendarEditIcon.svg"
import userEditIcon from "../assets/userEditIcon.svg"
import userIcon from "../assets/userIcon.svg"
import { useAuth } from '../contexts/AuthProvider';
import dev1 from "../assets/Dev1.jpg"

const NavBarApp = () => {

    const { authenticated, user, cerrarSesion } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false)
    const [menuDrop, setMenuDrop] = useState(false)


    const handleMenuDrop = () => {
        setMenuDrop(!menuDrop);
    }

    const desloguear = () => {
        cerrarSesion();
        setMenuDrop(false);
    }

    const openMenu = () => {
        setMenuOpen(!menuOpen);

    }




    return (
        <Navbar className='p-3 grid  grid-rows-1 grid-cols-2 bg-cyan-500 h-30 w-screen sm:gap-x-56 lg:grid-cols-5 lg:gap-0  '>


            <Nav className='w-32 col-span-1'>

                <Link className='w-full' to="/">
                    <img className='w-20 m-4 md:w-full' src="https://www.zarla.com/images/zarla-carevet-1x1-2400x2400-20220323-t7b98tfcjcvqdcqwkpq3.png?crop=1:1,smart&width=250&dpr=2" alt="logo" />
                </Link>

            </Nav>
            <button className='ms-28 w-fit lg:hidden' onClick={openMenu}>
                <img className='w-7' src={collapseIcon} alt="collapseIcon" />
            </button>

            <Nav className={`${menuOpen ? "col-span-2 flex flex-col items-center" : "hidden"} text-white font-semibold lg:flex lg:flex-row lg:items-center lg:col-span-4 lg:justify-between`} >
                <div className='flex flex-col items-center lg:flex-row'>
                    <NavLink className="mx-4 text-lg mt-2" to="/">
                        Inicio
                    </NavLink>

                    <NavLink className="mx-4 text-lg mt-2" to="/nosotros">
                        Nosotros
                    </NavLink>

                    <NavLink className="mx-4 text-lg mt-2" to="/planes">
                        Planes
                    </NavLink>

                    <NavLink className="mx-4 text-lg mt-2" to="/contacto">
                        Contáctanos
                    </NavLink>

                    {authenticated ? (
                        <>
                            {user.admin &&
                                (<>
                                    <NavLink className="mx-4 mt-2" to="/admin/gestionPacientes">
                                        <img className='w-10' src={userEditIcon} alt="adminPacientesIcon" />
                                    </NavLink>

                                    <NavLink className="mx-4 mt-2" to="/admin/gestionTurnos">
                                        <img className='w-10' src={calendarEditIcon} alt="adminTurnosIcon" />
                                    </NavLink>
                                </>)
                            }
                        </>) : (<>

                        </>)
                    }



                    {
                    // ESTO ES SOLO PARA TESTEAR
                    }
                                                        <NavLink className="mx-4 mt-2" to="/admin/gestionPacientes">
                                        <img className='w-10' src={userEditIcon} alt="adminPacientesIcon" />
                                    </NavLink>

                                    <NavLink className="mx-4 mt-2" to="/admin/gestionTurnos">
                                        <img className='w-10' src={calendarEditIcon} alt="adminTurnosIcon" />
                                    </NavLink>



                </div>

                {authenticated ? (
                    <div className='relative text-black w-16 h-16'>
                        <button onClick={handleMenuDrop} id="imgUser" className={`rounded-full lg:transform lg:transition ${menuDrop ? "lg:scale-150" : ""} absolute  right-0  lg:top-1/4 lg:right-0 w-10 z-20 mx-3 mt-2 lg:me-6 `}><img className='rounded-full w-10 lg:me-4' src={userIcon} alt="logoUser" /> </button>
                        {menuDrop &&
                            <>
                                <div className='hidden lg:flex lg:flex-col lg:absolute lg:right-32 lg:top-1/4 lg:z-30'>
                                    <p className=' text-black'>{user.email}</p>
                                    <p className='text-black'>{user.nombre}</p>
                                </div>
                                <ul className='rounded-lg border-2  flex flex-col justify-end absolute z-10 w-72 -left-28  lg:-left-56 lg:items-end lg:flex-row lg:top-0 lg:right-0 dropdownPerfil'>
                                    <li className='text-center p-2 border-y-2 lg:border-y-0 lg:border-t-2 lg:border-r-2  lg:rounded-bl-lg  w-full'><NavLink to="">Ver Perfil</NavLink></li>
                                    <li className='text-center p-2  rounded-b-lg  lg:border-t-2 lg:rounded-bl-none lg:rounded-br-lg  w-full'><button onClick={desloguear}>Cerrar Sesión</button></li>
                                </ul>
                            </>
                        }

                    </div>)
                    : (<><NavLink className='p-1.5 text-black font-semibold bg-rose-500 rounded-md p-1 mt-2 lg:m-0 lg:me-4 ' to="/ingresar">
                        Iniciar Sesion
                    </NavLink>
                    </>)}



            </Nav>

        </Navbar>

    )
}

export default NavBarApp
import React, { useState } from 'react'
import { Navbar, Nav } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import collapseIcon from "../assets/collapseIcon.svg"
import calendarEditIcon from "../assets/calendarEditIcon.svg"
import userEditIcon from "../assets/userEditIcon.svg"
import Container from 'react-bootstrap/Container';
import NavDropdown from 'react-bootstrap/NavDropdown';

const NavBarApp = () => {

    const [menuOpen, useMenuOpen] = useState(false)
    const openMenu = () => {
        useMenuOpen(!menuOpen);
    }

    return (
        <Navbar className='p-3 grid  grid-rows-1 grid-cols-2 bg-cyan-500 h-30 w-screen sm:gap-x-56 lg:grid-cols-5 lg:gap-0  '>


            <Nav className='w-32 col-span-1'>

                <NavLink className='w-full' to="/">
                    <img className='w-20 m-4 md:w-full' src="https://www.zarla.com/images/zarla-carevet-1x1-2400x2400-20220323-t7b98tfcjcvqdcqwkpq3.png?crop=1:1,smart&width=250&dpr=2" alt="logo" />
                </NavLink>

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

                    <NavLink className="mx-4 text-lg mt-2" to="/admin/gestionPacientes">
                        <img src={userEditIcon} alt="adminPacientesIcon" />
                    </NavLink>

                    <NavLink className="mx-4 text-lg mt-2" to="/admin/gestionTurnos">
                        <img src={calendarEditIcon} alt="adminTurnosIcon" />
                    </NavLink>
                </div>


                <NavLink className='p-1.5 text-black font-semibold bg-rose-500 rounded-md p-1 mt-2 lg:m-0 lg:me-4 ' to="/ingresar">
                    Iniciar Sesion
                </NavLink>
            </Nav>

        </Navbar>

    )
}

export default NavBarApp
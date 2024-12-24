import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import {useAuth} from '../contexts/AuthProvider'
import { useNavigate } from 'react-router-dom';


const Inicio = () => {

  const {validarUsuario,user} = useAuth();
 

  return (
    <div>
      Inicio
    </div>

  )
}

export default Inicio
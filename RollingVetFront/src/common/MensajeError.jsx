import React from 'react'
import errorIcon from '../assets/errorIcon.svg'
const MensajeError = ({mensaje}) => {
  return (
    <div className='errorIcon'><img className='w-6 ms-1 ' src={errorIcon} alt="errorIcon" /><div id="triangulo"></div><p className='font-semibold hidden error'>{mensaje}</p></div>
  )
}

export default MensajeError
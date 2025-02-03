import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthProvider'
import { useNavigate } from 'react-router-dom';
import PlanCard from '../components/PlanCard';
import ReviewCard from '../components/ReviewCard';
import "../styles/inicio.css"
import ServiceCard from '../components/ServiceCard';
import ReviewSlider from '../components/ReviewSlider';
import { planes, reviews, services,professionals } from '../utils/dataArrays';
import Galery from '../components/Galery';
import ProfessionalCard from '../components/ProfessionalCard';
import Weather from '../components/Weather';
const Inicio = () => {

  const { validarUsuario, user } = useAuth();

  
  return (
    <main>
      
      <article className='my-5 p-5'>
        <Weather/>
      </article>
      <h3 className='font-bold text-2xl text-center'>En todos nuestros locales encontraras los siguientes servicios</h3>
      <article className='flex flex-col items-center justify-center gap-5 my-7 overflow-x-auto'>
        
        <div className='flex gap-5'>
          {services.map((servicio, index) => {
            return <ServiceCard servicio={servicio} key={index} />
          })}
        </div>
      </article>

      <article className='text-center flex flex-col my-12 gap-7 '>
      <h3 className='font-bold text-3xl'>Conoce a nuestros profesionales</h3>
        <div className='flex flex-col lg:flex-row items-center justify-center gap-24'>
          {professionals.map((professional,index)=>{
            return <ProfessionalCard key={index} professional={professional}/>
          })}
          
        </div> 
      </article>

      <article className='flex flex-col gap-3 p-2 pb-16 bg-gradient-to-br from-cyan-500 to-blue-600 justify-center items-center'>
        <h2 className=' text-xl text-center p-4 md:text-2xl font-semibold'>Dale un vistazo a nuestros planes</h2>
        {planes.map((plan, index) => {
          return <PlanCard key={`plan${index}`} plan={plan} />
        })}
      </article>

      <article className='flex w-[300px] my-8 md:w-full flex-col items-center justify-center'>
        <p className='mb-6 text-3xl px-2 font-bold text-center' >¿Dudas de nuestros servicios? <br/> Mira la opinion de nuestros clientes</p>
        <ReviewSlider reviews={reviews} />
      </article>

      <article className='w-full flex flex-col items-center my-8 bg-gradient-to-br p-8 from-cyan-500 to-blue-600'>
          <h3 className='font-bold text-3xl p-8 my-4 text-center'>Algunos de los productos que puedes encontrar en nuestros locales</h3>
          <div>
            <Galery/>
          </div>
      </article>

      <article className='w-full flex flex-col items-center my-8 p-8'>
      <h3 className='font-bold text-3xl text-center p-8 my-4'>¡Trabajamos en conjunto con las siguientes marcas para ofrecerte el mejor servicio!</h3>
      <div className='flex flex-col xl:flex-row gap-12 items-center justify-items-center '>
          <img className='w-64' src="https://www.trixie.de/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FTRIXIE_LOGO_RGB_Rot_NEW2024.5a8a215d.png&w=3840&q=75" alt="trixieLogo" />
          <img className='w-64' src="https://m.media-amazon.com/images/S/stores-image-uploads-na-prod/0/AmazonStores/A1AM78C64UM0Y8/dd72b456777df8c1b6a741e3f321fa28.w900.h500.png" alt="" />
          <img className='w-64' src="https://www.purina.com.ar/themes/custom/purina/purina/assets/images/logo/logo.png" alt="" />
          
      </div>
      </article>


    </main>

  )
}

export default Inicio
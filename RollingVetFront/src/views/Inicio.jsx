import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthProvider'
import { useNavigate } from 'react-router-dom';
import PlanCard from '../components/PlanCard';
import ReviewCard from '../components/ReviewCard';
import "../styles/inicio.css"
import ServiceCard from '../components/ServiceCard';
import ReviewSlider from '../components/ReviewSlider';
import { planes, reviews, services } from '../utils/dataArrays';
import Galery from '../components/Galery';

const Inicio = () => {

  const { validarUsuario, user } = useAuth();




  return (
    <main>
      
      <article className='backgroundImage bg-center'>
        <div>

        </div>
      </article>

      <article className='h-[600px] flex flex-col items-center justify-center gap-5 overflow-x-auto'>
        <h3 className='font-bold text-3xl'>En todos nuestros locales encontraras los siguientes servicios</h3>
        <div className='flex gap-5'>
          {services.map((servicio, index) => {
            return <ServiceCard servicio={servicio} key={index} />
          })}
        </div>


      </article>

      <article className='flex flex-col gap-3 p-2 pb-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-b-[60px] rounded-t-[60px]'>
        <h2 className=' text-xl text-center p-4 md:text-2xl font-semibold text-center'>Dale un vistazo a nuestros planes</h2>
        {planes.map((plan, index) => {
          return <PlanCard key={`plan${index}`} plan={plan} />
        })}
      </article>

      <article className='flex w-[300px] my-8 md:w-full flex-col items-center justify-center'>
        <p className='mb-6 text-3xl px-2 font-bold' >¿Dudas de nuestros servicios? Mira la opinion de nuestros clientes</p>
        <ReviewSlider reviews={reviews} />
      </article>

      <article className='w-full flex flex-col items-center my-8 bg-gradient-to-br p-8 from-cyan-500 to-blue-600 p-2'>
          <h3 className='font-bold text-3xl p-8 my-4'>Algunos de los productos que puedes encontrar en nuestros locales</h3>
          <div>
            <Galery/>
          </div>
      </article>

      <article>marcas</article>


    </main>

  )
}

export default Inicio
import React from 'react'
import AvatarCard from '../components/AvatarCard'
import "../styles/nosotros.css"
import brainIcon from "../assets/brainIcon.svg"
import dev1 from "../assets/Dev1.jpg"

const Nosotros = () => {
  
  const devs=[
    {
      img:dev1,
      nombre:"Felipe Sarco",
      edad: 21

    },
    {
      img:"",
      nombre:"Alberto Mainardi",
      edad: 0,

    }
  ]
  
  return (
    <main className='flex flex-col justify-center'>
      <div className='relative'>
        <img className='headerImage' src="https://itssolutions.co/wp-content/uploads/2022/09/Perfil-de-personalidad-de-los-Desarrolladores-de-software-opt.jpg" alt="" />
        <h1 className='absolute inset-0 text-center text-4xl mt-12'>Conocenos</h1>
      </div>

      <article className='flex flex-col gap-5 my-32 items-center'>
        <img className='w-32' src={brainIcon} alt="brainIcon" />

        <h2 className='text-3xl'>¿Cual es nuestro lema?</h2>
        <p className='p-6 text-center text-lg'>«La mayor parte de las grandes cosas que ha conseguido el hombre, fueron declaradas imposibles antes de que alguien las hiciera» <br />—Louis D. Brandeis <br />Nunca dejes de buscar una solucion.</p>

      </article>

      <article className='w-full bg-gradient-to-r from-sky-500 to-indigo-500 grid grid-rows-1 grid-cols-2 py-5'>
        <p className='text-2xl col-span-2 place-self-center font-semibold'>Nuestros integrantes</p>
        {
          devs.map(dev=>{
            return <AvatarCard dev={dev}/>
          })
        }
      </article>

      <article className='my-12 grid grid-rows-1 grid-cols-5 items-center place-items-center gap-x-2 gap-y-6 px-2'>
        <h2 className='col-span-5 text-2xl font-semibold text-center'>Nuestras tecnologias</h2>
        <p className='col-span-5 md:text-lg text-center'>Cada dia intentamos aprender cosas nuevas y expandir nuestros conocimientos, <br /> pero en estos momentos esto es lo que podemos proveerte.</p>
        <img className='transition-all duration-300 lg:w-32 lg:hover:w-52' src="https://cdn.iconscout.com/icon/free/png-256/free-react-logo-icon-download-in-svg-png-gif-file-formats--wordmark-programming-langugae-freebies-pack-logos-icons-1175110.png?f=webp&w=256" alt="reactLogo" />
        <img className='transition-all duration-300 lg:w-32 lg:hover:w-52' src="https://static-00.iconduck.com/assets.00/node-js-icon-454x512-nztofx17.png" alt="nodeJsLogo" />
        <img className='transition-all duration-300 lg:w-32 lg:hover:w-52' src="https://cdn.icon-icons.com/icons2/2415/PNG/512/mongodb_plain_wordmark_logo_icon_146423.png" alt="mongoDbLogo" />
        <img className='transition-all duration-300 lg:w-32 lg:hover:w-52' src="https://user-images.githubusercontent.com/98990/89711240-4172a200-d989-11ea-8d51-4aaf922fa407.png" alt="tailwindLogo" />
        <img className='transition-all duration-300 lg:w-32 lg:hover:w-52' src="https://cdn.worldvectorlogo.com/logos/jwt-3.svg" alt="jwtLogo" />
      </article>

    </main>
  )
}

export default Nosotros
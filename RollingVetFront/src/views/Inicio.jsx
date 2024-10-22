import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthProvider'
import { useNavigate } from 'react-router-dom';
import PlanCard from '../components/PlanCard';
import ReviewCard from '../components/ReviewCard';
import "../styles/inicio.css"

import petFoodIcon from "../assets/petFoodIcon.svg"
import showerIcon from "../assets/showerIcon.svg"
import pharmacyIcon from "../assets/pharmacyIcon.svg"
import labIcon from "../assets/labIcon.svg"
import ServiceCard from '../components/ServiceCard';
import ReviewSlider from '../components/ReviewSlider';


const Inicio = () => {

  const { validarUsuario, user } = useAuth();
  const planes = [
    {
      nombre: "Plan Primeros Pasos",
      duracion: "Mes",
      precio: 10000,
      subtitulo: "Servicios para mascotas de mas de 0 a 5 años",
      caracteristicas: [
        {
          descripcion: "Atencion 24hs",
          contiene: true
        },
        {
          descripcion: "Descuento en la tienda",
          contiene: false
        }
      ]

    },
    {
      nombre: "Plan Madurando",
      subtitulo: "Servicios para mascotas de 5 a 10 años",
      duracion: "3 meses",
      precio: 10000,
      caracteristicas: [
        {
          descripcion: "Atencion 24hs",
          contiene: true
        },
        {
          descripcion: "Descuento en la tienda",
          contiene: false
        }
      ]

    },
    {
      nombre: "Plan Adultos",
      subtitulo: "Servicios para mascotas de mas de 10 años",
      duracion: "3 meses",
      precio: 10000,
      caracteristicas: [
        {
          descripcion: "Atencion 24hs",
          contiene: true
        },
        {
          descripcion: "Descuento en la tienda",
          contiene: false
        }
      ]
    }
  ]

  const reviews = [
    {
      nombre: "Bonnie Green",
      img: "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/karen-nelson.png",
      descripcion: "Calidad, variedad y buen precio. Excelente atención y servicio.",
      estrellas: 4
    },
    {
      nombre: "Bonnie Green",
      img: "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/karen-nelson.png",
      descripcion: "Calidad, variedad y buen precio. Excelente atención y servicio.",
      estrellas: 4
    },
    {
      nombre: "Bonnie Green",
      img: "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/karen-nelson.png",
      descripcion: "Calidad, variedad y buen precio. Excelente atención y servicio.",
      estrellas: 4
    },
    {
      nombre: "Bonnie Green",
      img: "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/karen-nelson.png",
      descripcion: "Calidad, variedad y buen precio. Excelente atención y servicio.",
      estrellas: 4
    },
    {
      nombre: "Bonnie Green",
      img: "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/karen-nelson.png",
      descripcion: "Calidad, variedad y buen precio. Excelente atención y servicio.",
      estrellas: 4
    },
    {
      nombre: "Bonnie Green",
      img: "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/karen-nelson.png",
      descripcion: "Calidad, variedad y buen precio. Excelente atención y servicio.",
      estrellas: 4
    },
    {
      nombre: "Bonnie Green",
      img: "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/karen-nelson.png",
      descripcion: "Calidad, variedad y buen precio. Excelente atención y servicio.",
      estrellas: 4
    },
    {
      nombre: "Bonnie Green",
      img: "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/karen-nelson.png",
      descripcion: "Calidad, variedad y buen precio. Excelente atención y servicio.",
      estrellas: 4
    },
    {
      nombre: "Bonnie Green",
      img: "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/karen-nelson.png",
      descripcion: "Calidad, variedad y buen precio. Excelente atención y servicio.",
      estrellas: 4
    }
  ]

  const services = [
    {
      nombre: "Alimentos y Juguetes",
      descripcion: "Contamos con los mejores alimentos para que tu mascota se mantenga fuerte y sana. Tambien tenemos los mejores juguetes para que sea feliz.",
      src: petFoodIcon,
      alt: "Alimentos"
    },
    {
      nombre: "Farmacia",
      descripcion: "Si tu mascota no se encuentra bien. Nosotros podemos ayudarte, tenemos los mejores precios en medicamentos.",
      src: pharmacyIcon,
      alt: "Farmacia"
    },
    {
      nombre: "Laboratorio clínico",
      descripcion: "Contamos con los mejores alimentos para que tu mascota se mantenga fuerte y sana. Tambien tenemos los mejores juguetes para que sea feliz.",
      src: labIcon,
      alt: "LabClinico"
    },
    {
      nombre: "Baños y estetica canina",
      descripcion: "Hacemos que tu mascota viva limpia y con estilo.",
      src: showerIcon,
      alt: "BañosEsteticaCanina"
    }
  ]

 

  return (
    <main>
      <article className='relative w-full mb-16'>
        <div className=' h-[213px] xl:h-[600px] relative overflow-y-hidden mb-16'>
          <div className='absolute z-20 bg-black opacity-60 w-full h-[213px] xl:h-[600px]' ></div>
          <h1 className='absolute z-40 top-24 text-center text-white text-lg xl:text-4xl  xl:left-[25%] xl:top-[50%] '>¡En CareVet prestamos los mejores servicios!</h1>
          <img className='w-[100vw] absolute z-10 xl:-top-[300px] ' src="https://cloudfront-us-east-1.images.arcpublishing.com/infobae/L6GI2ZSXFZGADESR57UO666ZE4.jpg" alt="" />
        </div>

        <div className='h-[300px] w-full p-4 flex gap-12 overflow-x-scroll xl:absolute xl:left-[120px] xl:top-[500px] xl:z-30'>
          {
            services.map((servicio,index)=>{
              return <ServiceCard key={`serviceCard${index}`} servicio={servicio} />
            })
          }

        </div>
        

      </article>

      <article className='flex flex-col gap-3 p-2 pb-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-b-[60px] rounded-t-[60px]'>
        <h2 className=' text-xl text-center p-4 md:text-2xl font-semibold text-center'>Dale un vistazo a nuestros planes</h2>
        {planes.map((plan, index) => {
          return <PlanCard key={`plan${index}`} plan={plan} />
        })}
      </article>

      <article className='flex w-[300px] my-8 md:w-full flex-col items-center justify-center'>
        <p className='text-center mb-6 text-lg w-[300px] px-2 font-semibold' >¿Dudas de nuestros servicios? Mira la opinion de nuestros clientes</p>
        <ReviewSlider reviews={reviews}/>
      </article>

      <article>
        Productos
      </article>

      <article>marcas</article>


    </main>

  )
}

export default Inicio
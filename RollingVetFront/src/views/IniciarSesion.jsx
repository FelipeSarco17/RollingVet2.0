import React from 'react'
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthProvider'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Input from '../components/FormComponents/Input';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../validations/loginSchema';

const IniciarSesion = () => {

  const { validarUsuario, user } = useAuth();
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors }, reset } = useForm({resolver:zodResolver(loginSchema)})

  const onSubmit = async (obj) => {
    
      let res = await validarUsuario(obj);
  }


  return (
    <main>

      <article>


        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">

            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Iniciar Sesion
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form action="#" method="POST" className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              
              <Input type="text" error={errors.email?.message} label="Email" name="email" register={register}/>
              <Input type="password" error={errors.clave?.message} label="Contraseña" name="clave" register={register}/>
              

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-rose-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"

                >
                  Ingresar
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              No tienes una cuenta?{' '}
              <Link to="/registrarse" className="font-semibold leading-6 text-rose-600 hover:text-indigo-500">
                Registráte!
              </Link>
            </p>
          </div>
        </div>

      </article>



    </main>
  )
}

export default IniciarSesion
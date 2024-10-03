import React from 'react'
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import {useAuth} from '../contexts/AuthProvider'
import { useNavigate } from 'react-router-dom';

const IniciarSesion = () => {

  const {validarUsuario,user} = useAuth();
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors }, reset } = useForm()
  
  const onSubmit = async(obj)=>{
     let res = await validarUsuario(obj);
     navigate("/");
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
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    {...register("email")}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Contraseña
                  </label>
                  <div className="text-sm">
                    <a href="#" className="font-semibold text-rose-600 hover:text-indigo-500">
                     Olvidaste tu contraseña?
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    {...register("password")}
                  />
                </div>
              </div>

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
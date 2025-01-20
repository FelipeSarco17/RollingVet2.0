import React from 'react'
import { Link } from 'react-router-dom'
import { PawPrint } from 'lucide-react';
const Error404 = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#00bcd4]">
      <div className="w-full max-w-3xl px-4 py-8 text-center">
        <div className="mb-8 flex justify-center">
          <PawPrint className="h-24 w-24 text-white animate-bounce" />
        </div>

        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">¡Ups! Página no encontrada</h1>

        <p className="text-xl md:text-2xl text-white/90 mb-8">
          Parece que esta página se ha perdido como un cachorro travieso
        </p>

        <div className="space-y-4">
          <p className="text-lg text-white/80 mb-8">
            No te preocupes, puedes volver a la página principal para encontrar lo que buscas
          </p>

          <Link
            to={"/"}
            className="inline-flex items-center px-6 py-3 rounded-full bg-white text-[#00bcd4] font-semibold text-lg hover:bg-white/90 transition-colors duration-200"
          >
            <PawPrint className="w-5 h-5 mr-2" />
            Volver al Inicio
          </Link>
        </div>

        <div className="mt-12 flex justify-center space-x-4">
          {[...Array(3)].map((_, i) => (
            <PawPrint key={i} className="w-6 h-6 text-white/30 transform -rotate-45" />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Error404
import React from 'react'

const MapaSucursal = ({src,title,telefono}) => {
  return (
    <div className="flex flex-col items-center">
            <p className='text-2xl font-semibold'>{title}</p>
            <iframe
              src={src}
              width="100%"
              height="200"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title={title}
              className="rounded-lg"
            ></iframe>
            <p className="mt-4 text-center font-semibold">Teléfono: {telefono}</p>
          </div>
  )
}

export default MapaSucursal
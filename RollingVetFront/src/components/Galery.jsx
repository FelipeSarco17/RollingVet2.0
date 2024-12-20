import React from 'react'
import ProductCard from './ProductCard'
import { productos } from '../utils/dataArrays'
const Galery = () => {

    return (

        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            {productos.map((producto,index)=>{
                return <ProductCard name={producto.nombre} image={producto.src}/>
            })}
        </div>

    )
}

export default Galery
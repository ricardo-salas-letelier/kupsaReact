import { useContext, useState } from "react"
import {contexto} from "../context/CartContext"

export default function ViewAddCart(props) {
    // ESTADOS
    const valores = useContext(contexto)
    const [mensaje, setMensaje] = useState("")

    // EFECTOS
    // ACCCIONES
    const handleAgregar = (e) => {
        e.preventDefault()
        setMensaje("")
        if (props.cantidad > 0) {
            // Copiar arreglo
            let aux = JSON.parse(JSON.stringify(valores.carrito))
            let index = aux.findIndex((item) => {return item.codigo === props.producto.codigo})
            // Si producto existe en el carrito
            if (index !== -1) {
                // Validar que no supere el stock disponible
                if ((aux[index].cantidad + props.cantidad) <= props.producto.stock) {
                    aux[index].cantidad = aux[index].cantidad + parseInt(props.cantidad)
                    //console.log(aux[index])
                } else {
                    setMensaje("ATENCIÓN. No puede compra mas productos de lo que permite el stock disponible: "+props.producto.stock)
                }
            // Si producto NO existe en el carrito
            } else {
                // Agregar producto
                const prd = {
                    codigo:props.producto.codigo,
                    nombre:props.producto.nombre,
                    precio:props.producto.precio,
                    cantidad:parseInt(props.cantidad),
                    imagen:props.producto.imagen,
                    categoria:props.producto.categoria
                }
                aux.push(prd)
                //console.log(prd)
            }  
            // Actualizar total para CartWidget
            let t = aux.reduce((acumulador, elemento) => acumulador + elemento.cantidad, 0)
            valores.setTotal(t)
            //console.log("Total: ", t)
            // Actualizar carrito del contexto
            valores.setCarrito(aux) 
            //console.log(valores.carrito)
        } else {
            setMensaje("ATENCIÓN. No tiene sentido agregar 0 producto.")
        }     
    }    
    // VISTA
    if(props.producto.stock > 0) {
        return (
            <>
                <button type="button" onClick={handleAgregar}
                className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                title="Sumar al carrito"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 fill-blue-400">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                    </svg>
                </button>
                <p className="text-xs">{mensaje}</p>
            </>
        );
    } else {
        return (
            <h2>PRODUCTO SIN STOCK</h2>
        )
    }
}

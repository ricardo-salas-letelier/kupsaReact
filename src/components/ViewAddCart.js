import { useContext } from "react"
import {contexto} from "../context/CartContext"
import { toast } from "react-toastify"

export default function ViewAddCart(props) {
    // ESTADOS
    const valores = useContext(contexto)

    // EFECTOS
    // ACCCIONES
    const handleAgregar = (e) => {
        e.preventDefault()
        let mensaje = ""
        mensaje = valores.agregarProductoAlCarrito(props.producto, props.cantidad)
        if (mensaje !== "") {
            toast.info(mensaje)
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
            </>
        );
    } else {
        return (
            <h2>PRODUCTO SIN STOCK</h2>
        )
    }
}

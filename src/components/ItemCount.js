import { useState } from "react"
import ViewAddCart from "./ViewAddCart"
import { toast } from "react-toastify"

function ItemCount(props) {
    // ESTADOS
    const [cantidad, setCantidad] = useState(0)

    // EFECTOS

    // ACCCIONES
    const handleSumar = () => {
        if (props.producto.stock > cantidad) { 
            setCantidad(cantidad + 1)
        } else {
            toast.info("ATENCION. No puede comprar mas de lo que hay en stock: "+ props.producto.stock+".")

        }
    }
    const handleRestar = () => {
        if (cantidad > 0) {
            setCantidad(cantidad - 1)
        } else {
            toast.info("ATENCION. No puede comprar 0 productos!")
        } 
    }
    
    // VISTA
    if (props.producto.stock > 0) {
        return (
            <>
                <div className="flex flex-row gap-3">
                    <button type="button"
                    className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    onClick={handleSumar}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                        </svg>
                    </button>
                    <p>{cantidad}</p>
                    <button type="button" 
                    className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    onClick={handleRestar}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
                        </svg>
                    </button>
                    <ViewAddCart producto={props.producto} cantidad={cantidad}/>
                </div>          
            </>
        );
    } else {
        return(
            <h2>PRODUCTO SIN STOCK</h2>
        )
    }
}

export default ItemCount;
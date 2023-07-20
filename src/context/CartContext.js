import { createContext, useState } from "react";

//Esta es la caja invisible que mantiene los datos "globales"
export const contexto = createContext()

//Este es el componente que estaba adentro de la caja invisible y sirve para darle valor a la misma caja y darle acceso a la aplicacion 
const Provider = contexto.Provider

//Este es un wrapper que envuelve al Provider del contexto, de tal manera no cargo de responsabilidades al componente App (ni ningun otro componente)
function CartContextProvider(props) {

    const [carrito, setCarrito] = useState([])
    const [total, setTotal] = useState(0)

    const valorDelContexto = {
        carrito,
        setCarrito,
        total,
        setTotal
    }

    return (
        <Provider value={valorDelContexto}>
            {props.children}
        </Provider>
    )
}

export default CartContextProvider
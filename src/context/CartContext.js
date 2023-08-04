import { createContext, useState } from "react";

//Esta es la caja invisible que mantiene los datos "globales"
export const contexto = createContext()

//Este es el componente que estaba adentro de la caja invisible y sirve para darle valor a la misma caja y darle acceso a la aplicacion 
const Provider = contexto.Provider

//Este es un wrapper que envuelve al Provider del contexto, de tal manera no cargo de responsabilidades al componente App (ni ningun otro componente)
function CartContextProvider(props) {
    // ESTADOS
    const [carrito, setCarrito] = useState([])
    const [totalCantidad, setTotalCantidad] = useState(0)
    const [montoTotal, setMontoTotal] = useState(0)

    // EFECTOS
    // ACCCIONES
    const agregarProductoAlCarrito = (producto, cantidad) => {
        let mensaje = ""
        if (cantidad > 0) {
            // Copiar arreglo
            let aux = JSON.parse(JSON.stringify(carrito))
            let index = aux.findIndex((item) => {return parseInt(item.codigo) === parseInt(producto.codigo)})
            // Si producto existe en el carrito
            if (index !== -1) {
                // Validar que no supere el stock disponible
                if ((aux[index].cantidad + parseInt(cantidad)) <= producto.stock) {
                    aux[index].cantidad = aux[index].cantidad + parseInt(cantidad)
                } else {
                    mensaje = "ATENCIÓN. No puede compra mas productos de lo que permite el stock disponible: "+producto.stock
                }
            // Si producto NO existe en el carrito
            } else {
                // Agregar producto
                const prd = {
                    codigo:producto.codigo,
                    nombre:producto.nombre,
                    precio:producto.precio,
                    cantidad:parseInt(cantidad),
                    imagen:producto.imagen,
                    categoria:producto.categoria
                }
                aux.push(prd)
            }  
            // Actualizar total para CartWidget
            let m = aux.reduce((acumulador, elemento) => acumulador + elemento.cantidad*elemento.precio, 0)
            setMontoTotal(m)
            let t = aux.reduce((acumulador, elemento) => acumulador + elemento.cantidad, 0)
            setTotalCantidad(t)
            // Actualizar carrito del contexto
            setCarrito(JSON.parse(JSON.stringify(aux))) 
        } else {
            mensaje = "ATENCIÓN. No tiene sentido agregar 0 producto."
        }
        return mensaje
    }
    const removerProductoDelCarrito = (producto) => {
        // Copiar arreglo
        let aux = JSON.parse(JSON.stringify(carrito))
        let index = aux.findIndex((item) => {return item.codigo === producto.codigo})
        // Si producto existe en el carrito
        if (index !== -1) {
            aux.splice(index, 1)
        }  
        // Actualizar total para CartWidget
        let m = aux.reduce((acumulador, elemento) => acumulador + parseInt(elemento.cantidad)*parseInt(elemento.precio), 0)
        setMontoTotal(m)
        let t = aux.reduce((acumulador, elemento) => acumulador + elemento.cantidad, 0)
        setTotalCantidad(t)
        // Actualizar carrito del contexto
        setCarrito(JSON.parse(JSON.stringify(aux)))       
    }

    const vaciarCarrito = () => {
        // Actualizar carrito del contexto
        setCarrito([])     
        setTotalCantidad(0) 
        setMontoTotal(0) 
    }

    const valorDelContexto = {
        carrito : carrito,
        totalCantidad : totalCantidad,
        montoTotal : montoTotal,
        agregarProductoAlCarrito : agregarProductoAlCarrito, 
        removerProductoDelCarrito : removerProductoDelCarrito,
        vaciarCarrito : vaciarCarrito
    }

    // VISTA
    return (
        <Provider value={valorDelContexto}>
            {props.children}
        </Provider>
    )
}

export default CartContextProvider
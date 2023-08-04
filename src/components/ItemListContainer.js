import { useEffect, useState } from "react";
import ItemList from "./ItemList"
import { useParams } from "react-router-dom";
import { traerMuebles, traerMueblesPorCategoria } from "../Utils";

function ItemListContainer(props) {
    // ESTADOS
    const [productos,setProductos] = useState([])
    const [filtro,setFiltro] = useState("")
    const [cargando,setCargando] = useState(true)
    const parametros = useParams()

    // EFECTOS
    useEffect(function() {
        let promesa = null
        if (parametros.id === undefined) {
            promesa = traerMuebles()
            setFiltro("TODOS LOS PRODUCTOS")
        } else {
            promesa = traerMueblesPorCategoria(parametros.id)
            setFiltro(parametros.id.toUpperCase())
        }       
        promesa
        .then ((resultado)=>{
            setProductos(resultado)
            setCargando(false)
        })
        .catch(() => {
            console.log("ERROR. Problemas para traer datos desde base de datos.")
        })

    }, [parametros.id]);

    // ACCCIONES

    // VISTA
    if (cargando) {
        return (
            <div className="bg-white lineaAbajo mx-5">
                <h1><strong>Cargando ...</strong></h1>
            </div>
        );
    } else {
        return (
            <div className="bg-white lineaAbajo mx-5">
                <h1><strong>{filtro}</strong></h1>
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                        <ItemList productos={productos}/>
                    </div>
                </div>
            </div>
        );
    }
}
  
export default ItemListContainer;
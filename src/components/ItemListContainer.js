import { useEffect, useState } from "react";
import ItemList from "./ItemList"
import { useParams } from "react-router-dom";
import productosJson from "../json/productos.json"

function ItemListContainer(props) {
    // ESTADOS
    const [productos,setProductos] = useState([])
    const [filtro,setFiltro] = useState("")
    const parametros = useParams()

    // EFECTOS
    useEffect(function() {
        let filtrados = []
        if (parametros.id === undefined) {
            filtrados = productosJson
            setFiltro("TODOS LOS PRODUCTOS")
        } else {
            filtrados = productosJson.filter((item) => {return item.categoria === parametros.id})
            setFiltro(parametros.id.toUpperCase())
        }
        setProductos(filtrados)
    }, [parametros.id]);

    // ACCCIONES

    // VISTA
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
  
export default ItemListContainer;
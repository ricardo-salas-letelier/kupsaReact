import { useEffect, useState } from "react";
import ItemList from "./ItemList"

function ItemListContainer(props) {
    // ESTADOS
    const [productos,setProductos] = useState([])
    // EFECTOS
    useEffect(function() {
        cargarProductos()
        return () => {  }
    }, []);
    // ACCCIONES
    function cargarProductos() {
        // Leer archivo json
        const file = "./json/productos.json";
        fetch(file)
            .then(respuesta =>  respuesta.json())
            .then((prds) => {
                setProductos(prds)
            })
            .catch(error => console.log("ERROR. Problemas al cargar productos", error))
    }
    // VISTA
    return (
        <div className="bg-white lineaAbajo mx-5">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h2 className="sr-only">Productos</h2>
                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    <ItemList productos={productos}/>
                </div>
            </div>
        </div>
    );
}
  
export default ItemListContainer;
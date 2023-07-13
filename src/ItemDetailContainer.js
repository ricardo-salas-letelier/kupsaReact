import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import productosJson from "./json/productos.json"
import ItemDetail from "./ItemDetail"

function ItemDetailContainer(props) {
    // ESTADOS
    const [producto,setProducto] = useState([])
    const parametros = useParams()

    // EFECTOS
    useEffect(function() {
        let index = productosJson.findIndex((item) => {return item.codigo === parametros.codigo})
        if (index !== -1) {
            let prd = productosJson[index]
            setProducto(prd)    
        } else {
            console.log("ATENCION. Producto con código:", parametros.codigo, ", no existe.")
        }
    }, [parametros.codigo]);

    // ACCCIONES

    // VISTA
    return (
        <div className="bg-white lineaAbajo mx-5">
            <ItemDetail producto={producto} />
            {/* <p>{parametros.codigo}</p>
            <p>{producto.nombre}</p> */}
        </div>
    );
}
  
export default ItemDetailContainer;
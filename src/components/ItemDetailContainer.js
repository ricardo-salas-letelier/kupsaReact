import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ItemDetail from "./ItemDetail"
import { traerMueblesPorCodigo } from "../Utils";
import { toast } from "react-toastify"

function ItemDetailContainer() {
    // ESTADOS
    const [producto,setProducto] = useState({})
    const [cargando,setCargando] = useState(true)
    const parametros = useParams()

    // EFECTOS
    useEffect(function() {
        const promesa = traerMueblesPorCodigo(parametros.codigo)
        promesa
        .then ((resultado)=>{
            if (resultado !== undefined) {
                setProducto(resultado)        
            } else {
                toast.info("ATENCION. Producto con código:"+ parametros.codigo+ ", no existe.")
            }
            setCargando(false)
        })
        .catch(() => {
            toast.error("ERROR. Problemas para traer mueble desde base de datos.")
       })
    }, [parametros.codigo]);

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
                <ItemDetail producto={producto} />
            </div>
        );
    }
}
  
export default ItemDetailContainer;
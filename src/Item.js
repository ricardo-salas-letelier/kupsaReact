import ViewAddCart from "./ViewAddCart"
import ViewAddHeart from "./ViewAddHeart"
import {Link} from "react-router-dom"

function Item(props) {
    // ESTADOS
    // EFECTOS
    // ACCCIONES
    const formatNumber = () => props.producto.precio.toLocaleString('cl-CL', { style: 'currency', currency: 'CLP' })
    // VISTA
    return (
        <>
            <Link key={props.producto.codigo} to={"/producto/"+props.producto.codigo} className="group">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                    <img
                    src={props.producto.imagen}
                    alt={props.producto.nombre}
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                    />
                </div>
                <h3 className="mt-4 text-sm text-gray-700">{props.producto.nombre}</h3>
                <p className="mt-1 text-lg font-medium text-gray-900">{formatNumber()}</p>
                <div className="flex flex-row gap-1">
                    <ViewAddHeart codigo={props.producto.codigo} texto={'Sumar a lista deseos'}/>
                    <ViewAddCart codigo={props.producto.codigo} texto={'Sumar al carrito'}/> 
                </div>
            </Link>
        </>
    );
}

export default Item;
import Item from "./Item"

function ItemList(props) {
    // ESTADOS
    // EFECTOS
    // ACCCIONES
    // VISTA
    return (
        <>
            {props.productos.map((producto) => (
                <Item key={producto.codigo} producto={producto} />
            ))}
        </>
    );
}

export default ItemList;
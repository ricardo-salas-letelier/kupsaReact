import Item from "./Item"

function ItemList(props) {
    // ESTADOS
    // EFECTOS
    // ACCCIONES
    // VISTA
    return (
        <>
            {props.productos.map((producto) => (
                <Item producto={producto} />
            ))}
        </>
    );
}

export default ItemList;
import {db} from "./FirebaseConfig"
import { collection, getDocs, query, where, getDoc, doc, addDoc } from "firebase/firestore";

export async function traerMuebles() {
    // Referencia de la colección de muebles de la bd
    const coleccionMuebles = collection(db,"muebles")

    const resultado = await getDocs(coleccionMuebles)
    const prds = resultado.docs.map(doc => { return doc.data() })

    return prds
}

export async function traerMueblesPorCategoria(categoria) {
    // Referencia de la colección de muebles de la bd
    const coleccionMuebles = collection(db,"muebles")
    const consulta = query(coleccionMuebles,where("categoria","==",categoria))

    const resultado = await getDocs(consulta)
    const prds = resultado.docs.map(doc => { return doc.data() })

    return prds
}

export async function traerMueblesPorCodigo(codigo) {
    // Referencia de la colección de muebles de la bd
    const coleccionMuebles = collection(db,"muebles")    
    const producto = doc(coleccionMuebles,codigo)

    const resultado = await getDoc(producto)
    
    return resultado.data()
}

export async function guardarOrden(data) {
    // Referencia de la colección de muebles de la bd
    const coleccionOrdenes = collection(db,"ordenes")    

    const resultado = await addDoc(coleccionOrdenes, data)
    
    return resultado
}
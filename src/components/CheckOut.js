import { useContext } from "react"
import {contexto} from "../context/CartContext"
import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { serverTimestamp } from "firebase/firestore"
import { guardarOrden } from "../Utils";
import { toast } from "react-toastify"

function Checkout(props) {
    // ESTADOS
    const valores = useContext(contexto)
    // EFECTOS
    // ACCCIONES
    const formatNumber = (precio) => parseInt(precio).toLocaleString('cl-CL', { style: 'currency', currency: 'CLP' })
    const removerProducto = (prd) => {
        valores.removerProductoDelCarrito(prd)
    }
    const handleClick = () => {
        if (valores.totalCantidad > 0) {
            // Juntar datos
            const data = {
                productos : valores.carrito,
                usuario : "j.perez",
                correo : "j.prez@gmail.com",
                estado : "generada",
                fecha : serverTimestamp()
            }
            // Grabar
            guardarOrden(data)
            .then((resultado) => {
                toast.info("Felicitaciones por la compra. Su numero de orden es: "+resultado.id)
            })
            .catch(() => {
                toast.error("ERROR. Problemas para grabar orden en base de datos.")
            })
            // Vaciar carrito
            valores.vaciarCarrito()
        } else {
            toast.info("ATENCION. No puede grabar orden con 0 productos!")
        } 
    }

    // VISTA
    return (
        <Transition.Root show={props.abrir} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={props.onClose}>
                <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-500"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-500"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                                            <div className="flex items-start justify-between">
                                                <Dialog.Title className="text-lg font-medium text-gray-900">Carrito de compra</Dialog.Title>
                                                <div className="ml-3 flex h-7 items-center">
                                                    <button
                                                        type="button"
                                                        className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                                                        onClick={props.onClose}
                                                    >
                                                        <span className="sr-only">Close panel</span>
                                                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="mt-8">
                                                <div className="flow-root">
                                                    <ul className="-my-6 divide-y divide-gray-200">
                                                        {valores.carrito.map((prd) => (
                                                        <li key={prd.codigo} className="flex py-6">
                                                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                                <img
                                                                    src={prd.imagen}
                                                                    alt={prd.nombre} 
                                                                    className="h-full w-full object-cover object-center"
                                                                />
                                                            </div>

                                                            <div className="ml-4 flex flex-1 flex-col">
                                                                <div>
                                                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                                                        <h3>
                                                                            <a href=".">
                                                                                {prd.nombre}
                                                                            </a>
                                                                        </h3>
                                                                        <p className="ml-4">{formatNumber(prd.precio)}</p>
                                                                    </div>
                                                                </div>
                                                                <div className="flex flex-1 items-end justify-between text-sm">
                                                                    <p className="text-gray-500">Cantidad {prd.cantidad}</p>
                                                                    <div className="flex">
                                                                        <button
                                                                            type="button" onClick={() => {removerProducto(prd)}}
                                                                            className="font-medium text-indigo-600 hover:text-indigo-500"
                                                                        >
                                                                            Eliminar
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                                            <div className="flex justify-between text-base font-medium text-gray-900">
                                                <p>Total (incl. impuesto)</p>
                                                <p>{formatNumber(valores.montoTotal)}</p>
                                            </div>
                                            <div className="mt-6 flex items-center justify-center">
                                                <button className="rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                                                 onClick={handleClick}
                                                >
                                                    Pasar por caja
                                                </button>
                                            </div>
                                            <div className="mt-6 flex justify-center text-center text-sm text-gray-500 gap-2">
                                                <p>
                                                    <button
                                                        type="button"
                                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                                        onClick={props.onClose}
                                                    >
                                                        Continue comprando
                                                        <span aria-hidden="true"> &rarr;</span>
                                                    </button>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}

export default Checkout;
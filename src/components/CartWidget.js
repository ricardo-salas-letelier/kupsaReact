import {contexto} from "../context/CartContext"
import { useContext, useState } from "react"
import ShoppingCart from './ShoppingCart';

function CartWidget() {
    // ESTADOS
    const valores = useContext(contexto)
    const [abrir, setAbrir] = useState(false)

    // EFECTOS

    // ACCCIONES
    const handleOpen = () => {
      setAbrir(true)
    }
    const handleClose = () => {
      setAbrir(false)
    }
     
    // VISTA
    return (
      <>
        <div className="flex flex-row">
          <button type="button" onClick={handleOpen}
                className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            <div className="flex flex-row">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
              </svg>
              <p className="text-xs">{valores.totalCantidad}</p>
            </div>
          </button>
          <ShoppingCart abrir={abrir} onClose={handleClose}/>
        </div>
      </>
    );
}
  
export default CartWidget;
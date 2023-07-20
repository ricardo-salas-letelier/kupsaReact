import NavBar from "./components/NavBar"
import ItemListContainer from "./components/ItemListContainer"
import ItemDetailContainer from "./components/ItemDetailContainer"
import CartContextProvider from "./context/CartContext"

import { BrowserRouter, Route, Routes } from "react-router-dom";
import ShoppingCart from "./components/ShoppingCart";

function App() {
    // ESTADOS
    // EFECTOS
    // ACCCIONES
    // VISTA
    return (
      <CartContextProvider>
        <BrowserRouter >
            <NavBar/>
            <Routes>
              <Route path="/" element={<ItemListContainer />}></Route>
              <Route path="/category/:id" element={<ItemListContainer/>}></Route>
              <Route path="/producto/:codigo" element={<ItemDetailContainer/>}></Route>
            </Routes>
            <footer className="mx-5">
              <p>Copyright Ricardo Salas</p>
            </footer>
        </BrowserRouter>
      </CartContextProvider>
    );
}

export default App;

import NavBar from "./NavBar"
import ItemListContainer from "./ItemListContainer"
import ItemDetailContainer from "./ItemDetailContainer"

import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
    // ESTADOS
    // EFECTOS
    // ACCCIONES
    // VISTA
    return (
      <BrowserRouter>
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
    );
}

export default App;

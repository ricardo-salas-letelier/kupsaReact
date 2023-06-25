import NavBar from "./NavBar"
import ItemListContainer from "./ItemListContainer"

function App() {
  return (
    <>
      <NavBar/>

      <main className="grow lineaAbajo mx-5">
        <ItemListContainer saludo='Bienvenido Ricardo' de='al mundo de React'/>
      </main>

      <footer className="mx-5">
        <p>Copyright Ricardo Salas</p>
      </footer>
    </>
  );
}

export default App;

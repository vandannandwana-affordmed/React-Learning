import "./App.css";
import NavBar from "./components/NavBar";
import ProductsPage from "./components/ProductsPage";

function App() {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <main>
        <ProductsPage />
      </main>
    </>
  );
}

export default App;

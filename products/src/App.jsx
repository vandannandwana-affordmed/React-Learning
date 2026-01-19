import "./App.css";
import NavBar from "./components/Navbar";
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

import productsData from "../data/products";
import ProductCard from "../components/ProductCard";
import { useState } from "react";
import "../styles/ProductsPage.css";

export default function ProductsPage() {
  const [search, setSearch] = useState("");

  const filteredProducts = productsData.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="product-page">
      <input
        type="text"
        placeholder="Search products..."
        className="search-bar"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="product-grid">
        {filteredProducts.map((product) => (
          <ProductCard product={product} />
        ))}

        {filteredProducts.length === 0 && <p>No products found</p>}
      </div>
    </div>
  );
}

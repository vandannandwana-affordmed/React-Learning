export default function ProductCard({ product }) {
  return (
    <div className="product-card">
      <img className="product-image" src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p className="description">{product.description}</p>
      <p className="price">₹{product.price}</p>
      <button>Add to Cart</button>
    </div>
  );
}

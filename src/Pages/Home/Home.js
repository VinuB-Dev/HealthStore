import "../../styles.css";
import { Link } from "react-router-dom";
import { useCart } from "../../context/dataContext";

// More design needs to be done, add slider and good images.
export default function Home() {
  const { filteredData } = useCart();
  return (
    <div>
      <h1>Welcome to Health Store</h1>
      <Link to="/products" className="cart_btn-yellow">
        Explore all products
      </Link>
      <br />
      <br />
      <br />
      <h1>Trending Deals</h1>
      <div className="grid">
        {filteredData.slice(0, 5).map((product) => {
          return (
            <Link to="/products" key={product.id} className="card2">
              <div className="card-img2">
                <img src={product.imageURL} alt="" />
              </div>
              <div className="card-desc2">
                <span className="title2">{product.name}</span>
                <div className="price-flex">
                  <div className="bold">₹ {product.final_price}</div>
                  <div className="actual-price">₹ {product.original_price}</div>
                </div>
                <span className="product-desc2">{product.description} </span>
              </div>
            </Link>
          );
        })}
      </div>
      {/* more work to do here */}
    </div>
  );
}

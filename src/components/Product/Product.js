import "./Product_module.css";
import { FiShoppingCart } from "react-icons/fi";
import { BsBookmark, BsFillBookmarkFill } from "react-icons/bs";
import { useCart } from "../../context/dataContext";

export default function Product(value) {
  const { addToWishList, addToCart } = useCart();
  return value.value.map((product) => {
    return (
      <div key={product._id} className="card2">
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
          <button
            className="primary_btn-yellow product-desc"
            onClick={() => addToCart(product)}
          >
            {product.IsInCart && product.QuantityInCart > 0}
            {product.IsInCart ? "Remove from Cart" : "Add To Cart"}{" "}
            <FiShoppingCart />
          </button>
          <button
            className="product-desc primary_btn-yellow"
            onClick={() => addToWishList(product)}
          >
            {product.IsWishlisted ? <BsFillBookmarkFill /> : <BsBookmark />}
          </button>
        </div>
      </div>
    );
  });
}

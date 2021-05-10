import "../Product/Product_module.css";
import "../../styles.css";
import { FiShoppingCart } from "react-icons/fi";
import { RiDeleteBin3Fill } from "react-icons/ri";
import { useCart } from "../../context/dataContext";
import { Link } from "react-router-dom";

const ShowItem = () => {
  const {
    state: { wishListItems },
    dispatch
  } = useCart();
  return wishListItems.map((product) => {
    return (
      <div key={product.id} className="card2">
        <div>
          <img className="card-img2" src={product.imageURL} alt="" />
        </div>
        <div className="card-desc2">
          <span className="title2">{product.name}</span>
          <div className="price-flex">
            <div className="bold">₹ {product.final_price}</div>
            <div className="actual-price">₹ {product.original_price}</div>
          </div>
          <span className="product-desc2">{product.description} </span>
          <button
            className="product-desc primary_btn-yellow"
            onClick={() =>
              dispatch({ type: "ADD_ITEM_TO_CART", payload: product })
            }
          >
            Move to Cart <FiShoppingCart />
          </button>
          <button
            className="primary_btn-yellow product-desc"
            onClick={() =>
              dispatch({ type: "REMOVE_ITEM_FROM_WISHLIST", payload: product })
            }
          >
            <RiDeleteBin3Fill />
          </button>
        </div>
      </div>
    );
  });
};

export default function WishList() {
  const {
    state: { wishListItems }
  } = useCart();
  return (
    <div>
      {wishListItems.length > 0 && (
        <div>
          <h3 style={{ textAlign: "center", marginLeft: "3rem" }}>
            WishList <div>{wishListItems.length} Items</div>
          </h3>
          <div className="grid">
            <ShowItem />
          </div>{" "}
        </div>
      )}
      {wishListItems.length === 0 && (
        <h3 style={{ textAlign: "center", marginLeft: "3rem" }}>
          No Products in your Wishlist
          <button className="primary_btn-yellow product-desc">
            <Link to="/products">Check All Products</Link>
          </button>
        </h3>
      )}
    </div>
  );
}

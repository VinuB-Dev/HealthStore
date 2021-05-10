import "./Cart_module.css";
import { useCart } from "../../context/dataContext";
import { Link } from "react-router-dom";

const ShowItem = () => {
  const {
    state: { cartItems },
    dispatch
  } = useCart();
  return cartItems.map((product) => {
    return (
      <div key={product._id} className="card">
        <div>
          <img className="card-img" src={product.imageURL} alt="" />
        </div>
        <div className="card-desc">
          <span className="title_cart">{product.name}</span>
          <div className="price-flex1">
            <div>₹ {product.final_price}</div>
          </div>
          <span className="product-desc1">{product.description} </span>
          <div className="button-flex">
            <button
              className="cart_btn-yellow"
              onClick={() =>
                dispatch({ type: "REMOVE_ITEM_FROM_CART", payload: product })
              }
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    );
  });
};

const CartCard = () => {
  const {
    state: { cartItems }
  } = useCart();
  const { TotalPrice, FinalPrice, discount } = addCost(cartItems);
  return (
    <div className="CartCard">
      <div className="card-heading">Price Details:</div>
      <div className="card-split">
        <div>
          <div>Total MRP:</div>
          <div>Total Discount:</div>
          <div className="final">Final Price:</div>
        </div>
        <div>
          <div>₹ {TotalPrice}</div>
          <div>₹ {discount}</div>
          <div className="final">₹ {FinalPrice}</div>
        </div>
      </div>
      <div className="button-flex">
        <button className="cart_btn-yellow product-desc">Order Now</button>
      </div>
    </div>
  );
};

const addCost = (cartItems) => {
  const TotalPrice = cartItems.reduce(
    (count, item) => count + item.final_price * item.QuantityInCart,
    0
  );
  const discount = TotalPrice / 10;
  const FinalPrice = TotalPrice - discount;
  return { TotalPrice, FinalPrice, discount };
};

export default function Cart() {
  const {
    state: { cartItems }
  } = useCart();

  return (
    <div>
      {cartItems.length > 0 && (
        <div>
          <h3>Items in Cart: {cartItems.length}</h3>
          <div className="making-grids">
            <div className="allItems">
              <ShowItem />
            </div>
            <div div className="allItems">
              <CartCard value={cartItems} />
            </div>
          </div>
        </div>
      )}
      {cartItems.length === 0 && (
        <h3 style={{ textAlign: "center", marginLeft: "3rem" }}>
          No Products in your Cart
          <button className="primary_btn-yellow">
            <Link to="/products">Check All Products</Link>
          </button>
        </h3>
      )}
    </div>
  );
}

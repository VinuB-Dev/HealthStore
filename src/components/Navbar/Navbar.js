import "./Navbar_module.css";
import { BsFillBookmarkFill } from "react-icons/bs";
import { FiShoppingCart } from "react-icons/fi";
import { useCart } from "../../context/dataContext";
import { Link } from "react-router-dom";

export default function Navbar() {
  const {
    state: { cartItems, wishListItems }
  } = useCart();
  return (
    <div className="navbar">
      <h2 className="shop-name">
        <Link to="/">Health Store</Link>
      </h2>
      <ul className="right-nav">
        <li>
          <Link to="/products">
            <span>Products</span>
          </Link>
        </li>
        <li>
          <Link to="/wishlist">
            <BsFillBookmarkFill />
            <span>WishList</span>
          </Link>
        </li>
        <li>
          <Link to="/cart">
            <FiShoppingCart />
            <span>Cart</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}

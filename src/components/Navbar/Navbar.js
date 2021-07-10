import "./Navbar.css";
import { BsFillBookmarkFill } from "react-icons/bs";
import { FiShoppingCart } from "react-icons/fi";
import { RiLoginBoxFill } from "react-icons/ri";
import { useUser } from "../../context/user/userContext";
import { Link } from "react-router-dom";
export default function Navbar() {
  const {
    userState: { isLoggedIn, cart, wishlist },
    userDispatch
  } = useUser();
  return (
    <div className="navbar">
      <h2 className="shop-name">
        <Link to="/" className="white">
          Health Store
        </Link>
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
          </Link>
          <span className="badge">{isLoggedIn ? wishlist.length : 0}</span>
        </li>
        <li>
          <Link to="/cart">
            <FiShoppingCart />
          </Link>
          <span className="badge">{isLoggedIn ? cart.length : 0}</span>
        </li>
        <li>
          {!isLoggedIn ? (
            <Link to="/Login">
              <RiLoginBoxFill />
            </Link>
          ) : (
            <Link
              to="/"
              onClick={() => {
                userDispatch({
                  type: "UPDATE_USER_LOGIN",
                  payload: {
                    isLoggedIn: false
                  }
                });
              }}
            >
              <RiLoginBoxFill />
            </Link>
          )}
        </li>
      </ul>
    </div>
  );
}

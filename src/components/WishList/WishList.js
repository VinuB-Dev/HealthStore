import "../Product/Product_module.css";
import "../../styles.css";
import { FiShoppingCart } from "react-icons/fi";
import { RiDeleteBin3Fill } from "react-icons/ri";
import { useUser } from "../../context/user/userContext";
import { Link } from "react-router-dom";
import { isWishlisted } from "../../Utils";
import {
  incrementQuantity,
  cartAdd,
  wishlistRemove
} from "../../Services/user.service";
const ShowItem = () => {
  const {
    userState: { wishlist, cart },
    userDispatch
  } = useUser();

  const moveToCart = async (product) => {
    let promise;
    isWishlisted(product, cart)
      ? (promise = incrementQuantity(product._id))
      : (promise = cartAdd(product._id));

    isWishlisted(product, cart)
      ? userDispatch({
          type: "INCREASE_QUANTITY",
          payload: product
        })
      : userDispatch({
          type: "ADD_ITEM_TO_CART",
          payload: product
        });

    const response = await promise;
    const response2 = await wishlistRemove(product._id);
    if (!response.success && !response2.success) {
      userDispatch({
        type: "REMOVE_ITEM_FROM_CART",
        payload: product
      });
      userDispatch({
        type: "ADD_ITEM_TO_WISHLIST",
        payload: product
      });
    }
  };

  const removeFromWishlist = async (product) => {
    userDispatch({
      type: "REMOVE_ITEM_FROM_WISHLIST",
      payload: product
    });
    let promise = wishlistRemove(product._id);
    const response = await promise;

    if (!response.success) {
      userDispatch({
        type: "ADD_ITEM_TO_WISHLIST",
        payload: product
      });
    }
  };

  return wishlist.map((product) => {
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
            onClick={() => moveToCart(product)}
          >
            Move to Cart <FiShoppingCart />
          </button>
          <button
            className="primary_btn-yellow product-desc"
            onClick={() => removeFromWishlist(product)}
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
    userState: { wishlist }
  } = useUser();
  return (
    <div>
      {wishlist.length > 0 && (
        <div>
          <h3 style={{ textAlign: "center", marginLeft: "3rem" }}>
            WishList <div>{wishlist.length} Items</div>
          </h3>
          <div className="grid">
            <ShowItem />
          </div>{" "}
        </div>
      )}
      {wishlist.length === 0 && (
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

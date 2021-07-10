import "../../styles.css";
import "./styles.css";
import { Link } from "react-router-dom";
import { useCart } from "../../context/data/dataContext";
import { useState, useEffect } from "react";

export default function Home() {
  const { filteredData } = useCart();

  const [img, setImg] = useState("img1");
  const img_collection = ["img1", "img2"];
  var img_index = 0;

  const changeImgIndex = (img_index) => {
    setImg(img_collection[img_index]);
    img_index = img_index + 1 < img_collection.length ? img_index + 1 : 0;
    return img_index;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      img_index = changeImgIndex(img_index);
    }, 5000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div>
      <div className="banner">
        {img === "img1" && (
          <div className="sliding-img img1">
            <h2 className="slogan">Eat healthy, Stay Healthy</h2>
            <Link to="/products">
              <button className="slogan-btn">Shop Now</button>
            </Link>
          </div>
        )}

        {img === "img2" && <div className="sliding-img img2"></div>}
        <button
          style={
            img === "img1"
              ? { backgroundColor: "#34D399" }
              : { backgroundColor: "#ECFDF5" }
          }
          className="btn-img"
          onClick={() => setImg("img1")}
        ></button>
        <button
          style={
            img === "img2"
              ? { backgroundColor: "#34D399" }
              : { backgroundColor: "#ECFDF5" }
          }
          className="btn-img"
          onClick={() => setImg("img2")}
        ></button>
      </div>
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

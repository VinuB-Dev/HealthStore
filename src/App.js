import "./styles.css";
import Navbar from "./components/Navbar/Navbar";
import WishList from "./components/WishList/WishList";
import Cart from "./components/Cart/Cart";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import AllProducts from "./Pages/Allproducts";
import Home from "./Pages/Home/Home";

export default function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<AllProducts />} />
        <Route path="/wishlist" element={<WishList />} />
        <Route path="/Cart" element={<Cart />} />
      </Routes>
    </div>
  );
}

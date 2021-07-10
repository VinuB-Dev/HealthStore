import "./styles.css";
import Navbar from "./components/Navbar/Navbar";
import WishList from "./components/WishList/WishList";
import Cart from "./components/Cart/Cart";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";

import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import AllProducts from "./Pages/Allproducts";
import Home from "./Pages/Home/Home";
import PrivateRoute from "./PrivateRoute";
export default function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<AllProducts />} />
        <PrivateRoute path="/wishlist" element={<WishList />} />
        <PrivateRoute path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

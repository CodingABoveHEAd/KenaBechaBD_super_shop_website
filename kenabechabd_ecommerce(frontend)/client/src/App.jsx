import React from "react";
import Navbar from "./components/Navbar";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";
import { useAppContext } from "./context/AppContext";
import Login from "./components/Login";
import AllProducts from "./components/AllProducts";
import ProductsCategory from "./pages/ProductsCategory";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import AddAddress from "./pages/AddAddress";
import MyOrder from "./pages/MyOrder";

const App = () => {
  const isSellerPath = useLocation().pathname.includes("/seller");
  const { loggedin } = useAppContext();
  return (
    <div>
      {!isSellerPath && <Navbar />}
      {loggedin && <Login />}
      <Toaster />
      <div
        className={`${isSellerPath ? "" : "px-6 md:px-16 lg:px-24 xl:px-32"}`}
      >
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/products" element={<AllProducts/>}></Route>
          <Route path="/products/:category" element={<ProductsCategory/>}></Route>
          <Route path="/productdetails/:category/:id" element={<ProductDetails/>}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/add-address" element={<AddAddress />}></Route>
          <Route path="/my-orders" element={<MyOrder />}></Route>
        </Routes>
      </div>
      {!isSellerPath && <Footer />}
    </div>
  );
};

export default App;

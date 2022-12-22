import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import React from "react";
import About from "./pages/About/About";
import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Cart from "./pages/Cart.jsx/Cart";
import ProductList from "./components/productList/ProductList";
import Product from "./pages/Product/Product";
import Footer from "./components/Footer/Footer";
import Container from "./components/Container/Container";
import Success from "./pages/Success";

function App() {
  return (
    <div className="">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/products/:category" element={<ProductList />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/container" element={<Container />} />
          <Route path="/success" element={<Success />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;

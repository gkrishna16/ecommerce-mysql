import React from "react";
import { Link } from "react-router-dom";
import nv from "./nav.module.css";

const Navbar = () => {
  return (
    <div>
      <ul className={`${nv.navContainer}`}>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/container">Container</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </ul>
    </div>
  );
};

export default Navbar;

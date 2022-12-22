import React from "react";
import { Link } from "react-router-dom";
import hm from "./home.module.css";

const Home = () => {


  return (
    <div>
      <div className="">Home</div>
      <div className={`${hm.links}`}>
        <Link to="/products/men">Men</Link>
        <Link to="/products/women">Women</Link>{" "}
        <Link to="/products/tshirts">Tshirts</Link>
      </div>
    </div>
  );
};

export default Home;

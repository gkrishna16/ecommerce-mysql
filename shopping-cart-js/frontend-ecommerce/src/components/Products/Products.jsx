import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import prd from "./products.module.css";

const Products = ({ category, filters }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    async function getProductsByCategory() {
      try {
        const res = await Axios.get(
          category
            ? `http://localhost:5002/api/products/${category}`
            : `http://localhost:5002/api/products`
        );
        console.log(res.data);
        setProducts(res.data);
        setFilteredProducts(res.data);
      } catch (error) {
        console.log(error);
      }
    }

    getProductsByCategory();
  }, [category]);

  useEffect(() => {
    category &&
      setFilteredProducts(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [category, filters]);

  return (
    <div>
      <div className="">Products</div>

      <div className={`${prd.prodContainer}`}>
        {filteredProducts.map((product) => {
          return (
            <div key={product.id} className="">
              <Link to={`/product/${product.id}`}>
                <div className={`${prd.imgBox}`}>
                  <img src={product.img} alt="" />
                  <div className="">{product.title}</div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Products;

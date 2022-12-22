import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Products from "../Products/Products";
import prl from "./productlist.module.css";

const ProductList = () => {
  const [fileters, setFileters] = useState({});
  const [sort, setSort] = useState(``);
  console.log(`sort`, sort);

  const location = useLocation();
  const cat = location.pathname.split("/")[2];

  //   console.log(cat, fileters, sort);

  function handleFilters(e) {
    setFileters((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }

  return (
    <div>
      <div className="">
        <div className={`${prl.filContainer}`}>
          <div className="" style={{ display: "flex", gap: `2em` }}>
            <div className="">
              <select name="color" id="" onChange={handleFilters}>
                <option value="grey">Grey</option>
                <option value="red">Red</option>
                <option value="blue">Blue</option>
                <option value="green">Green</option>
              </select>
            </div>
            <div className="">
              <select name="size" id="" onChange={handleFilters}>
                <option value="M">M</option>
                <option value="X">X</option>
                <option value="XL">XL</option>
              </select>
            </div>
          </div>

          <div className="">
            <select name="sort" id="" onChange={(e) => setSort(e.target.value)}>
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>
        </div>

        <div className="">
          <Products category={cat} filters={fileters} sort={sort} />
        </div>
      </div>
    </div>
  );
};

export default ProductList;

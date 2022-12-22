import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import prd from "./product.module.css";
import { publicRequest } from "../../components/requestMethods";
import { useSelector, useDispatch } from "react-redux";
import { addProduct } from "../../components/Redux/cartRedux";

function Product() {
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [colors, setColors] = useState(``);
  const [sizes, setSizes] = useState(``);

  console.log(sizes, colors);
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  // const {} = useSelector();
  const dispatch = useDispatch();
  // console.log(id);

  useEffect(() => {
    async function getProductById() {
      try {
        const res = await publicRequest.get(
          `http://localhost:5002/api/products/${id}`
        );

        setProduct(res.data[0]);
        setSizes(res.data[0].sizes[0]);
        setColors(res.data[0].colors[0]);
      } catch (error) {
        console.log(error);
      }
    }
    getProductById();
  }, [id]);

  function handleQuantity(params) {
    if (params === `asc`) {
      setQuantity((prev) => prev + 1);
    } else {
      setQuantity((prev) => prev - 1);
    }
  }

  const { categories, ...restproduct } = product && product;

  function handleClick() {
    // update cart
    dispatch(addProduct({ ...restproduct, quantity, colors, sizes }));
  }

  return (
    <div>
      <div className="">Product</div>
      <div className={`${prd.prdBox}`}>
        <img src={product.img} alt="" />
        <div className={`${prd.prdDetails}`}>
          <div className={`${prd.prdTitle}`}>
            {`${product.title}`.toUpperCase()}
          </div>
          <div className={`${prd.prdPrice}`}>$ {product.price}</div>
          <div className={`${prd.flex}`}>
            <div className="">
              <div className="">
                <label htmlFor="">Size : </label>
                <select
                  name="size"
                  id=""
                  onChange={(e) => setSizes(e.target.value)}
                  label="size"
                >
                  {product &&
                    product.sizes.map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                </select>
              </div>
              <div className="">
                <label htmlFor="">Color : </label>

                <select
                  name="color"
                  id=""
                  onChange={(e) => setColors(e.target.value)}
                  required
                >
                  {product &&
                    product.colors.map((color) => (
                      <option key={color} value={color}>
                        {color}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </div>
          <div className={`${prd.flex}`}>
            <div className="">
              <select
                name=""
                id=""
                onChange={(e) => setQuantity(e.target.value)}
              >
                {[1, 2].map((q) => (
                  <option value="">{q}</option>
                ))}
              </select>
            </div>
            <button className="" onClick={handleClick}>
              Add to Cart.
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;

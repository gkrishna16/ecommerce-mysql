import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import crt from "./cart.module.css";
import StripeCheckout from "react-stripe-checkout";
import { userRequest } from "../../components/requestMethods";
import { useNavigate } from "react-router-dom";

const KEY = process.env.REACT_APP_FRNTEND_STRIPE;
const Cart = () => {
  const { products, total } = useSelector((state) => state.cart);
  const [stripeToken, setStripeToken] = useState(null);
  const navigate = useNavigate();
  console.log(products);
  console.log(total);

  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await userRequest.post(
          `api/pay/payment`,
          {
            tokenId: stripeToken,
            amount: total * 100,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `token ${stripeToken}`,
            },
          }
        );
        navigate(`/success`, { data: res.data });
      } catch (error) {
        console.log(error);
      }
    };
    stripeToken && makeRequest();
  }, [stripeToken, total, navigate]);

  console.log(stripeToken);

  return (
    <div>
      <div className={`${crt.cartContainer}`}>
        {/* Cart */}
        <div>
          {products.map((product) => (
            <div className={`${crt.productBox}`}>
              <img src={product.img} alt="" />
              <div className="">
                <div className="">Product : {product.title}</div>
                <div className="">ID : {product.id}</div>
                <div className=""> Price : $ {product.price}</div>
                <div className=""> Size : {product.size}</div>
              </div>
            </div>
          ))}
        </div>
        <div className={`${crt.cartRight}`}>
          <div className="">
            <h2>ORDER SUMMARY</h2>
          </div>
          <div className="">Subtotal : ${total}</div>
          <div className="">Estimated Shipping : $10</div>
          <div className="">Shipping Discount</div>
          <h5 className="">Total : </h5>
          <div className="">
            <StripeCheckout
              name="Lama Shop"
              image="https://images.unsplash.com/photo-1664575198263-269a022d6e14?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
              // billingAddress=""
              // shippingAddress=""
              description={`Your total is $ ${total}`}
              amount={total * 100}
              token={onToken}
              stripeKey={KEY}
            >
              <button>CHECKOUT NOW</button>
            </StripeCheckout>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

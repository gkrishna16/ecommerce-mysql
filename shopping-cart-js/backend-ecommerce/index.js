// import { dotenv } from "ts-dotenv";
import express from "express";
import cors from "cors";
import products from "./routes/products/products.js";
import auth from "./routes/auth/authRoutes.js";
import carts from "./routes/carts/carts.js";
import users from "./routes/users/users.js";
import pay from "./routes/stripe/stripe.js";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const port = 5002;

app.use(cors());
app.use(express.json());

// routes
app.use("/api/products", products);
app.use(`/api/users`, users);
app.use(`/api/cart`, carts);
app.use(`/api/auth`, auth);
app.use(`/api/pay`, pay);

app.use(`/`, (req, res) => {
  res.send("Homepage of the api.");
});

app.listen(port, () => {
  console.log(`The server is running on ${port}.`);
});

// import { dotenv } from "ts-dotenv";
import express, { Express, Request, Response } from "express";
import cors from "cors";
import products from "./routes/products/products";
import auth from "./routes/auth/authRoutes";
import carts from "./routes/carts/carts";
import users from "./routes/users/users";
import pay from "./routes/stripe/stripe";
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

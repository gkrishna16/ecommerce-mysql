import express from "express";

import {
  addData,
  getData,
  getProdcutMen,
  getProdcutWomen,
  getProduct,
  getProductId,
} from "../../controller/products/products.js";
const router = express.Router();

router.get("/", getData);
router.post("/add", addData);
router.get(`/men`, getProdcutMen);
router.get(`/women`, getProdcutWomen);
router.get("/:id", getProductId);
router.get(`/getproduct`, getProduct);

export default router;

import express from "express";
const router = express.Router();
import {
  registerdata,
  register,
  login,
} from "../../controller/auth/authControllers.js";

router.get("/registerdata", registerdata);
router.post("/register", register);
router.post(`/login`, login);

export default router;

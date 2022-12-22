import { db } from "./../../db.js";
import bcrypt from "bcryptjs";
import { verifyTokenAndAuthorization } from "./../../controller/auth/verifyToken.js";
import { verifyToken } from "../../controller/auth/verifyToken.js";
import { getAllUsers, getUserById } from "../../controller/users/users.js";
import express from "express";
const router = express.Router();

router.get("/users", getAllUsers);

// GET USER BY ID
router.get(`/:id`, getUserById);

// UPDATE USER
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  if (req.body.password) {
    const salt = bcrypt.genSaltSync(10);
    req.body.password = bcrypt.hashSync(req.body.password, salt);
  }

  try {
    db.query(
      `update users set username = ?, name = ?, email = ?, password = ?, isAdmin = false where id = ?`,
      [
        req.body.username,
        req.body.name,
        req.body.email,
        req.body.password,
        req.params.id,
      ],
      (err, data) => {
        if (err) return res.status(401).json(err);
        if (data) return res.status(200).json(`user updated.`);
      }
    );
  } catch (error) {}
});

// DELETE
router.delete(`/:id`, verifyTokenAndAuthorization, async (req, res) => {
  try {
    db.query(`delete from users where id = ?`, [req.params.id], (err, data) => {
      if (err) return res.status(401).json(err);
      if (data) return res.status(200).json(`user has been deleted.`);
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;

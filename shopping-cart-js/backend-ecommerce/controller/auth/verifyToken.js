import jwt from "jsonwebtoken";
import dotenv from "dotenv";

export const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader?.split(" ")[1];
      // @ts-ignore
      jwt.verify(token, process.env.secretKey, (err, user) => {
        if (err) res.status(403).json(`Token is not valid.`);
        // @ts-ignore
        req.user = user;
        next();
      });
    } else {
      return res.status(401).json(`You are not authenticated.`);
    }
  } catch (error) {
    res.status(500).json("Something went wrong !");
  }
};

export const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    // @ts-ignore
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not allowed to do that.");
    }
  });
};

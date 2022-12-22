import { db } from "../../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export function register(request, response) {
  try {
    db.query(
      `select * from users where email = ? or username = ?`,
      [request.body.email, request.body.username],
      (err, data) => {
        if (err) return response.status(500).json(err);
        // if (data.length) {
        return response.status(200).json(`User already exists !`);
        // }
      }
    );

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(request.body.password, salt);

    db.query(
      `insert into users(name, username, email, password, isAdmin) values (?,?,?,?,false)`,
      [
        request.body.name,
        request.body.username,
        request.body.email,
        hash,
        request.body.isAdmin,
      ],
      (err, data) => {
        if (err) {
          return response.status(500).json(err);
        } else {
          response.setHeader("Content-Type", "application/json");
          return response.status(200).json(`User has been created.`);
        }
      }
    );
  } catch (error) {
    response.status(500).json(error);
  }
}

export function registerdata(req, res) {
  db.query(`select * from users`, (err, data) => {
    if (err) return res.status(500).json(err);
    if (data) return res.status(200).json(data);
  });
}

export async function login(req, res) {
  try {
    // console.log(typeof process.env.secretKey);
    db.query(
      `select * from users where username = ?;`,
      [req.body.username],
      async (err, data) => {
        if (err) return res.status(500).json(err);

        if (data.length === 0) {
          // console.log(`User does not exist.`);
          return res.status(404).json({ msg: "User does not exist." });
        } else {
          const hasedPassword = data[0].password;
          // get the hashed password from results
          if (await bcrypt.compare(req.body.password, hasedPassword)) {
            const accessToken = jwt.sign(
              {
                id: data[0].id,

                isAdmin: data[0].isAdmin,
              },

              process.env.secretKey,
              { expiresIn: "3d" }
            );

            const { password, ...others } = data[0];

            res.status(200).json({
              ...others,

              msg: `${data[0].username} Login successful.`,
              accessToken,
            });
          } else {
            res.send(404).json(`Password incorrect.`);
          }
        }
      }
    );
  } catch (error) {
    res.status(500).json(error);
  }
}

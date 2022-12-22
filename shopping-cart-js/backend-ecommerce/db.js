import mysql from "mysql2";

export const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "mysql8459",
  database: "cart_ecommerce",
});

db.connect(function (err) {
  if (err) {
    console.log(err);
  } else console.log("Database Connected");
});

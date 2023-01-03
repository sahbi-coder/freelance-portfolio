const knex = require("knex")({
  client: process.env.NODE_ENV === "development" ? "sqlite3" : "pg",

  connection:
    process.env.NODE_ENV === "development"
      ? { filename: "./data/Images.sqlite3" }
      : process.env.PG_URL,
});
const bcrypt = require("bcrypt");

import jwt from "jsonwebtoken";
import { serialize } from "cookie";

export default async function handler(req, res) {
  try {
    let authtoken = req.body.authtoken;

    if (authtoken) {
      jwt.verify(authtoken, process.env.JWT_SECRET, function (err, decoded) {
        if (err || !decoded) {
          return res.status(500).send({ message: "you are not authorized" });
        }
        res.status(200).send({ message: "ok" });
      });
      return;
    }
    if (req.method !== "POST") {
      return res.status(500).json({ message: "oops something went wrong !!" });
    }

    const users = await knex(
      process.env.NODE_ENV === "development" ? "Users" : "users"
    ).where({ email: req.body.email });

    if (!users.length)
      return res.status(500).json({ message: "oops something went wrong !!" });
    const areSame = await bcrypt.compare(req.body.password, users[0].password);

    if (!areSame)
      return res.status(500).json({ message: "oops something went wrong !!" });

    const claims = { sub: users[0].id };
    const authToken = jwt.sign(claims, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    const serialized = serialize("authtoken", authToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 60 * 60 * 24,
      path: "/",
    });
    res.setHeader("Set-Cookie", serialized);
    return res.status(200).json({ message: "you are logedIn" });
  } catch (error) {
    res.status(500).json({ message: "oops something went wrong !!" });
  }
}

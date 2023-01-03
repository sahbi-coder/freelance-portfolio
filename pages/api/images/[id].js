const knex = require("knex")({
  client: process.env.NODE_ENV === "development" ? "sqlite3" : "pg",
  connection:
    process.env.NODE_ENV === "development"
      ? { filename: "./data/Images.sqlite3" }
      : process.env.PG_URL,
});
const images = process.env.NODE_ENV === "development" ? "Images" : "images";
const cookie = require("cookie");
const secretKey = process.env.JWT_SECRET;
import Jwt from "jsonwebtoken";

const wrapper = (fn) => async (req, res) => {
  const allowedMethods = ["GET", "DELETE"];

  if (!~allowedMethods.indexOf(req.method)) {
    return res.status(500).send({ message: "oops something went wrong !!" });
  }

  if (req.method === "DELETE") {
    let token = cookie.parse(req.headers.cookie).authtoken;

    if (!token)
      return res.status(500).send({ message: "oops something went wrong !!" });

    Jwt.verify(token, secretKey, async function (error, decoded) {
      if (!error && decoded) {
        return await fn(req, res);
      }

      return res.status(500).send({ message: "oops something went wrong !!" });
    });
  } else {
    return await fn(req, res);
  }
};

export default wrapper(async function handler(req, res) {
  let id = req.query.id;

  try {
    if (req.method === "GET") {
      let result = await knex(images).where({ id });
      return res.status(200).json(result);
    }

    if (req.method === "DELETE") {
      const result = await knex(images).where({ id });

      await knex(images).where({ id }).del();

      return res.status(200).json(result[0]);
    }
  } catch (error) {
    res.status(500).json({ message: "oops something went wrong !!" });
  }
});

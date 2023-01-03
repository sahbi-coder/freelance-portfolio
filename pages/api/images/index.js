const secretKey = process.env.JWT_SECRET;
const cookie = require("cookie");

const knex = require("knex")({
  client: process.env.NODE_ENV === "development" ? "sqlite3" : "pg",

  connection:
    process.env.NODE_ENV === "development"
      ? { filename: "./data/Images.sqlite3" }
      : process.env.PG_URL,
});
const images = process.env.NODE_ENV === "development" ? "Images" : "images";
import Jwt from "jsonwebtoken";
const wrapper = (fn) => async (req, res) => {
  const allowedMethods = ["POST", "DELETE", "GET"];
  const protectedMethods = ["POST", "DELETE"];
  if (!~allowedMethods.indexOf(req.method))
    return res.status(500).send({ message: "oops something went wrong !!" });
  if (~protectedMethods.indexOf(req.method)) {
    let token = cookie.parse(req.headers.cookie).authtoken;

    if (!token) {
      return res.status(500).send({ message: "oops something went wrong !!" });
    }

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
  try {
    if (req.method === "GET") {
      let result = await knex(images);
      return res.status(200).json(result);
    }
    if (req.method === "POST") {
      await knex(images).insert({ img: req.body.path });
      return res.status(201).json({ message: "image posted" });
    }
    if (req.method === "DELETE") {
      await knex(images).del();
      return res.status(200).json({ message: "images deleted" });
    }
  } catch (error) {
    res.status(500).json({ message: "oops something went wrong !!" });
  }
});

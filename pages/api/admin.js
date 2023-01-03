import Jwt from "jsonwebtoken";
export default async function handle(req, res) {
  let authtoken = req.body.authtoken;
  Jwt.verify(authtoken, process.env.JWT_SECRET, function (err, decoded) {
    if (err || !decoded) {
      return res.status(500).send({ message: "you are not authorized" });
    }
    res.status(200).send({ message: "ok" });
  });
}

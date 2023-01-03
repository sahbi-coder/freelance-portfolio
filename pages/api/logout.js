import { serialize } from "cookie";
  
  export default async function handler(req, res) {
    try {
        const serialized = serialize("authtoken", "", {
            httpOnly: true,
            secure: process.env !== "development",
            sameSite: "strict",
            expires:new Date(0),
            path: "/",
          });
      res.setHeader("Set-Cookie", serialized);
      return res.status(200).json({ message: "you are logedOut" });
    } catch (error) {

      res.status(500).json({ message: "oops something went wrong !!" });
    }
  }
  
import jwt from "jsonwebtoken";
import User from "../models/User.js"; // Assuming User is exported from User.mjs
// import { JWT_SECRET } from "process.env";

const JWT_SECRET = process.env.JWT_SECRET;
const auth = async (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded._id);
    if (!user) {
      throw new Error();
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate." });
  }
};

export default auth;

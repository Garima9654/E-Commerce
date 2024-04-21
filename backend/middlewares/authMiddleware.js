import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncHandler from "./asyncHandler.js";

const authenticate = asyncHandler(async (req, res, next) => {
  let token;

  // Read JWT from the 'jwt' cookie
  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      //   console.log(decoded);
      req.user = await User.findById(decoded.userID).select("-password");

      next();
    } catch (err) {
      res.status(401);
      throw new Error("Not authorised, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorised, no token");
  }
});

const authorisedAdmin = (req, res, next) => {
  //   console.log(req.user);
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send("Not authorised as admin..");
  }
};

export { authenticate, authorisedAdmin };

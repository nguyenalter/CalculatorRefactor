// const jwt = require("jsonwebtoken");
import jwt from "jsonwebtoken";
export const createToken = (data, privateKey) =>
  jwt.sign(data, privateKey, {
    // token is valid for 1 hour
    expiresIn: 3600,
  });

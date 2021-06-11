import { errorResponse, validateFields } from "../utils/response";
import jwt from "jsonwebtoken";
// middleware for checking token form bearer header.
export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  // Check for missing header
  if (!authHeader)
    // TODO - Maybe convert to error response.
    return errorResponse(req, res, "Unauthorized access!", 401);
  // Check for bearer token
  if (authHeader.startsWith("Bearer ")) {
    const token = authHeader.substr(7);
    let decoded = jwt.verify(
      token,
      process.env.JWT_SECRETKEY,
      (err, decoded) => {
        return decoded;
      }
    );
    if (decoded) {
      res.locals.username = decoded.username;
      next();
    } else return errorResponse(req, res, "Unauthorized access!", 401);
  } else return errorResponse(req, res, "Unauthorized access!", 401);
};

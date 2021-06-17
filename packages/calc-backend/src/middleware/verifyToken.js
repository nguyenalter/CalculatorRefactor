import jwt from 'jsonwebtoken';
import { errorResponse } from '../utils/response';
// middleware for checking token form bearer header.
export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  // Check for missing header
  if (!authHeader) {
    // TODO - Maybe convert to error response.
    return errorResponse(res, 'Unauthorized access!', 401);
  }
  // Check for bearer token
  if (authHeader.startsWith('Bearer ')) {
    const token = authHeader.substr(7);
    const decodedValue = jwt.verify(
      token,
      process.env.JWT_SECRETKEY,
      (err, decoded) => decoded,
    );
    if (decodedValue) {
      res.locals.username = decodedValue.username;
      return next();
    }
  }
  return errorResponse(res, 'Unauthorized access!', 401);
};

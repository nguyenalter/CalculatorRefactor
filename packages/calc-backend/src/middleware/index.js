import { errorResponse, validateFields } from "../utils/response";
// middleware for checking token form bearer header.
export const checkHeader = (req, res, next) => {
  const authHeader = req.headers.authorization;
  // Check for missing header
  if (!authHeader)
    // TODO - Maybe convert to error response.
    return errorResponse(req, res, "Unauthorized access!", 401);
  // Check for bearer token
  if (authHeader.startsWith("Bearer ")) {
    next();
  } else return errorResponse(req, res, "Unauthorized access!", 401);
};

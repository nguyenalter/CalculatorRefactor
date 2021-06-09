import getResult from "../utils/converter";
import { errorResponse, successResponse } from "../utils/response";

// TODO - store history if signed in.
export const calculate = (req, res) => {
  const { firstVal, secondVal, option } = req.body;
  try {
    const result = getResult(firstVal, secondVal, option);
    return successResponse(req, res, { result: result });
  } catch (error) {
    return errorResponse(
      req,
      res,
      "Can not calculate due to error: " + error.message
    );
  }
};

// Error response
export const errorResponse = (
  req,
  res,
  errorMessage = "Something went wrong",
  code = 500,
  error = {}
) =>
  res.json({
    code,
    errorMessage,
    error,
    data: null,
    success: false,
  });

// Success response
export const successResponse = (req, res, data, code = 200) =>
  res.json({
    code,
    data,
    success: true,
  });

// Validate missing fields
export const validateFields = (object, fields) => {
  if (Object.keys(object).length != fields.length)
    return "Wrong request body format!";
  const errors = [];
  fields.forEach((f) => {
    if (!(object && object[f])) {
      errors.push(f);
    }
  });
  return errors.length ? `${errors.join(", ")} are required fields.` : "";
};

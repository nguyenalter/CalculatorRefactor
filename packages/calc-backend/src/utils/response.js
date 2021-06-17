// Error response
export const errorResponse = (
  res,
  errorMessage = 'Something went wrong',
  code = 500,
) => res.status(code).json({
  errorMessage,
});

// Success response
export const successResponse = (res, data, code = 200) => res.status(code).json(data);

// Validate missing fields
export const validateFields = (object, fields) => {
  if (Object.keys(object).length != fields.length) return 'Wrong request body format!';
  const errors = [];
  fields.forEach((f) => {
    if (!(object && object[f])) {
      errors.push(f);
    }
  });
  return errors.length ? `${errors.join(', ')} are required fields.` : '';
};

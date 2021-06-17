import Joi from 'joi';
import { errorResponse } from '../utils/response';

export const userSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

export const calculateSchema = Joi.object({
  firstVal: Joi.string().pattern(/^[+,-]?[0-9]+$/).required(),
  secondVal: Joi.string().pattern(/^[+,-]?[0-9]+$/).required(),
  option: Joi.string().pattern(/^[+*-]{1}$/).required(),
});

export const historyDataSchema = Joi.object({
  firstVal: Joi.string().pattern(/^[+,-]?[0-9]+$/).required(),
  secondVal: Joi.string().pattern(/^[+,-]?[0-9]+$/).required(),
  option: Joi.string().pattern(/^[+*-]{1}$/).required(),
  result: Joi.string().pattern(/^[+,-]?[0-9]+$/).required(),
  createdAt: Joi.string().isoDate().required(),
});

export const multipleHistoriesDataSchema = Joi.object({
  historyData: Joi.array().items(historyDataSchema),
});

export const createdAtSchema = Joi.object({
  createdAt: Joi.string().isoDate().required(),
});

export const validateSchema = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body);
    return next();
  } catch (err) {
    return errorResponse(res, err, 400);
  }
};

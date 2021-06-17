import bcrypt from 'bcrypt';
import models from '../models';
import { createToken } from '../utils/token';
// import { fetchHistoryOfUser } from '../services/history';
import { successResponse, errorResponse } from '../utils/response';

export const signUp = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await models.Users.findByPk(username);

    if (user) {
      throw new Error('User already exists with same username!');
    }

    // Create jwt token
    const data = {
      username,
    };
    const token = createToken(data, process.env.JWT_SECRETKEY);

    // Encrypt password here
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const userData = {
      username,
      password: hashedPassword,
    };
    await models.Users.create(userData);

    return successResponse(res, { token });
  } catch (error) {
    return errorResponse(res, error.message, 400);
  }
};

export const signIn = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await models.Users.findByPk(username);

    if (!user) return errorResponse(res, 'No username found!', 401);
    // Validate password here
    // TODO - Compare raw password vs hashed one in DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return errorResponse(res, 'Wrong password!', 401);
    // Create jwt token
    const data = {
      username,
    };
    const token = createToken(data, process.env.JWT_SECRETKEY);

    return successResponse(res, { token });
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

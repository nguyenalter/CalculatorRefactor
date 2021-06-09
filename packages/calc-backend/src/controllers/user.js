import models from "../models";
import bcrypt from "bcrypt";
import { createToken } from "../utils/token";
import { successResponse, errorResponse } from "../utils/response";

export const signUp = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await models.Users.findByPk(username);

    if (user) {
      throw new Error("User already exists with same username");
    }

    // Create jwt token
    const data = {
      username: username,
    };
    const token = createToken(data, process.env.JWT_SECRETKEY);

    // Encrypt password here
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const userData = {
      username: username,
      password: hashedPassword,
    };

    // create method combines build and save.
    try {
      const newUser = await models.Users.create(userData);
    } catch (error) {
      throw new Error("Can not insert to database");
    }
    // newUser exists in the database now!
    return successResponse(req, res, { token: token });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

import models from "../models";
import bcrypt from "bcrypt";
import { createToken } from "../utils/token";

import { successResponse, errorResponse } from "../utils/response";

async function fetchHistory(user) {
  let h = [];
  const history = await models.Histories.findAll({
    attributes: [
      "timestamp",
      "firstOperand",
      "operator",
      "secondOperand",
      "result",
    ],
    where: {
      username: user,
    },
    order: [["timestamp", "ASC"]],
  });
  // Convert model to json
  history.forEach((record) => {
    h.push({
      firstVal: record.firstOperand,
      option: record.operator,
      secondVal: record.secondOperand,
      result: record.result,
      timestamp: record.timestamp,
    });
  });
  return h;
}

async function appendHistoryToDatabase(user, data) {
  const h = await models.Histories.create({
    username: user,
    firstOperand: data.firstVal,
    operator: data.option,
    secondOperand: data.secondVal,
    result: data.result,
    timestamp: data.timestamp,
  });
  if (h) return true;
  return false;
}

export const signUp = async (req, res) => {
  try {
    let { username, password, historyData } = req.body;

    const user = await models.Users.findByPk(username);

    if (user) {
      throw new Error("User already exists with same username!");
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
    await models.Users.create(userData);
    // Append data in local storage to db
    let dataToAppend = [];
    historyData.forEach((record) => {
      dataToAppend.push({
        username,
        firstOperand: record.firstVal,
        operator: record.option,
        secondOperand: record.secondVal,
        result: record.result,
        timestamp: record.timestamp,
      });
    });
    await models.Histories.bulkCreate(dataToAppend);

    return successResponse(req, res, { token: token });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const signIn = async (req, res) => {
  try {
    let { username, password, historyData } = req.body;
    const user = await models.Users.findByPk(username);

    if (!user) return errorResponse(req, res, "No username found!", 401);
    // console.log("There is a user with username= " + username);
    // console.log("Validating password...");
    // Validate password here
    // TODO - Compare raw password vs hashed one in DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return errorResponse(req, res, "Wrong password!", 401);
    // Create jwt token
    const data = {
      username: username,
    };
    const token = createToken(data, process.env.JWT_SECRETKEY);
    // Update new data in history to db
    let dataToAppend = [];
    historyData.forEach((record) => {
      dataToAppend.push({
        username,
        firstOperand: record.firstVal,
        operator: record.option,
        secondOperand: record.secondVal,
        result: record.result,
        timestamp: record.timestamp,
      });
    });
    await models.Histories.bulkCreate(dataToAppend);

    // Then fetch old and new history back to user...
    const history = await fetchHistory(username);

    return successResponse(req, res, { token: token, historyData: history });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const sendDataFromValidToken = async (req, res) => {
  try {
    // this function will run when client refresh account page!
    const username = res.locals.username;
    const historyData = await fetchHistory(username);

    return successResponse(req, res, {
      historyData,
      username: username,
    });
  } catch (error) {
    return errorResponse(req, res, error.message, 401);
  }
};

export const appendToHistory = async (req, res) => {
  try {
    // token had been decoded in middleware phase, username stored in res.locals.username
    const { data } = req.body;
    const username = res.locals.username;
    // insert success
    await appendHistoryToDatabase(username, data);
    return successResponse(req, res, {
      success: true,
    });
  } catch (error) {
    return errorResponse(req, res, error.message, 401);
  }
};

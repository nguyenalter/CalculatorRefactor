import {
  appendOneHistoryDataToDatabase,
  appendMultipleHistoryDataToDatabase,
  deleteAllHistoryOfUser,
  deleteOneHistoryDataOfUser,
  fetchHistoryOfUser,
} from '../services/history';
import { successResponse, errorResponse } from '../utils/response';

export const getCurrentHistoryData = async (req, res) => {
  try {
    // token had been decoded in middleware phase, username stored in res.locals.username
    const { username } = res.locals;
    // insert success
    const historyData = await fetchHistoryOfUser(username);
    return successResponse(res, { historyData, username });
  } catch (error) {
    return errorResponse(res, error.message, 401);
  }
};

export const addOneDataToHistory = async (req, res) => {
  try {
    // token had been decoded in middleware phase, username stored in res.locals.username
    // data is a JSON object, no need to wrap!
    const data = req.body;
    const { username } = res.locals;
    // insert success
    await appendOneHistoryDataToDatabase(username, data);
    return successResponse(res, {
      message: 'add one data to database successfully.',
    });
  } catch (error) {
    return errorResponse(res, error.message, 401);
  }
};

export const addMultipleDataToHistory = async (req, res) => {
  try {
    // token had been decoded in middleware phase, username stored in res.locals.username
    const { historyData } = req.body;
    const { username } = res.locals;
    // insert success
    await appendMultipleHistoryDataToDatabase(historyData, username);
    return successResponse(res, {
      message: 'add multiple data to database successfully.',
    });
  } catch (error) {
    return errorResponse(res, error.message, 401);
  }
};

export const deleteOneHistoryData = async (req, res) => {
  try {
    // token had been decoded in middleware phase, username stored in res.locals.username
    const { createdAt } = req.body;
    const { username } = res.locals;
    // insert success
    // console.log(createdAt);
    // TODO - should change timestamp -> id (PK)
    await deleteOneHistoryDataOfUser(username, createdAt);
    return successResponse(res, {
      message: 'delete a history data from database successfully.',
    });
  } catch (error) {
    return errorResponse(res, error.message, 401);
  }
};

export const deleteAllHistoryData = async (req, res) => {
  try {
    // token had been decoded in middleware phase, username stored in res.locals.username
    const { username } = res.locals;
    // insert success
    await deleteAllHistoryOfUser(username);
    return successResponse(res, {
      message: 'delete all history data of a user from database successfully.',
    });
  } catch (error) {
    return errorResponse(res, error.message, 401);
  }
};

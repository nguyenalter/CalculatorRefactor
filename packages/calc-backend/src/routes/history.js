import express from 'express';
import { verifyToken } from '../middleware/verifyToken';
import * as historyController from '../controllers/history';
import { validateAddOneHistoryData, validateMultipleHistoriesData, validateDeleteOneDataByTime } from '../middleware/validate-request';

const router = express.Router();

// get user history data
router.get('/', verifyToken, historyController.getCurrentHistoryData);

// add all existing calculated data
// from local storage when user signed in/up.
router.post('/', verifyToken, validateMultipleHistoriesData, historyController.addMultipleDataToHistory);

// add new row when (signed in) user calculating anything new.
router.put('/', verifyToken, validateAddOneHistoryData, historyController.addOneDataToHistory);

// delete a row when (signed in) user remove it from history table.
router.patch('/', verifyToken, validateDeleteOneDataByTime, historyController.deleteOneHistoryData);

// delete all histories of the user when (signed in) they remove all from history table.
router.delete('/', verifyToken, historyController.deleteAllHistoryData);

export default router;

import {
  validateSchema,
  userSchema,
  calculateSchema,
  historyDataSchema,
  multipleHistoriesDataSchema,
  createdAtSchema,
} from '../services/joi-service';

export const validateUserData = validateSchema(userSchema);

export const validateCalculateData = validateSchema(calculateSchema);

export const validateAddOneHistoryData = validateSchema(historyDataSchema);

export const validateMultipleHistoriesData = validateSchema(multipleHistoriesDataSchema);

export const validateDeleteOneDataByTime = validateSchema(createdAtSchema);

import models from '../models';

// get all historise of a user
export const fetchHistoryOfUser = async (username) => {
  const history = await models.Histories.findAll({
    attributes: [
      'createdAt',
      'firstOperand',
      'operator',
      'secondOperand',
      'result',
    ],
    where: {
      username,
    },
    order: [['createdAt', 'ASC']],
  });
  return history.map((record) => ({
    firstVal: record.firstOperand,
    option: record.operator,
    secondVal: record.secondOperand,
    result: record.result,
    createdAt: record.createdAt,
  }));
};

// append multiple rows !
export const appendMultipleHistoryDataToDatabase = async (historyData, username) => {
  const newHistories = historyData.map((record) => ({
    username,
    firstOperand: record.firstVal,
    operator: record.option,
    secondOperand: record.secondVal,
    result: record.result,
    createdAt: record.createdAt,
  }));

  return models.Histories.bulkCreate(newHistories);
};

// append only 1 row !
export const appendOneHistoryDataToDatabase = async (username, data) => models.Histories.create({
  username,
  firstOperand: data.firstVal,
  operator: data.option,
  secondOperand: data.secondVal,
  result: data.result,
  createdAt: data.createdAt,
});

// remove one history row based on username and timestamp
export const deleteOneHistoryDataOfUser = async (username, createdAt) => models.Histories.destroy({
  where: {
    username,
    createdAt,
  },
});

// remove all histories of a user
export const deleteAllHistoryOfUser = async (username) => models.Histories.destroy({
  where: {
    username,
  },
});

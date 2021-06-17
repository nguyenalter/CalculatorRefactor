import { saveAs } from 'file-saver';

export const appendToGuestHistory = (payload) => {
  // TODO - append to local storage.
  // get current history
  const oldHistory = JSON.parse(localStorage.getItem('history')) || [];
  // append new record
  oldHistory.push(payload);
  // update local storage
  localStorage.setItem('history', JSON.stringify(oldHistory));
};
export const getGuestHistory = () => JSON.parse(localStorage.getItem('history')) || [];

export const setGuestHistory = (history) => localStorage.setItem('history', JSON.stringify(history));

export const getCurrentFormattedTime = () => new Date().toISOString();

export const exportCSV = (historyData) => {
  console.log('export clicked');
  const currentHistory = historyData;
  const csv = `firstOperand,operator,secondOperand,result,createdAt\n${
    currentHistory
      .map((d) => JSON.stringify(Object.values(d)))
      .join('\n')
      .replace(/(^\[)|(\]$)/gm, '')}`.replace(/"/g, '');
  const file = new File([csv], 'history.csv', {
    type: 'text/plain;charset=utf-8',
  });
  saveAs(file);
};

// export const errHandler = (err) => {
//   if (err.response) {
//     // The request was made and the server responded with a status code
//     // that falls out of the range of 2xx
//     console.log(err.response.data);
//     console.log(err.response.status);
//     console.log(err.response.headers);
//   } else if (err.request) {
//     // The request was made but no response was received
//     // `err.request` is an instance of XMLHttpRequest in the browser and an instance of
//     // http.ClientRequest in node.js
//     console.log(err.request);
//   } else {
//     // Something happened in setting up the request that triggered an err
//     console.log('err', err.message);
//   }
//   console.log(err.config);
// };

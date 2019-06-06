const CycloneRequest = require('../requests/cycloneRequest');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function cycloneTimer() {
  return new Promise((resolve) => {
    CycloneRequest.getAllCyclones().then(async () => {
      await sleep(1000 * 60 * 60 * 2);
      cycloneTimer();
      resolve();
    });
  });
}

module.exports = { cycloneTimer, sleep };

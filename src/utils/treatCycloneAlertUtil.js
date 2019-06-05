const CycloneAlertModel = require('../models/CycloneAlertModel');

module.exports = {
  saveCycloneAlert: requestBody => new Promise((resolve) => {
    const cycloneAlert = new CycloneAlertModel(requestBody.telegramId);

    // cycloneAlert.setTelegramId(requestBody.telegramId);

    cycloneAlert.findMe().then(() => {
      cycloneAlert.saveCycloneAlert().then(() => resolve(cycloneAlert));
    });
  }),
}

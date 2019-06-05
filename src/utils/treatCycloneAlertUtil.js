const mongoose = require('mongoose');
const CycloneAlertSchema = require('../schemas/cycloneAlertSchema');

const CycloneAlertModel = mongoose.model('CycloneAlertModel', CycloneAlertSchema);

module.exports = {
  saveCycloneAlert: requestBody => new Promise((resolve) => {
    const cycloneAlert = new cycloneAlert(requestBody.telegramId);

    cycloneAlert.setTelegramId(requestBody.telegramId);

    CycloneAlertModel.find({
      telegramID: cycloneAlert.getTelegramId(),
    }).then(() => {
      cycloneAlert.saveCycloneAlert().then(() => resolve(cycloneAlert));
    });
  }),
}

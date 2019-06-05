const mongoose = require('mongoose');
const CycloneAlert = require('../models/CycloneAlertModel');

const CycloneAlertSchema = require('../schemas/cycloneAlertSchema');

const CycloneAlertModel = mongoose.model('CycloneAlertModel', CycloneAlertSchema);

module.exports = {
  saveCycloneAlert: requestBody => new Promise((resolve) => {
    const cycloneAlert = new CycloneAlert(requestBody.telegramId);

    cycloneAlert.findMe().then(() => {
      cycloneAlert.saveCycloneAlert().then(() => resolve(cycloneAlert));
    });
  }),

  getAllCycloneAlerts: () => new Promise((resolve) => {
    CycloneAlertModel.find({ class: 'cycloneAlert' }).then((cycloneAlerts) => {
      resolve(cycloneAlerts);
    }).catch(() => {
    });
  }),
};

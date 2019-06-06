const mongoose = require('mongoose');
const CycloneAlertSchema = require('../schemas/cycloneAlertSchema');

const CycloneAlertModel = mongoose.model('CycloneAlertModel', CycloneAlertSchema);

module.exports = class CycloneAlert {
  constructor(telegramId) {
    this.cycloneAlert = new CycloneAlertModel({
      class: 'cycloneAlert',
      telegramId,
    });
  }

  setTelegramId(telegramId) {
    this.cycloneAlert.telegramId = telegramId;
  }

  getTelegramId() {
    return this.cycloneAlert.telegramId;
  }

  saveCycloneAlert() {
    return new Promise((resolve) => {
      this.cycloneAlert.save().then(() => {
        resolve();
      });
    });
  }

  findMe() {
    return new Promise((resolve) => {
      CycloneAlertModel.findOne({ telegramId: this.cycloneAlert.telegramId },
        (err) => { if (err) { resolve(false); } }).then((cycloneAlert) => {
        if (cycloneAlert) {
          this.cycloneAlert = cycloneAlert;
          resolve(true);
        }
        resolve(false);
      });
    });
  }
};

const mongoose = require('mongoose');

const CycloneAlertSchema = new mongoose.Schema({
  telegramId: String,
  class: String,
});

module.exports = CycloneAlertSchema;

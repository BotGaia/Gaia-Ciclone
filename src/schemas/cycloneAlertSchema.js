const mongoose = require('mongoose');

const CycloneAlertSchema = new mongoose.Schema({
  telegramId: String,
});

module.exports = CycloneAlertSchema;

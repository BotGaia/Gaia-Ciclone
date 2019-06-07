const mongoose = require('mongoose');

const CycloneSchema = new mongoose.Schema({
  name: String,
  originBasin: String,
  currentBasin: String,
  startDate: String,
  endDate: String,
  stormType: String,
  windSpeed: Number,
  class: String,
});

module.exports = CycloneSchema;

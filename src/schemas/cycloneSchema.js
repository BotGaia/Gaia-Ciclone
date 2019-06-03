const mongoose = require('mongoose');

const CycloneSchema = new mongoose.Schema({
  name: String,
  currentBasin: String,
  startDate: String,
  endDate: String,
  stormType: String,
  stormSpeed: String,
});

module.exports = CycloneSchema;

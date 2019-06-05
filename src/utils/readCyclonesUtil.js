const mongoose = require('mongoose');
const CycloneSchema = require('../schemas/cycloneSchema');

const CycloneModel = mongoose.model('CycloneModel', CycloneSchema);

function readCyclones() {
  return new Promise((resolve) => {
    CycloneModel.find({ class: 'cyclone' }).then((cyclones) => {
      resolve(cyclones);
    }).catch((err) => {
      resolve(err);
    });
  });
}

function deleteAllCyclones() {
  return new Promise((resolve) => {
    CycloneModel.deleteMany({ class: 'cyclone' }).then(() => {
      resolve();
    });
  });
}

module.exports = { readCyclones, deleteAllCyclones };

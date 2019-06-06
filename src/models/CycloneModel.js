const mongoose = require('mongoose');
const CycloneSchema = require('../schemas/cycloneSchema');

const CycloneModel = mongoose.model('CycloneModel', CycloneSchema);

module.exports = class Cyclone {
  constructor(name, currentBasin, startDate, endDate, stormType, windSpeed) {
    this.cyclone = new CycloneModel({
      name,
      currentBasin,
      startDate,
      endDate,
      stormType,
      windSpeed,
      class: 'cyclone',
    });
  }

  getName() {
    return this.cyclone.name;
  }

  getCurrentBasin() {
    return this.cyclone.currentBasin;
  }

  getStartDatate() {
    return this.cyclone.startDate;
  }

  getEndDatate() {
    return this.cyclone.endDate;
  }

  getStormType() {
    return this.cyclone.stormType;
  }

  getwindSpeed() {
    return this.cyclone.windSpeed;
  }

  saveCyclone() {
    return new Promise((resolve) => {
      this.cyclone.save().then(() => {
        resolve();
      });
    });
  }

  deleteMe() {
    return new Promise((resolve, reject) => {
      CycloneModel.deleteOne({ name: this.cyclone.name }, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  findMe() {
    return new Promise((resolve) => {
      CycloneModel.findOne({ name: this.cyclone.name },
        (err) => { if (err) { resolve(false); } }).then((cyclone) => {
        if (cyclone) {
          this.cyclone = cyclone;
          resolve(true);
        }
        resolve(false);
      });
    });
  }
};
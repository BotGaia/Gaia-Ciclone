const mongoose = require('mongoose');
const CycloneSchema = require('../schemas/cycloneSchema');

const CycloneModel = mongoose.model('CycloneModel', CycloneSchema);

class Cyclone {
  constructor(name, currentBasin, startDate, endDate, stormType, stormSpeed) {
    this.cyclone = new CycloneModel({
      name,
      currentBasin,
      startDate,
      endDate,
      stormType,
      stormSpeed,
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

  getStormSpeed() {
    return this.cyclone.stormSpeed;
  }
}

module.exports = { Cyclone };

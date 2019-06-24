/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const chai = require('chai');
const Cyclone = require('../models/CycloneModel');
const cycloneReading = require('../utils/readCyclonesUtil');
const cycloneRequest = require('../requests/cycloneRequest');
const Timer = require('../utils/cycloneTimerUtil');

const should = chai.should();

const mockCyclone = new Cyclone(
  'testName',
  'AL',
  'AL',
  'testStartDate',
  'testEndDate',
  'H',
  3.6,
);

describe('Cyclone Reading', () => {
  it('should read test cyclone', () => {
    mockCyclone.saveCyclone();
    cycloneReading.readCyclones().then((cyclones) => {
      cyclones.should.be.a('Array').that.has.lengthOf.at.least(1);

      cyclones.forEach((element) => {
        if (element.name === 'testName') {
          element.currentBasin.should.equal('AL');
        }
      });
    });

    mockCyclone.deleteMe();
  });

  it('should delete all cyclones', (done) => {
    cycloneReading.deleteAllCyclones().then(() =>  {
      cycloneReading.readCyclones().then((cyclones) => {
        cyclones.should.be.a('Array').that.has.lengthOf(0);
      });
    });
  });
});

describe('Cyclone Timer', () => {
  it('should run the timer');
});

describe('Uncategorized Cyclone Tests', () => {
  it('Should make a cyclone resquest', () => {
    cycloneRequest.getAllCyclones().then((cyclone) => {
      cyclone.success.should.equal(true);
    });
  });

  it('Should wait for 10ms', async () => {
    const firstDate = new Date();
    await Timer.sleep(10);
    const diff = (new Date()).getTime() - firstDate.getTime();
    diff.should.least(10);
  });
});

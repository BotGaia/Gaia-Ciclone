/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const chai = require('chai');
const Cyclone = require('../models/CycloneModel');
const ReadCyclones = require('../utils/readCyclonesUtil');
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

describe('Test Cyclone', () => {
  it('Should read test cyclone', () => {
    mockCyclone.saveCyclone();
    ReadCyclones.readCyclones().then((cyclones) => {
      cyclones.forEach((element) => {
        if (element.name === 'testName') {
          element.currentBasin.should.equal('AL');
        }
      });
    });
    mockCyclone.deleteMe();
  });

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

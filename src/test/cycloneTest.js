/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const chai = require('chai');
const axios = require('axios');
const sinon = require('sinon');
const Cyclone = require('../models/CycloneModel');
const cycloneReading = require('../utils/readCyclonesUtil');
const cycloneRequest = require('../requests/cycloneRequest');
const timer = require('../utils/cycloneTimerUtil');
const Alert = require('../models/CycloneAlertModel');

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

const fakeUser = new Alert('myId');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

describe('Cyclone', () => {
  it('should run the timer', (done) => {
    const sleepStub = sinon.stub(timer, 'sleep').resolves();
    const postStub = sinon.stub(axios, 'post').resolves({ data: {} });
    const getStub = sinon.stub(axios, 'get').resolves({ data: {} });

    timer.cycloneTimer();
    sleep(5000).then(() => {
      getStub.callCount.should.be.at.least(1);
      postStub.callCount.should.be.equal(0);
      done();
    });

    sleepStub.restore();
    postStub.restore();
    getStub.restore();
  }).timeout(8000);

  it('should wait for 10ms', async () => {
    const firstDate = new Date();
    await timer.sleep(10);
    const diff = (new Date()).getTime() - firstDate.getTime();
    diff.should.be.at.least(9);
  });

  it('should make a cyclone request', () => {
    cycloneRequest.getAllCyclones().then((cyclone) => {
      cyclone.success.should.equal(true);
    });
  });


  it('should send notifications', (done) => {
    const postStub = sinon.stub(axios, 'post').resolves({ status: 200 });
    const anotherCyclone = new Cyclone('name', 'here', 'there', 'now', 'never', 'cool', 22);

    fakeUser.saveCycloneAlert().then(() => {
      anotherCyclone.saveCyclone().then(() => {
        cycloneRequest.sendNotifications().then((res) => {
          res.should.have.status(200);
          postStub.restore();
          done();
        });
      });
    });
  }).timeout(10000);

  it('should read test cyclone', (done) => {
    mockCyclone.saveCyclone().then(() => {
      cycloneReading.readCyclones().then((cyclones) => {
        cyclones.should.be.a('Array').that.has.lengthOf.at.least(1);

        cyclones.forEach((element) => {
          if (element.name === 'testName') {
            element.currentBasin.should.equal('AL');
          }
        });
        done();
      });
    });
  }).timeout(5000);

  it('should delete all cyclones', (done) => {
    cycloneReading.deleteAllCyclones().then(() => {
      cycloneReading.readCyclones().then((cyclones) => {
        cyclones.should.be.a('Array').that.has.lengthOf(0);
        done();
      });
    });
  });

  it('should not send notifications', (done) => {
    mockCyclone.saveCyclone().then(() => {
      cycloneRequest.sendNotifications().then((res) => {
        res.should.be.a('String').that.is.equal('No notifications to be sent.');
        done();
        postStub.restore();
      });
    });
  });
});

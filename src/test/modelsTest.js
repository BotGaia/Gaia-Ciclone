/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const chai = require('chai');
const Cyclone = require('../models/CycloneModel');
const Alert = require('../models/CycloneAlertModel');

const should = chai.should();

const mockCyclone = new Cyclone(
  'testName',
  'AL',
  'AL',
  'testStartDate',
  'testEndDate',
  'H',
  3.6
);

const fakeAlert = new Alert('teleg'); 

describe('Cyclone Model', () => {
  it('should have name', () => {
    mockCyclone.getName().should.eql('testName');
  });

  it('should have origin basin', () => {
    mockCyclone.getOriginBasin().should.eql('AL');
  });

  it('should have current basin', () => {
    mockCyclone.getCurrentBasin().should.eql('AL');
  });

  it('should have startDate', () => {
    mockCyclone.getStartDatate().should.eql('testStartDate');
  });

  it('should have endDate', () => {
    mockCyclone.getEndDatate().should.eql('testEndDate');
  });

  it('should have stormType', () => {
    mockCyclone.getStormType().should.eql('H');
  });

  it('should have windSpeed', () => {
    mockCyclone.getwindSpeed().should.eql(3.6);
  });

  it('should not find cyclone', () => {
    mockCyclone.findMe().then((result) => {
      result.should.eql(false);
    });
  });

  it('should save, find and delete', (done) => {
    const newCyclone = new Cyclone('newC', 'here', 'there', 'now', 'never', 'cool', 22);

    newCyclone.saveCyclone().then((isSaved) => {
      isSaved.should.be.equal(true);
      newCyclone.findMe().then((isFound) => {
        isFound.should.be.equal(true);
        newCyclone.deleteMe().then((isDeleted) => {
          isDeleted.should.be.equal(true);
          done();
        });
      });
    });
  });
});

describe('Alert Model', () => {
  it('should set and get telegram id', () => {
    fakeAlert.setTelegramId('uwah');

    const id = fakeAlert.getTelegramId();

    id.should.be.a('String').that.is.equal('uwah');
  });
});

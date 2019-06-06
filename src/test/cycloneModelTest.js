/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const chai = require('chai');
const Cyclone = require('../models/CycloneModel');

const should = chai.should();

const mockCyclone = new Cyclone(
  'testName',
  'testBasin',
  'testStartDate',
  'testEndDate',
  'testStorm',
  'testWindspeed',
);

describe('Test CycloneModel', () => {
  it('Should have  name', () => {
    mockCyclone.getName().should.eql('testName');
  });

  it('Should have basin', () => {
    mockCyclone.getCurrentBasin().should.eql('testBasin');
  });

  it('Should have startDate', () => {
    mockCyclone.getStartDatate().should.eql('testStartDate');
  });

  it('Should have endDate', () => {
    mockCyclone.getEndDatate().should.eql('testEndDate');
  });

  it('Should have stormType', () => {
    mockCyclone.getStormType().should.eql('testStorm');
  });

  it('Should have windSpeed', () => {
    mockCyclone.getwindSpeed().should.eql('testWindspeed');
  });

  it('Should not find cyclone', () => {
    mockCyclone.findMe().then((result) => {
      result.should.eql(false);
    });
  });
});

/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const chai = require('chai');
const treatCycloneAlert = require('../utils/treatCycloneAlertUtil');

const mockJson = {
  telegramId: 'testId38',
};

describe('Treat cyclone alert', () => {
  it('Save cyclone alert', (done) => {
    treatCycloneAlert.saveCycloneAlert(mockJson).then((cycloneAlert) => {
      cycloneAlert.getTelegramId().should.eql('testId38');
      done();
    });
  }).timeout(5000);
});

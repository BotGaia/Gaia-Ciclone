/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');

const should = chai.should();
chai.use(chaiHttp);

describe('Routes', () => {
  it('Should get all cyclone alerts', (done) => {
    chai.request(app).get('/allCycloneAlerts').end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.a('Array');
      done();
    });
  }).timeout(5000);

  it('should return a user error', (done) => {
    chai.request(app).get('/userCycloneAlert?id=RUSBÉ UUUUUUH').end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.eql('Alerta de ciclone não existente');
      done();
    });
  }).timeout(5000);

  it('Should create notification', (done) => {
    const cycloneAlert = {
      telegramId: 'testIDIDtest',
    };
    chai.request(app).post('/createCycloneAlert').send(cycloneAlert).end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.a('Object');
      done();
    });
  }).timeout(5000);
});

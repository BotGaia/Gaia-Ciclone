const chai = require('chai');
const chaiHttp = require('chai-http');
const mocha = require('mocha');
const app = require('../index');

chai.should();
chai.use(chaiHttp);

mocha.describe('IndexTest', () => {
  mocha.it('Should get in root', (done) => {
    chai.request(app).get('/').end((err, res) => {
      res.should.have.status(200);
      done();
    });
  });
});

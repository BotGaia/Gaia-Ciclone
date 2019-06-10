/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const chai = require('chai');
const treatCycloneDetails = require('../utils/treatCycloneDetailsUtil');


describe('Treat basin', () => {
  it('Treat AL', () => {
    treatCycloneDetails.treatBasin('AL').should.eql('Oceano Atlântico');
  });

  it('Treat EP', () => {
    treatCycloneDetails.treatBasin('EP').should.eql('Oceano Pacífico leste');
  });

  it('Treat CP', () => {
    treatCycloneDetails.treatBasin('CP').should.eql('Oceano Pacífico central');
  });

  it('Treat WP', () => {
    treatCycloneDetails.treatBasin('WP').should.eql('Oceano Pacífico oeste');
  });

  it('Treat IO', () => {
    treatCycloneDetails.treatBasin('IO').should.eql('Oceano Índico');
  });

  it('Treat SH', () => {
    treatCycloneDetails.treatBasin('SH').should.eql('Hemisfério sul');
  });

  it('Treat null', () => {
    treatCycloneDetails.treatBasin(null).should.eql('Tempestade não ativa');
  });

  it('Treat error', () => {
    treatCycloneDetails.treatBasin('test').should.eql('Erro');
  });
});

describe('Treat storm type', () => {
  it('Treat TD', () => {
    treatCycloneDetails.treatStormType('TD').should.eql('Depressão tropical');
  });

  it('Treat TS', () => {
    treatCycloneDetails.treatStormType('TS').should.eql('Tempestade tropical');
  });

  it('Treat H', () => {
    treatCycloneDetails.treatStormType('H').should.eql('Furacão');
  });

  it('Treat TY', () => {
    treatCycloneDetails.treatStormType('TY').should.eql('Tufão');
  });

  it('Treat erro', () => {
    treatCycloneDetails.treatStormType('teste').should.eql('Erro');
  });
});

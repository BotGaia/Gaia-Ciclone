const express = require('express');
const mongoose = require('mongoose');
const endpoints = require('./utils/endpointsUtil');
const CycloneAlertSchema = require('./schemas/cycloneAlertSchema');
const CycloneAlertModel = mongoose.model('CycloneAlertModel', CycloneAlertSchema);
const treatCycloneAlert = require('../src/utils/treatCycloneAlertUtil');

const router = express.Router();

router.get('/', (req, res) => {
  res.json(endpoints.getJson());
});

router.post('/createCycloneAlert', (req, res) => {
  treatCycloneAlert.saveCycloneAlert(req.body).then((cycloneAlert) => {
    res.send(cycloneAlert.cycloneAlert);
  });
});

router.get('/deleteCycloneAlert', (req, res) => {
  if (!req.query.id) {
    res.json('Parâmetro inválido, tente da seguinte maneira: id=telegramId');
    return;
  }
  CycloneAlertModel.find({ telegramId: req.query.id }).then((cycloneAlert) => {
    if (cycloneAlert.length > 0) {
      CycloneAlertModel.deleteOne().then(() => {
        res.json('Alerta de ciclone excluído');
      });
    }
    else {
      res.json('Erro ao encontrar alerta do usuário');
      return;
    }
  });

  router.get('/userCycloneAlert', (req, res) => {
    if (!req.query.id) {
      res.json('Parâmetro inválido, tente da seguinte maneira: id=telegramId');
      return;
    }
    CycloneAlertModel.find({ telegramId: req.query.id }).then((cycloneAlert) => {
      if (cycloneAlert.length > 0) {
        res.json("Alerta de ciclone existente");
      }
      else {
        res.json("Alerta de ciclone não existente");
      }
    });
  });
});

module.exports = app => app.use('/', router);
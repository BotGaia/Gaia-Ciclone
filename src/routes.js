const express = require('express');
const ReadCyclones = require('./utils/readCyclonesUtil');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ YEET: 'fon' });
});

router.get('/allCyclones', (req, res) => {
  ReadCyclones.readCyclones().then((cyclones) => {
    res.json(cyclones);
  });
});

module.exports = app => app.use('/', router);

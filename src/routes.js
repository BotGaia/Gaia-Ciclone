const express = require('express');
const cycloneRequest = require('../src/requests/cycloneRequest');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ YEET: 'fon' });
});

router.get('/allCyclones', (req, res) => {
  cycloneRequest.getAllCyclones().then((value) => {
    res.json(value.data);
  });
});

module.exports = app => app.use('/', router);

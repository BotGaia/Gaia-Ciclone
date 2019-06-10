/* eslint-disable import/no-unresolved */
const express = require('express');
const bodyParser = require('body-parser');
const mongooseConnection = require('./db/cycloneMongooseConnectionDb');
const cycloneTimer = require('./utils/cycloneTimerUtil');

const app = express();

cycloneTimer.cycloneTimer();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongooseConnection.connect();

require('./routes')(app);

app.listen(3001);

module.exports = app;

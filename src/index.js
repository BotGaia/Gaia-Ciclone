const express = require('express');
const bodyParser = require('body-parser');
const mongooseConnection = require('./db/cycloneMongooseConnectionDb');
const CycloneTimer = require('./utils/cycloneTimerUtil');

const app = express();

mongooseConnection.connect();
CycloneTimer.cycloneTimer();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./routes')(app);

app.listen(3001);

module.exports = app;

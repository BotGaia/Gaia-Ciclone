const express = require('express');
const bodyParser = require('body-parser');
const mongooseConnection = require('./db/mongooseConnectionDb');

const app = express();

mongooseConnection.connect();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./routes')(app);

app.listen(3001);

module.exports = app;

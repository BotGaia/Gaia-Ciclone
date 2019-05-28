const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (_, res) => {
  res.json({ Hello: 'World' });
});

app.listen(3001);

module.exports = app;

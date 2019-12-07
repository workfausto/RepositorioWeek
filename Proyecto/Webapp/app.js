const buildSources = __dirname + '/';

// Express
const express = require('express');
var app = express();

app
  // Static content
  .use(express.static(buildSources))
  .use('/ventanas', express.static(buildSources + 'ventanas'))
  .use('/ventanas/Registro', express.static(buildSources + 'ventanas/Registro'))
  .use('/Images', express.static(buildSources + 'images'));

module.exports = app;

const http = require('http');
const app = require('./app');

const port = 7000;
const server = http.createServer(app);
console.log('Puerto ' + port);

server.listen(port);

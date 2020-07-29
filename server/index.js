const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const server = require('http').Server(app);
const port = 8080;
const helmet = require('helmet');

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept');
  next();
});

//pre-flight requests
app.options('*', function (req, res) {
  res.send(200);
});

server.listen(port, (err) => {
  if (err) {
    throw err;
  }
  /* eslint-disable no-console */
  console.log('Node Endpoints working :)');
});

app.all('/', (req, res) => {
  console.log('req: ', req);
  console.log('res: ', res);
  if (req.method === 'GET') {
    res.json({ working: true });
    res.end();
  } else if (req.method === 'POST') {
    res.json('working');
    res.end();
  } else if (req.method === 'PUT') {
    res.json('working');
    res.end();
  }
  res.status(200);
});

module.exports = server;

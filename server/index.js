const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const server = require('http');
const cors = require('cors');
const isAuch = require('./middlewares/isAuth')

const router = require('./router/router');

const config = require('./config');

const app = express();
const myServer = server.Server(app);
const port = 8080;

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept');
  next();
});

app.use('/user', router);

//pre-flight requests
app.options('*', cors());

myServer.listen(port, (err) => {
  if (err) {
    throw err;
  }
  /* eslint-disable no-console */
  console.log('Node Endpoints working :)');
});



app.get('/', (err, res) => {
	res.status(200).send('working: true');
});

module.exports = myServer;
